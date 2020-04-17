import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';

// import { LoggerAtom } from './LoggerAtom';

export const SampleHomeMol2Marked = (props: any) =>
	<Fragment>
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<ul className="tl center">
			<li className="marked">Finish trig problem sets</li>
			<li className="unmarked">Wash the dishes</li>
			<li className="marked"><strong>Pack for trip tomorrow</strong></li>
		</ul>
		<section>
			<LinkBtnMol
				className="b"
				disabled={false}
				text="Focus on Todo"
				to="/focus"
			/>
			<LinkBtnMol
				className=""
				disabled={true}
				text="Review Todos"
				to="/review"
			/>
			<LinkBtnMol
				className=""
				disabled={true}
				text="Add Todo"
				to="/add-new"
			/>
		</section>
	</Fragment>