const mongoosee = require('mongoose');
const Schema = mongoosee.Schema;

voteOutingSchema = new Schema({
    points: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

//Create collection and add schema
const vote = mongoosee.model('voteOuting', voteOutingSchema);
module.exports = vote;