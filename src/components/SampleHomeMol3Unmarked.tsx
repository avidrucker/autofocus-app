import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';

// import { LoggerAtom } from './LoggerAtom';

export const SampleHomeMol3Unmarked = (props: any) =>
	<Fragment>
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<ul className="tl center">
			<li className="unmarked">Finish trig problem sets</li>
			<li className="unmarked">Wash the dishes</li>
			<li className="unmarked">Pack for trip tomorrow</li>
		</ul>
		<section>
		{
				props.demoCurrent === "G" &&
				<LinkBtnMol
					className="b"
					text="Review Todos (demo)"
					to="/review"
				/>
			}
			{
				!props.demoCurrent &&
				<LinkBtnMol
					className="b"
					text="Review Todos (default)"
					to="/review"
				/>
			}
			<LinkBtnMol
					disabled={true}
					text="Add Todo (demo)"
					to="/add-new"
				/>
		</section>
	</Fragment>