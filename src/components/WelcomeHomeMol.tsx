import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';

// import { LoggerAtom } from './LoggerAtom';

export const WelcomeHomeMol = (props: any) =>
	<Fragment>
	{/* to-do: add styling to each component: className="flex flex-column items-center justify-between h-100 pa3 tc" */}
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<p>Welcome to AutoFocus!</p>
		<p>Tap the button below to add a new to-do item.</p>
		<LinkBtnMol
			className="b"
			text="Add To-Do"
			to="/add-new"
		/>
	</Fragment>