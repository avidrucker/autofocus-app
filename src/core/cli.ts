import fs from "fs";
import readlineSync from "readline-sync";

import { conductFocus } from "./focus";
import { greetUser } from "./main";
import {
  readyToReview,
  setupReview,
  determineReviewStart,
  numberAndSlice
} from "./review";
import { constructNewTodoItem, IToDoItem, TodoState } from "./toDoItem";
import { getPluralS, isEmpty } from "./util";
import { INumberedItem } from "./numberedItem";
import { itemExists, getCMWTD, makePrintableTodoItemList, indexOfItem, addTodoToList, undotAll } from "./toDoList";

// ****************************************
// PROMPTS
// ****************************************

const newItemTitlePrompt = `Enter to-do item name \
(ie. wash the dishes). Enter 'Q' to quit: `;
const menuPrompt = "Please choose from the menu above:";

enum MainMenuChoice {
  AddNew = "Add New To-Do",
  ReviewTodos = "Review & Dot Todos",
  EnterFocus = "Enter Focus Mode",
  PrintList = "Print To-Do List",
  ClearDots = "Clear Dots",
  ReadAbout = "Read About AutoFocus",
  Quit = "Quit Program"
}

const menuChoices: MainMenuChoice[] = [
  MainMenuChoice.AddNew,
  MainMenuChoice.ReviewTodos,
  MainMenuChoice.EnterFocus,
  MainMenuChoice.PrintList,
  MainMenuChoice.ClearDots,
  MainMenuChoice.ReadAbout,
  MainMenuChoice.Quit
];

export const promptUserWithMainMenuCLI = (): MainMenuChoice => {
  return menuChoices[
    readlineSync.keyInSelect(menuChoices, menuPrompt, { cancel: false })
  ];
};

export const promptUserForYNQcli = (questionString: string): string => {
  return readlineSync
    .question(questionString, { limit: ["y", "n", "q", "Y", "N", "Q"] })
    .toLowerCase();
};

// issue: Architect reviews for opportunity to make DRY, SOLID #299
export const promptUserForNewTodoItemCLI = (): IToDoItem | null => {
  const headerText = readlineSync.question(newItemTitlePrompt, {
    limit: /\w+/i,
    limitMessage: "Sorry, $<lastInput> is not a valid to-do item title"
  }); // prevent empty input
  //// 113. let bodyText = "";
  if (headerText.toLowerCase() === "q") {
    return null;
  } else {
    //// 113. bodyText = readlineSync.question(newItemBodyPrompt);
    // issue: Dev implements momentjs datetime #103
    // issue: Dev implements IToDoItem uuid #104
    const newItem: IToDoItem = constructNewTodoItem(headerText); //// 113. bodyText

    generalPrintCLI(`New to-do item '${newItem.header}' successfully created!`);

    return newItem;
  }
};

export const waitForKeyPress = () => {
  readlineSync.keyInPause(); // issue: Dev fixes ENTER key not quitting/ending focus mode #217
};

// ****************************************
// PRINT FUNCTIONS
// ****************************************

export const generalPrintCLI = (s: string): void => {
  // tslint:disable-next-line:no-console
  console.log(s);
};

// todo: refactor to two functions: 1 string output function & 1 print function
// note: this func was originally printTodoItemCount
export const stringifyTodoItemCount = (list: IToDoItem[]): string => {
  return `You have ${list.length} to-do item${getPluralS(list.length)}.`;
};

// note: this func was originally printTodoItemCount
export const printTodoItemCountCLI = (list: IToDoItem[]): void => {
	generalPrintCLI(stringifyTodoItemCount(list));
}

// note: this func was originally printTodoItemList
const printTodoItemListCLI = (list: IToDoItem[]): void => {
  generalPrintCLI(makePrintableTodoItemList(list));
};

// todo: move strings to top of file
// issue: Architect reviews for opportunity to make DRY, SOLID #299
export const printUpdateCLI = (toDoList: IToDoItem[]): void => {
  if (!itemExists(toDoList, "state", TodoState.Marked)) {
    generalPrintCLI(`Your CMWTD is currently set to nothing.`);
  } else {
    generalPrintCLI(`Your CMWTD is '${getCMWTD(toDoList)}'.`);
  }

  if (isEmpty(toDoList)) {
    generalPrintCLI("Your current To-Do List is empty.");
  } else {
    generalPrintCLI("Your current To-Do List:");
    printTodoItemListCLI(toDoList);
  }
};

