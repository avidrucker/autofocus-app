import React, { Fragment }  from 'react';

export const AppWrapper = 
	(props: any) =>
	<Fragment>
		{
			props.demo === "demo" &&
			<section className="bg-black w-100">
				{/* bg-pink */}
				<section
					className={props.className + 
						" flex flex-column vh-100 bg-white measure-very-narrow center"}>
					{props.children}
				</section>
			</section>
		}
		{
			!props.demo &&
			<Fragment>
				{props.children}
			</Fragment>
		}
	</Fragment>
	;