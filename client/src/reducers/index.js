import { combineReducers } from 'redux';

import login from './login';
import spinner from './spinner';

export default combineReducers({
	login,
	spinner
})