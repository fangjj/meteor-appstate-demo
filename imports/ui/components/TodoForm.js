import React, { Component } from 'react';

export default class TodoForm extends Component {
	render() {
		const { onSubmit = () => null } = this.props;
		return (
			<form 
				onSubmit={e => {
					e.preventDefault();
					const { text } = this.refs;
					onSubmit(text.value);
					text.value = '';
				}}
			>
				<input 
					className="new-todo" 
					placeholder="What needs to be done?" 
					autoFocus={true}
					ref="text"
				/>
			</form>
		);
	}
}
