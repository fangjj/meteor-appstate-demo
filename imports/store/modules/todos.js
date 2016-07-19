import * as todoActions from '/imports/api/todos/methods';

export const name = 'todos';
export const types = {
	FILTER_ALL           : 'FILTER_ALL',
	FILTER_ACTIVE        : 'FILTER_ACTIVE',
	FILTER_COMPLETED     : 'FILTER_COMPLETED',
	ADD_TODO_REQUESTED   : 'ADD_TODO_REQUESTED',
	ADD_TODO_SUCCESSED   : 'ADD_TODO_SUCCESSED',
	ADD_TODO_FAILED      : 'ADD_TODO_FAILED',
	SET_FILTER           : 'SET_FILTER',
	LOAD_MORE            : 'LOAD_MORE',
	TOGGLE_TODO_REQUESTED: 'TOGGLE_TODO_REQUESTED',
	TOGGLE_TODO_SUCCESSED: 'TOGGLE_TODO_SUCCESSED',
	TOGGLE_TODO_FAILED   : 'TOGGLE_TODO_FAILED',
	REMOVE_TODO_REQUESTED: 'REMOVE_TODO_REQUESTED',
	REMOVE_TODO_SUCCESSED: 'REMOVE_TODO_SUCCESSED',
	REMOVE_TODO_FAILED   : 'REMOVE_TODO_FAILED',
	CLEAR_COMPLETED      : 'CLEAR_COMPLETED',
};

export const initialState = {
	pageSize: 10,
	limit: 10,
	filter: types.FILTER_ALL,
};

export const reducers = {
	[types.ADD_TODO_REQUESTED]: (state = initialState, action) => {
		return {
			...state,
			loading: true,
			error: null
		};
	},
	[types.ADD_TODO_SUCCESSED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: null
		};
	},
	[types.ADD_TODO_FAILED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: action.error
		};
	},
	[types.TOGGLE_TODO_REQUESTED]: (state = initialState, action) => {
		return {
			...state,
			todoId: action.todoId,
			loading: true,
			error: null
		};
	},
	[types.TOGGLE_TODO_SUCCESSED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: null
		};
	},
	[types.TOGGLE_TODO_FAILED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: action.error
		};
	},
	[types.REMOVE_TODO_REQUESTED]: (state = initialState, action) => {
		return {
			...state,
			todoId: action.todoId,
			loading: true,
			error: null
		};
	},
	[types.REMOVE_TODO_SUCCESSED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: null
		};
	},
	[types.REMOVE_TODO_FAILED]: (state = initialState, action) => {
		return {
			...state,
			loading: false,
			error: action.error
		};
	},
	[types.SET_FILTER]: (state = initialState, action) => {
		return {
			...state,
			filter: action.filter
		};
	},
	[types.LOAD_MORE]: (state = initialState, action) => {
		return {
			...state,
			limit: state.limit + state.pageSize
		};
	}
};

export const actions = {
	addToto(text) {
		return (dispatch) => {
			dispatch({type: types.ADD_TODO_REQUESTED});
			todoActions.create.call({ text }, e => {
				if(e) {
					dispatch({ type: types.ADD_TODO_FAILED, error: e.reason });
				} else {
					dispatch({ type: types.ADD_TODO_SUCCESSED });
				}
			});
		};
	},

	toggleTodo(_id) {
		return (dispatch) => {
			dispatch({type: types.TOGGLE_TODO_REQUESTED, todoId: _id});
			todoActions.toggle.call({ _id }, e => {
				if(e) {
					dispatch({ type: types.TOGGLE_TODO_FAILED, error: e.reason });
				} else {
					dispatch({ type: types.TOGGLE_TODO_SUCCESSED });
				}
			});
		}
	},

	removeTodo(_id) {
		return (dispatch) => {
			dispatch({type: types.REMOVE_TODO_REQUESTED, todoId: _id});
			todoActions.remove.call({ _id }, e => {
				if(e) {
					dispatch({ type: types.REMOVE_TODO_FAILED, error: e.reason });
				} else {
					dispatch({ type: types.REMOVE_TODO_SUCCESSED });
				}
			});
		}
	},

	clearCompleted() {
		return (dispatch) => {
			dispatch({type: types.CLEAR_COMPLETED});
			todoActions.clearCompleted.call({});
		}
	},


	setFilter(filter) {
		return (dispatch) => {
			dispatch({type: types.SET_FILTER, filter});
		}
	},

	loadMore() {
		return (dispatch) => {
			dispatch({type: types.LOAD_MORE});
		}
	},

};