const initialState = {
    visible: false,
    updaterVisible: false,
    updaterTop: 0,
    updaterLeft: 0,
    createrTop: 0,
    createrHeight: 0,
    currentEvent: {
        start: {},
        end: {},
        title: null
    }
};

export default function eventUpdater(state = initialState, action) {
    if ( action.type === 'SHOW_UPDATER') {
        state.visible = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'SHOW_EVENT_UPDATER') {
        state.updaterVisible = action.payload.visible;
        state.updaterTop = action.payload.top;
        state.updaterLeft = action.payload.left;
        state.currentEvent = action.payload.event;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'UPDATE_EVENT_CREATER') {
        state.createrTop = action.payload.top;
        state.createrHeight = action.payload.height;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'UPDATE_EVENT_TIMES') {
        state.currentEvent.start = action.payload.min;
        state.currentEvent.end = action.payload.max;
        state = Object.assign({}, state);
        return state;
    }
    if ( action.type === 'UPDATE_EVENT_TITLE') {
        state.currentEvent.title = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    return state;
}