import React from 'react';
import { withRouter } from 'react-router-dom';

const BackBtnAtom = (props: any) =>
		<button
			className={props.className}
			onClick={props.history.goBack}>
				{props.text}
		</button>

export default withRouter(BackBtnAtom);