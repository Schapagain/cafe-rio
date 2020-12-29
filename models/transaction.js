const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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

module.exports = Transaction = mongoose.model('transactions',TransactionSchema);