import React from 'react';

import { HeaderMol } from './HeaderMol';
import { SampleFocusMol } from './SampleFocusMol';
import { AppWrapper } from './AppWrapper';
// import { LoggerAtom } from './LoggerAtom';

export default function FocusOrg (props: any) {
	return (
		<AppWrapper {...props}>
			{/* Note: This LoggerAtom is an exception in that it takes step, not demoCurrent */}
			{/*<LoggerAtom label="step" value={props.step} />*/}
			<HeaderMol
				h2={`${props.h2}, Step ${props.step}, Design ${props.designId}`}
				backBtn={true} 
			/>
			{/* bg-pink */}
			<section className="flex flex-column justify-between h-100 pa3 tc">
				{
					props.step === "K" &&
					<SampleFocusMol cmwtd="pack for trip tomorrow (demo)" />	
				}
				{
					!props.step &&
					<SampleFocusMol cmwtd="do the dishes (default)" />
				}
			</section>
		</AppWrapper>
	);
}