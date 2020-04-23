import { IToDoItem, setState, TodoState } from "./toDoItem";
import {
  itemExists,
  getLastMarked,
  getLastUnmarked,
  getFirstUnmarked,
  indexOfItemAfter,
  indexOfItem
} from "./toDoList";
import { isEmpty } from "./util";
import { INumberedItem } from "./numberedItem";

export const markFirstUnmarkedIfExists = (
  toDoList: IToDoItem[]
): IToDoItem[] => {
  if (
    itemExists(toDoList, "state", TodoState.Unmarked) &&
    !itemExists(toDoList, "state", TodoState.Marked)
  ) {
    const i = getFirstUnmarked(toDoList);
    toDoList[i] = markItem(toDoList[i]);
  }
  return toDoList;
};

// issue: Architect decides how to manage to-do items in backend #108
// issue: Architect reviews for opportunity to make DRY, SOLID #299
export const setupReview = (toDoList: IToDoItem[]): IToDoItem[] => {
  // short-circuit if the list is empty OR if there are marked items already
  if (isEmpty(toDoList) || itemExists(toDoList, "state", TodoState.Marked)) {
    return toDoList;
  }

  // if there are no marked items AND any unmarked items, the first unmarked item becomes marked
  toDoList = markFirstUnmarkedIfExists(toDoList);

  return toDoList;
};

// issue: Architect decides how to manage to-do items in backend #108
const markItem = (i: IToDoItem): IToDoItem => {
  return setState(i, TodoState.Marked);
};

export const getLastDoneIndex = (
  toDoList: IToDoItem[],
  lastDone: string
): number => {
  // short-circuit
  if (lastDone === "") {
    return -1;
  }
  // it needs have a string value of lastDone && it needs have a todostatus of completed
  return toDoList.findIndex(
    x => x.header === lastDone && x.state === TodoState.Completed
  );
};

const getNextItemOfStateAfterIndex = (
  toDoList: IToDoItem[],
  state: TodoState,
  i: number
): number => {
  // short-circuit
  if (toDoList.length === 0) {
    return -1;
  }

  return indexOfItemAfter(toDoList, "state", state, i);
};

// issue: Dev refactors determineReviewStart into FP style #372
// currently this code is declarative/imperative
export const determineReviewStart = (
  toDoList: IToDoItem[],
  lastDone: string
): number => {
  let reviewStart = -1;
  const lastDoneIndex = getLastDoneIndex(toDoList, lastDone);
  // firstly, we must decide from where to start reviewing
  // action 1: see if there are any reviewable items after the lastDone item
  if (lastDoneIndex !== -1) {
    // start reviews after lastDoneIndex if possible,
    // if not, then start reviews from lastMarked
    // ask, are there reviewable items after the last done item?
    if (getLastUnmarked(toDoList) > lastDoneIndex) {
      // we review starting from the lastUnmarkedIndex
      reviewStart = getNextItemOfStateAfterIndex(
        toDoList,
        TodoState.Unmarked,
        lastDoneIndex
      );
    }
  } else {
    if (itemExists(toDoList, "state", TodoState.Marked)) {
      // see if reviews are possible after lastMarked
      reviewStart = getLastMarked(toDoList);
    } else {
      // do nothing for now, though an warning should be thrown to user
    }
  }
  return reviewStart;
};

export const numberAndSlice = (
  toDoList: IToDoItem[],
  reviewStart: number
): INumberedItem[] => {
  return toDoList.map((x, i) => ({ item: x, index: i })).slice(reviewStart);
};

// consider a sample list `[x] [o] [ ]`
// isssue: Dev refactors conductAllReviews() to be modular and atomic #371
export const conductAllReviews = (
  toDoList: IToDoItem[],
  lastDone: string,
  answers: string[]
): IToDoItem[] => {
  // get a subset of reviewable items (ie. the last chunk
  // of a list that follows the either the last done item if it exists,
  // otherwise the last marked item).
  const reviewStart = determineReviewStart(toDoList, lastDone);
  // slice the list from the first reviewable item, and number them all
  let subsetList: INumberedItem[] = numberAndSlice(toDoList, reviewStart);
  // filter out the non-reviewable items
  let reviewables = subsetList.filter(
    x => x["item"]["state"] === TodoState.Unmarked
  );

  // get the answers from somewhere (eg. user) & review all the reviewable items
  reviewables = reviewables.map((x, i) => conductReviewNum(x, answers[i]));

  // now, rebuild the subset list, substituting back in the reviewed items
  for (let i = 0; i < reviewables.length; i++) {
    // find item with index of  in subset list
    // if(indexOfItem(subsetList, 'index', reviewables[i].index) !== -1) // guard in-case
    subsetList[indexOfItem(subsetList, "index", reviewables[i].index)] =
      reviewables[i];
  }

  // next, we will convert the subset list of INumberedItems back to ITodoItems
  const reviewedSubset: IToDoItem[] = subsetList.map(x => ({
    header: x.item.header,
    state: x.item.state
  }));
  // and lastly, we will put the two sections of the original list back together
  const firstPart = toDoList.slice(0, reviewStart);
  // return the reviewed list
  return firstPart.concat(reviewedSubset);
};

export const conductReview = (i: IToDoItem, answer: string): IToDoItem => {
  // FVP step 2: user story: User is asked to answer yes, no, or quit per review item #170
  if (answer === "y") {
    i = markItem(i);
  }
  return i;
};

export const conductReviewNum = (
  i: INumberedItem,
  answer: string
): INumberedItem => {
  // FVP step 2: user story: User is asked to answer yes, no, or quit per review item #170
  if (answer === "y") {
    i = { item: markItem(i.item), index: i.index };
  }
  return i;
};

// ready to review (for a list) means that:
// 1. there is at least 1 unmarked item AND
// ~~there are multiple ready items~~ <-- this by itself is wrong
// 2. If there are any marked items,
// the list has more unmarked after the last marked item
export const readyToReview = (toDoList: IToDoItem[]): boolean =>
  itemExists(toDoList, "state", TodoState.Unmarked) &&
  !(
    itemExists(toDoList, "state", TodoState.Marked) &&
    getLastMarked(toDoList) > getLastUnmarked(toDoList)
  );
