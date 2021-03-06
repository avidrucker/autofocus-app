export enum TodoState {
  Unmarked,
  Marked,
  Completed
}

export interface IToDoItem {
  // created: string;
  header: string;
  // modified: string;
  state: TodoState;
  // uuid: string;
}

export const constructNewTodoItem = (
  headerText: string,
  // bodyText: string = "",
  stateIn: TodoState = TodoState.Unmarked
): IToDoItem => {
  const newItem: IToDoItem = {
    // body: bodyText,
    // created:"temp_created_date",
    header: headerText,
    // modified:"temp_created_date",
    state: stateIn
    // uuid:"temp_unique_universal_identifier"
  };
  return newItem;
};

const MARKED = "o";
const NO_MARK = " ";
const DONE = "x";
// const ARCHIVED = 'A';
// const ERROR = '!';
// const NULL = '?';

// issue: Dev refactors out any type from function returns #374
export const getMark: any = {
  [TodoState.Marked]: () => `[${MARKED}]`,
  [TodoState.Unmarked]: () => `[${NO_MARK}]`,
  [TodoState.Completed]: () => `[${DONE}]`
  // [TodoState.Archived] : () => `[${ARCHIVED}]`,
  // [TodoState.Null] : () => `[${NULL}]`,
  // [TodoState.Error] : () => `[${ERROR}]`
};

export const stringifyTodoItem = (i: IToDoItem): string => {
  return `${getMark[i.state]()} ${i.header}`;
};

// "to-do item is ready for review"
export const isReady = (i: IToDoItem): boolean => {
  return i.state === TodoState.Unmarked || i.state === TodoState.Marked;
};

// issue: Dev implements deep copy of UUID, & updated modified date value #283
export const setState = (i: IToDoItem, newState: TodoState): IToDoItem => {
  return constructNewTodoItem(i.header, newState); // note: this creates a NEW to-do item
};

// note: this creates a NEW to-do item
export const undot = (i: IToDoItem): IToDoItem => {
  return i.state === TodoState.Marked ? constructNewTodoItem(i.header) : i;
};
