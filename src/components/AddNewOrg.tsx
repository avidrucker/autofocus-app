import React from 'react';

import { HeaderMol } from './HeaderMol';
import { LinkBtnMol } from './LinkBtnMol';
import { AppWrapper } from './AppWrapper';

// import { LoggerAtom } from './LoggerAtom';

export default class AddNewOrg extends React.Component
	<{designId: string, h2: string, step: string}, { btnDisabled: boolean, value: string }> {
	constructor(props: any) {
    super(props);
    this.state = {
			btnDisabled: true,
			value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	};
	
	handleChange(event: any) {
		this.setState({value: event.target.value});
		this.setState({btnDisabled: event.target.value.length < 4})
  };

  handleSubmit(event: any) {
    alert('A todo was submitted: ' + this.state.value);
    event.preventDefault();
	};
	
	handleClick(event: any) {
		
	}

	render() {
		return (
			<AppWrapper {...this.props}>
				{/* Note: This LoggerAtom is an exception in that it takes step, not demoCurrent */}
				{/*<LoggerAtom label="step" value={this.props.step} />*/}
				<HeaderMol
					h2={`${this.props.h2}, Step ${this.props.step}, Design ${this.props.designId}`}
					backBtn={true}
				/>
				{/* bg-green */}
				<section className="flex flex-column justify-between h-100 pa3 tc">
					<label htmlFor="todo-input">Enter a new todo:</label>
					<section>
						<textarea
							onChange={this.handleChange}
							id="todo-input"
							className="w-100 h34"
							// style={{width: '100%'}}
							placeholder="eg. Wash the dishes"
							value={this.state.value}
							required
						/>
						{/* now {this.state.value.length} */}
						{
							this.state.btnDisabled && this.state.value !== "" &&
							<label>Please make todo longer</label>
						}
					</section>
					{
							this.props.step === "F" &&
							<LinkBtnMol
								className="b"
								disabled={this.state.btnDisabled}
								text="Confirm"
								to="/home-3"
							/>
						}
						{
							this.props.step === "D" &&
							<LinkBtnMol
								className="b"
								disabled={this.state.btnDisabled}
								text="Confirm"
								to="/home-2"
							/>
						}
						{
							this.props.step === "B" &&
							<LinkBtnMol
								className="b"
								disabled={this.state.btnDisabled}
								text="Confirm"
								to="/home"
							/>
						}
						{
							!this.props.step &&
							<LinkBtnMol
								className="b"
								disabled={this.state.btnDisabled}
								text="Confirm (default)"
								to="/home"
							/>
						}
						
				</section>
			</AppWrapper>
		);
	};
}