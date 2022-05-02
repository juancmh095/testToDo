const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {type: String, required: true, default: 'NA'},
    create_at: {type: Date, required: false, default: new Date()},
    finish: {type: Date, required: false, default: null},
    note: {type: String, required: false, default: 'NA'},
    status: {type: Boolean, required: false, default: false},
    last_update: {type: Date, required: false, default: new Date()},
});


module.exports = mongoose.model('activity', schema, 'activity');