import mongoose from 'mongoose';
import '../models/event';
import * as User from './userUtils';

const Event = mongoose.model('Event');

export function checkEvent(data) {
    return Event
        .findOne({user_id: data})
            .then(event => Promise.resolve(event.events))
            .catch(err => Promise.reject("no connection to database"))
}

export function updateEvent(data) {
    return Event 
        .findOneAndUpdate({user_id: data.user_id}, {events: data.events})
}

export function createEventContainer(data) {
    return new Event({
        user_id: data.user_id,
        events: []
    }).save()
        .then(eventData => Promise.resolve('true'))
        .catch(err => Promise.reject("events not create"));
                
}