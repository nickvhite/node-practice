import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user_id: {
        type: String,
        require: true
    },
    events: {
        type: Array,
        require:true
    }
});

const Event = mongoose.model('Event', EventSchema);