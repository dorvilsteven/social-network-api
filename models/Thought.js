const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reaction = require('./Reaction');


const ThoughtSchema = new Schema({
    thoughtText:  {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 128
    },
    createdAt:  {
        type:  Date,
        default:  Date.now,
        get:  (createdAtVal) => dateFormat(createdAtVal)
    },
    username:  {
        type: String,
        require: true
    },
    reactions:  [Reaction]
},
{
    toJSON:  {
        virtuals:  true,
        getters:  true
    }
});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;