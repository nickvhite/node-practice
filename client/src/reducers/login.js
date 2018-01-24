const initialState = {
    visible: false,
	login: {
	    value: '',
        className: ''
    },
	password: {
        value: '',
        className: ''
    },
	login_error: "",
    password_error: "",
    authorization_error: "authorization_not_error",
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

export default function login(state = initialState, action) {
    if ( action.type === 'SHOW_LOGIN') {
        state.visible = action.payload;
        state = Object.assign({}, state);
        return state;
    }
	if ( action.type === 'CHANGE_LOGIN') {
	    if(action.payload.length === 0) {
	        state.login.className = ''
        } else {
            state.login.className = 'inputed'
        }
        state.login.value = action.payload;
        state = Object.assign({}, state);
		return state;
	}
    if ( action.type === 'CHANGE_PASSWORD') {
        if(action.payload.length === 0) {
            state.password.className = ''
        } else {
            state.password.className = 'inputed'
        }
        state.password.value = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'LOGIN_ERROR') {
        state.login_error = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'PASSWORD_ERROR') {
        state.password_error = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'AUTHORIZATION_ERROR') {
        state.authorization_error = action.payload;
        state = Object.assign({}, state);
        return state;
    }
	return state;
}