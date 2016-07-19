import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// Views
import RootApp from '/imports/ui/containers/RootApp';

FlowRouter.route('/', {
	name: 'home',
	action() {
		mount(RootApp);
	}
});