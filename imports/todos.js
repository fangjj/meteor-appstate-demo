export const name = "todos";
export const initialState = [];
export const actions = {
	addTodo(text) {
		return (dispatch, getState) => {
			dispatch({type: 'ADD_TODO', text});
		}
	}
};

export const reducers = {
	ADD_TODO: (state = initialState, action) => {
		return [
			...state,
			{text:  action.text}
		];
	}
};