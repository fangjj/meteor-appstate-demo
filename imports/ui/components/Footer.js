import React, { Component } from 'react';
export default class Footer extends Component {
	state = {
		filterItems: [
			{ name: 'All', value: 'FILTER_ALL' },
			{ name: 'Active', value: 'FILTER_ACTIVE' },
			{ name: 'Completed', value: 'FILTER_COMPLETED' },
		]
	}

	render() {
		const { 
			total, 
			filter, 
			onSetFilter = () => null,
			onClearCompleted = () => null,
		} = this.props;

		return (
			<footer className="footer">
				<span className="todo-count"><strong>{ total }</strong> item left</span>
				<ul className="filters">
					{ this.state.filterItems.map((item, key) => (
						<li key={key}>
							<a 
								className={item.value == filter ? 'selected' : ''} 
								href="#" 
								onClick={e => onSetFilter(item.value)}
							>
								{ item.name }
							</a>
						</li>	
					)) }
				</ul>

				<button 
					className="clear-completed" 
					onClick={ e => onClearCompleted()}
				>
					Clear completed
				</button>
			</footer>
		);
	}
}