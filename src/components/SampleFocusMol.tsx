import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';

export const SampleFocusMol = (props: any) =>
	<Fragment>
		<p>
			<span>You are focusing on </span>
			<strong>{props.cmwtd}</strong>
		</p>
		<section className="flex flex-column">
			<LinkBtnMol
				className=""
				disabled={true}
				text="Return home without saving"
				to="/home-marked"
			/>

			<LinkBtnMol
				className=""
				disabled={true}
				text="Stopping with work left"
				to="/"
			/>

			<LinkBtnMol
				className="b"
				disabled={false}
				text="Task is 100% complete"
				to="/home-with-done"
			/>
		</section>
	</Fragment>