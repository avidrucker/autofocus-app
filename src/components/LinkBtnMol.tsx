import React from 'react';
import { Link } from 'react-router-dom';

export const LinkBtnMol = (props: any) =>
		<Link to={props.to}>
			<button
				disabled={props.disabled}
				className={props.className + " w-100"}
				>
				{props.text}
			</button>
		</Link>