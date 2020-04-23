import React, { Fragment } from 'react';

import { HeaderMol } from './HeaderMol';
import { WelcomeHomeMol } from './WelcomeHomeMol';
// import { SampleHomeMol1Unmarked } from './SampleHomeMol1Unmarked';
// import { SampleHomeMol2Unmarked } from './SampleHomeMol2Unmarked';
// import { SampleHomeMol3Unmarked } from './SampleHomeMol3Unmarked';
import { SampleHomeMol2Marked } from './SampleHomeMol2Marked';
import { SampleHomeMol1Marked1Complete } from './SampleHomeMol1Marked1Complete';
// import { LinkBtnMol } from './LinkBtnMol';
import { AppWrapper } from './AppWrapper';


// note: this is the main home org component
export default function HomeOrg (props: any) {
	return (
		<AppWrapper {...props}>
			<HeaderMol h2={`${props.h2}`} />
			<section className="flex flex-column justify-between h-100 pa3 tc">
				{/* CLEAN STATE, NO TODOS */}
				{
					props.h2 === "Welcome Home" &&
					<WelcomeHomeMol demoCurrent="A" />
				}
				{/* 3 TODOs */}
				{
					!!props.currentList &&
					props.currentList
				}
				{/* 3 TODOs w/ 2 Marked */}
				{
					props.h2 === "Home Marked" &&
					<SampleHomeMol2Marked demoCurrent="J" />
				}
				{/* 3 TODOs w/ 1 Marked & 1 Complete */}
				{
					props.h2 === "Home With 1 Done" &&
					<Fragment>
						<SampleHomeMol1Marked1Complete demoCurrent="L" />
					</Fragment>
				}
			</section>
		</AppWrapper>
	);
}