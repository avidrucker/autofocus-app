import { ITodoItem } from "./core/todoItem";

const getActionFromUser = (): [ITodoItem[], string] => {
	return [
		[
			{header:"eat dinner", state:0},
			{header:"wash dishes", state:0},
			{header:"go to sleep", state:0}
		], "hi"];
}

export const mainWebApp = (todoList: ITodoItem[], lastDone: string): [ITodoItem[], string] => {
	[todoList, lastDone] = getActionFromUser();

	console.log(`todoList`, todoList);
	console.log(`lastDone: ${lastDone}`);

	return [todoList, lastDone];
}