import { createStore } from '/imports/store';

createStore().then(() => {
	require('./routes');
});