import mongoose from 'mongoose';
import '../models/user';
import bcrypt from 'bcrypt'

const User = mongoose.model('User');

export function createUser(data) {
    return new User({
        username: data.username,
        password: data.password
    }).save()
        .then(userData => Promise.resolve('true'))
        .catch(err => Promise.reject("User already exist"));
}

export function checkUser(data) {
    return User
        .findOne({username: data.username})
            .then(function(user){
                if ( user.password === data.password){
                    return Promise.resolve('true')
                } else {
                    return Promise.reject("Uncnown user1")
                }
            })
            .catch(err => Promise.reject("Uncnown user2"))
}