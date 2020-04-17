import React  from 'react';

export const HeaderWrapper = 
	(props: any) =>
	<div className={props.className + " pa2 bg-blue"}>
		{props.children}
	</div>;