import React from 'react';
import BackBtnAtom from './BackBtnAtom';
import { HeaderWrapper } from './HeaderWrapper';

export const HeaderMol = (props: any) =>
	<header className="relative w-100 white">
		<HeaderWrapper>
			{!!props.backBtn &&
				<BackBtnAtom text="Back" className="mr2" />
			}
			<h1 className={!!props.backBtn ? "dib" : ""}>
				AutoFocus
			</h1>
			<div className="absolute top-0 right-0 o-70 pa1 w-40">
				<label>{props.h2}</label>
			</div>
		</HeaderWrapper>
	</header>