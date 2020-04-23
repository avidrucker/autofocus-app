import { constructNewTodoItem, IToDoItem, TodoState } from "./toDoItem";
import { getLastMarked, itemExists, getCMWTD } from "./toDoList";
import { isEmpty } from "./util";

// issue: Dev refactors out any type from function returns #374
export const conductFocus = (
  toDoList: IToDoItem[],
  lastDone: string,
  response: any
): [IToDoItem[], string] => {
  // return w/o affecting state if focus mode cannot be entered
  if (isEmpty(toDoList) || !itemExists(toDoList, "state", TodoState.Marked)) {
    return [toDoList, lastDone]; // no focus exit
  }
  const workLeft: string = response.workLeft; // this will be either 'y' or 'n'
  if (workLeft === "y") {
    toDoList = duplicateLastMarked(toDoList);
  }
  [toDoList, lastDone] = markLastMarkedComplete(toDoList, lastDone);
  return [toDoList, lastDone];
};

export const markLastMarkedComplete = (
  toDoList: IToDoItem[],
  lastDone: string
): [IToDoItem[], string] => {
  lastDone = getCMWTD(toDoList); // 1. update last done
  toDoList[getLastMarked(toDoList)].state = TodoState.Completed; // 2. set it to completed
  return [toDoList, lastDone];
};

export const duplicateLastMarked = (toDoList: IToDoItem[]): IToDoItem[] => {
  const newItem: IToDoItem = constructNewTodoItem(getCMWTD(toDoList));
  toDoList.push(newItem);
  return toDoList;
};

// issue: Architect determines whether to use readyToFocus() #275
export const readyToFocus = (toDoList: IToDoItem[]): boolean => {
  return itemExists(toDoList, "state", TodoState.Marked);
};
