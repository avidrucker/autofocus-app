import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';
// import { LoggerAtom } from './LoggerAtom';

export const SampleHomeMol1Unmarked = (props: any) =>
	<Fragment>
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<ul className="tl center">
			<li className="unmarked">Finish trig problem sets</li>
		</ul>
		<section>

			<LinkBtnMol
				className=""
				disabled={true}
				text="Review Todos"
				to="/review"
			/>

			{
				props.demoCurrent === "C" &&
				<LinkBtnMol
					className="b"
					disabled={false}
					text="Add Todo (demo)"
					to="/add-new-2"
				/>
			}
			{
				!props.demoCurrent &&
				<LinkBtnMol
					className="b"
					disabled={false}
					text="Add Todo (default)"
					to="/add-new"
				/>
			}
		</section>
	</Fragment>