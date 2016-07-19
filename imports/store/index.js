import { Meteor } from 'meteor/meteor';
import { AppState } from './store';
import Promise from 'bluebird';
import thunk from 'redux-thunk';
import diff from 'redux-diff-logger';
import logger from 'redux-logger';

// Modules
import * as todosModule from './modules/todos';

export const createStore = () => {
	return new Promise((resolve, reject) => {

		// Apply middlewares
		const middlewares = [thunk, logger(), diff];
		Meteor.AppState = new AppState({ middlewares });

		// register modules
		Meteor.AppState.loadModule(todosModule);

		// done
		resolve();
	});
}
