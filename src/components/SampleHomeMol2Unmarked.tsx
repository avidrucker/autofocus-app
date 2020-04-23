import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';

// import { LoggerAtom } from './LoggerAtom';

export const SampleHomeMol2Unmarked = (props: any) =>
	<Fragment>
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<ul className="tl center">
			<li className="unmarked">Finish trig problem sets</li>
			<li className="unmarked">Wash the dishes</li>
		</ul>
		<section>
			<LinkBtnMol
				className=""
				disabled={true}
				text="Review Todos"
				to="/review"
			/>
			{
				!props.demoCurrent &&
				<LinkBtnMol
					className="b"
					disabled={false}
					text="Add To-Do (default)"
					to="/add-new"
				/>
			}
			{
				props.demoCurrent === "E" &&
				<LinkBtnMol
					className="b"
					disabled={false}
					text="Add To-Do (demo)"
					to="/add-new-3"
				/>
			}
		</section>
	</Fragment>