// ****************************************
// REVIEWING
// ****************************************

export const conductReviewsLoopCLI = (
  toDoList: INumberedItem[],
  originalCMWTD: string
) => {
  // FVP step 2: user story: User is asked to answer yes, no, or quit per review item #170
  let tempCMWTD = String(originalCMWTD);
  for (let i = 0; i < toDoList.length; i++) {
    //// get user answer
    let ans = getAnswerCLI(tempCMWTD, toDoList[i].item.header);
    if (ans === "y") {
      toDoList[i].item.state = TodoState.Marked;
      tempCMWTD = toDoList[i].item.header;
    }
    if (ans === "n") {
      // do nothing, and pass
    }
    if (ans === "q") {
      break;
    }
  }
  return toDoList;
};

// todo: refactor to be atomic
export const conductAllReviewsCLI = (
  toDoList: IToDoItem[],
  lastDone: string
): IToDoItem[] => {
  const reviewStart = determineReviewStart(toDoList, lastDone);
  let subsetList: INumberedItem[] = numberAndSlice(toDoList, reviewStart);
  let reviewables = subsetList.filter(
    x => x["item"]["state"] === TodoState.Unmarked
  );

  // CLI SPECIFIC CONDUCTING REVIEWS
  reviewables = conductReviewsLoopCLI(reviewables, getCMWTD(toDoList));

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

const createReviewPrompt = (a: string, b: string): string => {
	return `Do you want to '${b}' more than '${a}'? (Y/N/Q) `;
}

export const getAnswerCLI = (a: string, b: string): string => {
  return promptUserForYNQcli(createReviewPrompt(a, b));
};

// issue: Dev refactors printReviewSetupMessageCLI to be atomic #273
const printReviewSetupMessageCLI = (toDoList: IToDoItem[]): void => {
  if (isEmpty(toDoList)) {
    generalPrintCLI(
      "There are no items to review. Please enter mores items and try again."
    );
  } else if (!itemExists(toDoList, "state", TodoState.Unmarked)) {
    generalPrintCLI(
      "There are no items left to dot. Please enter more items and try again."
    );
  } else {
    generalPrintCLI("Marking the first ready item...");
  }
};

// issue: Architect reviews for opportunity to make DRY, SOLID #299
const attemptReviewTodosCLI = (
  toDoList: IToDoItem[],
  lastDone: string
): IToDoItem[] => {
  if (isEmpty(toDoList)) {
    return toDoList;
  }
  toDoList = setupReview(toDoList);
  printReviewSetupMessageCLI(toDoList);

  // step 0: check to see if there are any non-complete, non-archived items
  if (readyToReview(toDoList)) {
    // issue: Dev handles for list review when there are 2 or less items #107
    // issue: Architect designs option to always quit mid-menu #109
    // issue: Dev implements E2E test for CLA #110
    // issue: Dev implements to-do item store using redux pattern #106
    toDoList = conductAllReviewsCLI(toDoList, lastDone);
    printUpdateCLI(toDoList);
  }
  return toDoList;
};

// ****************************************
// FOCUS MODE
// ****************************************

// todo: refactor to make atomic
// issue: Architect reviews for opportunity to make DRY, SOLID #299
const enterFocusCLI = (
  toDoList: IToDoItem[],
  lastDone: string
): [IToDoItem[], string] => {
  // 0. confirm that focusMode can be safely entered
  if (isEmpty(toDoList)) {
    generalPrintCLI(
      "There are no to-do items. Please enter to-do items and try again."
    );
    return [toDoList, lastDone];
  }
  if (!itemExists(toDoList, "state", TodoState.Marked)) {
    generalPrintCLI(
      "There is no 'current most want to do' item. Please review your items and try again."
    );
    return [toDoList, lastDone];
  }

  // 1. clear the console view
  // tslint:disable-next-line:no-console
  console.clear();

  // 2. show the current to-do item
  generalPrintCLI(`You are working on '${getCMWTD(toDoList)}'`);

  // 3. wait for any key to continue
  waitForKeyPress();

  // 4. ask the user if they have work left to do on current item
  // If there is work left to do on the cmwtd item, a duplicate issue is created.
  // to-do: refactor workLeft object to simple yes/no prompt or, more formalized interface
  // issue: Dev refactors out any type from function returns #374
  const response: any = { workLeft: "n" }; // initialize default "no" workLeft response
  if (promptUserForYNQcli(`Do you have work left to do on this item?`) === "y") {
    response.workLeft = "y";
  }

  // 5. mark the cmwtd item as done
  [toDoList, lastDone] = conductFocus(toDoList, lastDone, response);

  return [toDoList, lastDone];
};

const addNewCLI = (toDoList: IToDoItem[]): IToDoItem[] => {
  const temp: IToDoItem | null = promptUserForNewTodoItemCLI();
  if (temp !== null) {
    toDoList = addTodoToList(toDoList, temp);
    // issue: Dev implements to-do item store using redux pattern #106
  }

  return toDoList;
};

// ****************************************
// MAIN PROGRAM LOOP
// ****************************************

// issue: Architect reviews for opportunity to make DRY, SOLID #299
// issue: Dev refactors out any type from function returns #374
const menuActions: any = {
  [MainMenuChoice.AddNew]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    toDoList = addNewCLI(toDoList);
    printTodoItemCountCLI(toDoList);
    return [toDoList, lastDone, true];
  },
  [MainMenuChoice.ReviewTodos]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    toDoList = attemptReviewTodosCLI(toDoList, lastDone);
    return [toDoList, lastDone, true];
  },
  [MainMenuChoice.EnterFocus]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    [toDoList, lastDone] = enterFocusCLI(toDoList, lastDone);
    return [toDoList, lastDone, true];
  },
  [MainMenuChoice.PrintList]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    printUpdateCLI(toDoList);
    return [toDoList, lastDone, true];
  },
  [MainMenuChoice.ClearDots]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    generalPrintCLI("Removing dots from dotted items...");
    generalPrintCLI("Resetting the CMWTD...");
    return [undotAll(toDoList), lastDone, true];
  },
  [MainMenuChoice.ReadAbout]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    // issue: Dev adds about section text print out #128
    generalPrintCLI("This is stub (placeholder) text. Please check back later.");
    return [toDoList, lastDone, true];
  },
  [MainMenuChoice.Quit]: (
    toDoList: IToDoItem[],
    lastDone: string
  ): [IToDoItem[], string, boolean] => {
    return [toDoList, lastDone, false];
  }
};

