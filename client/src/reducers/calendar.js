const initialState = {
    visible: false
};

export default function calendar(state = initialState, action) {
    if ( action.type === 'SHOW_CALENDAR') {
        state.visible = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    return state;
}