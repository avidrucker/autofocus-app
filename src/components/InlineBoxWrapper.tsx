import React  from 'react';

export const InlineBoxWrapper = 
	(props: any) =>
	<div className={props.className + " ma2 ba b--black dib"}>
		{props.children}
	</div>;