// issue: Dev implements delete list feature #369

interface IDeserializeableTodoList {
  toDoList: IToDoItem[];
  lastDone: string;
}

const loadState = (): [IToDoItem[], string] => {
  const strBuffer = "Loading to-do list";
  let toDoList: IToDoItem[] = [];
  let lastDone: string = "";
  let jsonData: IDeserializeableTodoList = { toDoList: [], lastDone: "" };
  try {
    jsonData = JSON.parse(fs.readFileSync("todos.json", "utf8"));
    console.log(strBuffer, "... load was successful!");
    toDoList = jsonData["toDoList"];
    lastDone = jsonData["lastDone"];
  } catch (err) {
    console.log(strBuffer, "... load was NOT successful :(");
  }

  return [toDoList, lastDone];
};

// SAVE STATE
// issue: Dev implements saving over-write check #370
const saveState = (toDoList: IToDoItem[], lastDone: string): void => {
  const strBuffer = "Saving to-do list";
  const jsonData = JSON.stringify({
    toDoList: toDoList,
    lastDone: lastDone
  });
  try {
    fs.writeFileSync("todos.json", jsonData, "utf8");
    console.log(strBuffer, "... save was successful!");
  } catch (err) {
    console.log(strBuffer, "... save was NOT successful :(");
  }
};

export const mainCLI = (): void => {
  generalPrintCLI(greetUser());

  // initialize program variables
  let toDoList: IToDoItem[] = [];
  let lastDone: string = "";

  [toDoList, lastDone] = loadState(); // auto-load

  // start main program loop
  let running = true;
  while (running) {
    const answer = promptUserWithMainMenuCLI();
    [toDoList, lastDone, running] = menuActions[answer](toDoList, lastDone);
  }

  saveState(toDoList, lastDone); // auto-save

  generalPrintCLI("Have a nice day!");
};

const sampleOutput: string = `Welcome to AutoFocus!

[1] Add New To-Do
[2] Review & Dot Todos
[3] Enter Focus Mode
[4] Print To-Do List
[5] Clear Dots
[6] Read About AutoFocus
[7] Quit Program

Please choose from the menu above [1...7]: 1
Enter to-do item name (ie. wash the dishes).
Enter 'Q' to quit: Make cup of coffee
New to-do item 'Make cup of coffee' created!
Your list now has 1 to-do item.
`;

export const printSampleOutput = (): void => {
  generalPrintCLI(sampleOutput);
};

export default {};