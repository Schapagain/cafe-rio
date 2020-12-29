const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HabitSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = Habit = mongoose.model('habits',HabitSchema);