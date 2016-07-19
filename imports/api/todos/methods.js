import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Todos } from './index';

/**
 * create new todo
 * @param {[type]} options.name:  'todos.create' [description]
 * @param {[type]} options.run({ text           [description]
 */
export const create = new ValidatedMethod({
	name: 'todos.create',
	validate: new SimpleSchema({
		text: {
			type: String
		}
	}).validator(),
	run({ text }) {
		return Todos.insert({
			text,
			completed: false,
			createdAt: new Date(),
		});
	}
});

/**
 * Toggle status completed
 * @param {[type]} {	name: 'todos.toggle',	run({ _id, status }) {		let completed;		const todo [description]
 */
export const toggle = new ValidatedMethod({
	name: 'todos.toggle',
	validate: new SimpleSchema({
		_id: {
			type: String
		},
		status: {
			type: Boolean,
			optional: true
		}
	}).validator(),
	run({ _id, status }) {
		let completed;
		const todo = Todos.findOne({ _id });
		if(!todo) return false;
		if(status != undefined) {
			completed = status; 
		} else {
			completed = !todo.completed;
		}
		return Todos.update({ _id }, { $set: { completed } });
	}
});

/**
 * Remove single todo by id
 * @param {[type]} options.name:  'todos.remove' [description]
 * @param {[type]} options.run({ _id            [description]
 */
export const remove = new ValidatedMethod({
	name: 'todos.remove',
	validate: new SimpleSchema({
		_id: {
			type: String
		}
	}).validator(),
	run({ _id }) {
		return Todos.remove({ _id });
	}
});

/**
 * clear all todos which completed
 * @param {[type]} {	name: 'todos.clearCompleted',	run( [description]
 */
export const clearCompleted = new ValidatedMethod({
	name: 'todos.clearCompleted',
	validate: new SimpleSchema({}).validator(),
	run() {
		return Todos.remove({completed: true});
	}
});