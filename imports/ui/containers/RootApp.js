import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Todos as todosCollection } from '/imports/api/todos';
import { actions as todoActions } from '/imports/store/modules/todos';

// Views
import TodoForm from '/imports/ui/components/TodoForm';
import TodoList from '/imports/ui/components/TodoList';
import Footer from '/imports/ui/components/Footer';

class RootApp extends Component {

	/**
	 * @event
	 * Form submit
	 */
	_onSubmit = text => {
		if(!_.isEmpty(text)) {
			Meteor.AppState.dispatch(todoActions.addToto(text));
		}
	}

	/**
	 * @event
	 * listen on click toggle todo item
	 */
	_onToggleTodo = todo => {
		Meteor.AppState.dispatch(todoActions.toggleTodo(todo._id));
	}

	/**
	 * @event
	 * listen on user click remove todo item
	 */
	_onRemoveTodo = todo => {
		Meteor.AppState.dispatch(todoActions.removeTodo(todo._id));
	}

	_onSetFilter = filter => {
		Meteor.AppState.dispatch(todoActions.setFilter(filter));
	}

	/**
	 * @event
	 * listen on user click clear completed items
	 */
	_onClearCompleted = () => {
		Meteor.AppState.dispatch(todoActions.clearCompleted());	
	}	

	/**
	 * @event
	 * listen on user click load more
	 */
	_onLoadMore = () => {
		Meteor.AppState.dispatch(todoActions.loadMore());	
	}

	render() {
		const { isLoading, todos, total, filter, hasMore } = this.props;

		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<TodoForm onSubmit={this._onSubmit} />
				</header>
				<section className="main">

					<TodoList 
						todos={todos} 
						hasMore={hasMore} 
						onToggleTodo={this._onToggleTodo}
						onRemoveTodo={this._onRemoveTodo}
						onLoadMore={this._onLoadMore}
					/>

					{ isLoading && (
						<div style={{textAlign: 'center', margin: '10px 0'}}>
							<img src="/img/loading.svg" width={48} />
						</div>
					)}
					
				</section>
				
				<Footer
					total={total}
					filter={filter} 
					onSetFilter={this._onSetFilter}
					onClearCompleted={this._onClearCompleted}
				/>
			</section>
		);
	}
}

const mapMeteorToProps = params => {
	const state = Meteor.AppState.get('todos');
	const sub = Meteor.subscribe('todos.list', {
		filter: state.filter,
		limit: state.limit,
	});

	const selector = {};
	switch(state.filter) {
		case 'FILTER_ACTIVE':
			selector['completed'] = false;
		break;
		case 'FILTER_COMPLETED':
			selector['completed'] = true;
		break;
	}
	// query option
	const option = {
		limit: state.limit,
		sort: { createdAt: -1 }
	};

	// finalize
	const isLoading = !sub.ready() || state.loading;
	const todos = todosCollection.find(selector, option).fetch();
	const total = todosCollection.find(selector).count();
	const hasMore = total > state.limit;

	return {
		filter: state.filter,
		isLoading,
		todos,
		total,
		hasMore,
	};
}

export default createContainer(mapMeteorToProps, RootApp);