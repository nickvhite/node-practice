const initialState = {
	login: "",
	password: "",
	login_error: {
		className: "",
		content: ""
	},
    password_error: {
        className: "",
        content: ""
    }
};

export default function login(state = initialState, action) {
	if ( action.type === 'CHANGE_LOGIN') {
		state.login = action.payload;
		return state;
	}
    if ( action.type === 'CHANGE_PASSWORD') {
        state.password = action.payload;
        return state;
    }
    if ( action.type === 'LOGIN_ERROR') {
        state.login_error = action.payload;
        return state;
    }
    if ( action.type === 'PASSWORD_ERROR') {
        state.password_error = action.payload;
        return state;
    }
	return state;
}