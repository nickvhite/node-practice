const initialState = {
    visible: false,
    dayStart: new Date(null, null, null, 8, 0, 0),
    dayEnd: new Date(null, null, null, 17, 0, 0),
    events: [
        {start: 0, duration: 15, title: "Exercise"},
        {start: 25, duration: 30, title: "Travel to work"},
        {start: 30, duration: 30, title: "Plan day"},
        {start: 60, duration: 15, title: "Review yesterday`s commits"},
        {start: 100, duration: 15, title: "Code review"},
        {start: 180, duration: 90, title: "Have lunch width John"},
        {start: 360, duration: 30, title: "Skype call"},
        {start: 370, duration: 45, title: "Follow up with designer"},
        {start: 405, duration: 30, title: "Push up branch"}
    ]
};

export default function calendar(state = initialState, action) {
    if ( action.type === 'SHOW_CALENDAR') {
        state.visible = action.payload;
        state = Object.assign({}, state);
        return state;
    }
    if (action.type === 'UPDATE_EVENT') {
        state.events[action.payload.id] = action.payload.event;
        state = Object.assign({}, state);
        return state;
    }
    if (action.type === 'REMOVE_EVENT') {
        delete state.events.splice(action.payload, 1);
        state = Object.assign({}, state);
        return state;
    }
    if (action.type === 'ADD_EVENT') {
        state.events.push(action.payload);
        state = Object.assign({}, state);
        return state;
    }
    return state;
}