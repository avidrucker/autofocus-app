import React from 'react';

import { mainWebApp } from './model';
import { IToDoItem } from './core/toDoItem';
import HomeOrg from './components/HomeOrg';

function App() {
	let toDoList: IToDoItem[] = [];
	let lastDone: string = "";
	[toDoList, lastDone] = mainWebApp(toDoList, lastDone);

	const listItems = <ul>{
		toDoList.map(x => 
					<li className={x.state === 0 ? "unmarked" : "marked"}>
						{x.header}
					</li>
				)
			}
		</ul>;

  return (
    <section className="debug">
			<HomeOrg h2="Home" currentList={listItems} />
			<section>Last done is {lastDone}</section>
    </section>
  );
}

export default App;
