import React, { Fragment } from 'react';

import { LinkBtnMol } from './LinkBtnMol';
// import { LoggerAtom } from './LoggerAtom';

export const SampleReviewMol = (props: any) =>
	<Fragment>
		{/*<LoggerAtom label="demoCurrent" value={props.demoCurrent} />*/}
		<p>
			<span>Do you want to </span>
			<strong>{props.current}</strong>
			<span> more than </span>
			<strong>{props.cmwtd}</strong>
			<span>?</span>
		</p>
		<section className="flex flex-column">
			{
				props.demoCurrent === "H" &&
				<Fragment>
					<LinkBtnMol
						className="b"
						text="No"
						to="review-2"
					/>
					<LinkBtnMol
						disabled={true}
						text="Yes"
						to="/"
					/>
				</Fragment>
			}
			{
				props.demoCurrent === "I" &&
				<Fragment>
					<LinkBtnMol
						disabled={true}
						text="No"
						to="/home-marked"
					/>
					<LinkBtnMol
						className="b"
						disabled={false}
						text="Yes"
						to="/home-marked"
					/>
				</Fragment>
			}
			<LinkBtnMol
				disabled={true}
				text="Stop Reviewing"
				to="/home"
			/>
		</section>
	</Fragment>