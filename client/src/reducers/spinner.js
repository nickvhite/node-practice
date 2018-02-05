const initialState = {
    visible: false
};

export default function spinner(state = initialState, action) {
    if ( action.type === 'SHOW_SPINNER') {
        state.visible = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    return state;
}