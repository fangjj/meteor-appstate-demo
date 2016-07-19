import { Meteor } from 'meteor/meteor';
import { Todos } from '../index';
import { types } from '/imports/store/modules/todos';

Meteor.publish('todos.list', function({ filter, limit }) {
	const validTypes = _.toArray(types);
	check(filter, Match.OneOf(...validTypes));
	let selector = option = {};

	// simulate latency
	Meteor._sleepForMs(2000);

	// selector
	switch(filter) {
		case types.FILTER_ACTIVE:
			selector['completed'] = false;
		break;

		case types.FILTER_COMPLETED:
			selector['completed'] = true;
		break;
	}

	// option
	option = {
		limit: limit + 1,
		sort: {
			createdAt: -1
		}
	};

	return Todos.find(selector, option);
});