import React from 'react';

export const LoggerAtom = (props: any) => {
	return <p className="red">{props.label} is {props.value}</p>
}