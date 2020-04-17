import React from 'react';

import { HeaderMol } from './HeaderMol';
import { SampleReviewMol } from './SampleReviewMol';
import { AppWrapper } from './AppWrapper';

export default function ReviewOrg (props: any) {
	const todoList: string[] = ['finish trig problem sets','wash the dishes','pack for trip tomorrow'];
	return (
		<AppWrapper {...props}>
			<HeaderMol
				h2={`${props.h2}, Step ${props.step}, Design ${props.designId}`}
				backBtn={true}
			/>
			{/* bg-yellow */}
			<section className="flex flex-column justify-between h-100 pa3 tc">
			{
				props.step === "H" &&
				<SampleReviewMol cmwtd={todoList[0]} current={todoList[1]} demoCurrent={props.step} />
			}
			{
				props.step === "I" &&
				<SampleReviewMol cmwtd={todoList[0]} current={todoList[2]} demoCurrent={props.step} />
			}
			{/* DEFAULT CASE */}
			{
				!props.step &&
				<SampleReviewMol cmwtd="bunny" current="rabbit" demoCurrent={props.step} />
			}
			</section>
		</AppWrapper>
	);
}