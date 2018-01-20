const initialState = {};

export default function login(state = initialState, action) {
	if ( action.type === 'SHOW_BUTTONS') {
		state = Object.assign([], state = action.payload);
		return state;
	}
	return state;
}