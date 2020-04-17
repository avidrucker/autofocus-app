import React  from 'react';

export const BoxWrapper = 
	(props: any) =>
	<div className={props.className + " ba b--black"}>
		{props.children}
	</div>;