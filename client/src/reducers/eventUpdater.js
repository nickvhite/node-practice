const initialState = {
    visible: false,
    updaterTop: 0,
    updaterLeft: 0
};

export default function eventUpdater(state = initialState, action) {
    if ( action.type === 'SHOW_EVENT_UPDATER') {
        state.visible = !state.visible;
        state.updaterTop = action.payload.top;
        state.updaterLeft = action.payload.left;
        state = Object.assign({}, state);
        return state;
    }
    return state;
}