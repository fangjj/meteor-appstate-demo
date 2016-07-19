import React, { Component } from 'react';

export default class TodoList extends Component {
	render() {
		const {
			todos        = [],
			hasMore      = false,
			onToggleTodo = () => null,
			onRemoveTodo = () => null,
			onLoadMore   = () => null,
		} = this.props;

		return (
			<div>
				<ul className="todo-list">
					{todos.map((todo, key) => (
						<li key={key} className={todo.completed ? 'completed': ''}>
							<div className="view">
								<input
									className="toggle" 
									type="checkbox" 
									onChange={e => onToggleTodo(todo)}
									checked={todo.completed}
								/>
								<label>{ todo.text }</label>
								<button className="destroy" onClick={e => onRemoveTodo(todo)}></button>
							</div>
						</li>
					))}
				</ul>

				{ hasMore && (
					<div style={{textAlign: 'center', margin: '10px 0'}}>
						<button onClick={onLoadMore}>Load more</button>
					</div>
				)}
			</div>
		);
	}
}