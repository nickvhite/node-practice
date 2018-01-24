import { combineReducers } from 'redux';

import login from './login';
import spinner from './spinner';
import calendar from './calendar';

export default combineReducers({
	login,
	spinner,
	calendar
})