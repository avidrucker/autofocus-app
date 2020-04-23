import { IToDoItem } from "./core/toDoItem";

const getActionFromUser = (): [IToDoItem[], string] => {
	return [
		[
			{header:"eat dinner", state:0},
			{header:"wash dishes", state:0},
			{header:"go to sleep", state:0}
		], "hi"];
}

export const mainWebApp = (toDoList: IToDoItem[], lastDone: string): [IToDoItem[], string] => {
	[toDoList, lastDone] = getActionFromUser();

	console.log(`toDoList`, toDoList);
	console.log(`lastDone: ${lastDone}`);

	return [toDoList, lastDone];
}