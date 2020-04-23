import { INumberedItem } from "./numberedItem";
import {
  getMark,
  IToDoItem,
  stringifyTodoItem,
  TodoState,
  undot
} from "./toDoItem";
import { getMinFrom0Up, isEmpty } from "./util";

// issue: Dev refactors out any type from function returns #374
export const indexOfItem = (
  list: any[],
  attr: string,
  val: TodoState
): number => {
  return list.map(e => e[attr]).indexOf(val);
};

// issue: Dev refactors out any type from function returns #374
export const indexOfItemAfter = (
  list: any[],
  attr: string,
  val: TodoState,
  from: number
): number => {
  return list.map(e => e[attr]).indexOf(val, from);
};

// issue: Dev refactors out any type from function returns #374
export const lastIndexOfItem = (
  list: any[],
  attr: string,
  val: TodoState
): number => {
  return list.map(e => e[attr]).lastIndexOf(val);
};

export const itemExists = (
  list: IToDoItem[],
  attr: string,
  val: TodoState
): boolean => {
  return indexOfItem(list, attr, val) !== -1;
};

export const makePrintableTodoItemList = (toDoList: IToDoItem[]): string => {
  let temp: string = "";
  if (isEmpty(toDoList)) {
    temp = "There are no to-do items to print.";
  } else {
    temp = toDoList.map(x => stringifyTodoItem(x)).join("\n");
  }
  return temp;
};

export const listToMarks = (toDoList: IToDoItem[]): string => {
  return toDoList.map(x => getMark[x.state]()).join(" ");
};

// note: this is useful for logging purposes only, marked for deletion
export const numListToMarks = (toDoList: INumberedItem[]): string => {
  return toDoList.map((x, i) => `[${i}: ${getMark[x.item.state]()}]`).join(" ");
};

export const numListToTodoList = (toDoList: INumberedItem[]): IToDoItem[] => {
  return toDoList.map(x => x.item);
};

export const addTodoToList = (
  toDoList: IToDoItem[],
  newTodoItem: IToDoItem
): IToDoItem[] => {
  toDoList.push(newTodoItem);
  return toDoList;
};

// returns -1 if there are no unmarked items
export const getFirstUnmarked = (toDoList: IToDoItem[]): number => {
  return indexOfItem(toDoList, "state", TodoState.Unmarked);
};

// returns -1 if there are no marked items
export const getFirstMarked = (toDoList: IToDoItem[]): number => {
  return indexOfItem(toDoList, "state", TodoState.Marked);
};

// returns -1 if there are no marked items
export const getLastMarked = (toDoList: IToDoItem[]): number => {
  return lastIndexOfItem(toDoList, "state", TodoState.Marked);
};

// returns -1 if there are no unmarked items
export const getLastUnmarked = (toDoList: IToDoItem[]): number => {
  return lastIndexOfItem(toDoList, "state", TodoState.Unmarked);
};

export const firstReady = (toDoList: IToDoItem[]): number => {
  const firstUnmarked = getFirstUnmarked(toDoList);
  const firstMarked = getFirstMarked(toDoList);
  return getMinFrom0Up(firstUnmarked, firstMarked);
};

export const undotAll = (toDoList: IToDoItem[]): IToDoItem[] => {
  return toDoList.map(x => undot(x));
};

// "getLastMarkedHeader"
export const getCMWTD = (toDoList: IToDoItem[]): string => {
  // short-circuit with empty string when there is no CMWTD
  if (!itemExists(toDoList, "state", TodoState.Marked)) {
    return "";
  }
  return toDoList[getLastMarked(toDoList)].header;
};
