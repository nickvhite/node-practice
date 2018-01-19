import mongoose from 'mongoose';
import '../models/event';

const Event = mongoose.model('Event');

export function createEvent(data) {
    return new Event({
        username: data.username,
        password: data.password
    }).save()
        .then(userData => Promise.resolve("User created"))
        .catch(err => Promise.reject("User already exist"));
}

export function checkEvent(data) {
    return Event
        .findOne({username: data.username})
            .then(function(user){
                if ( user.password === data.password){
                    return Promise.resolve(user)
                } else {
                    return Promise.reject("Uncnown password")
                }
            })
            .catch(err => Promise.reject("Uncnown user"))
}

export function deleteEvent(data) {
    return Event
        .findOne({username: data.username})
            .then(function(user){
                user.remove();
                return Promise.resolve("User deleted");
            })
            .catch(err => Promise.reject("Uncnown user"));
}