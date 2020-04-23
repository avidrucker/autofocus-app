import React from 'react';

import { mainWebApp } from './model';
import { IToDoItem } from './core/toDoItem';

function App() {
	let toDoList: IToDoItem[] = [];
	let lastDone: string = "";
	[toDoList, lastDone] = mainWebApp(toDoList, lastDone);

	const listItems = <ul>{toDoList.map(x => <li>{x.header}</li>)}</ul>;

  return (
    <section className="debug">
      <section>{listItems}</section>
			<section>Last done is {lastDone}</section>
    </section>
  );
}

export default App;
