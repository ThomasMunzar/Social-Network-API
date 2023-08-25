// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        //Defaulst value set to new Object
        default: Schema.Types.ObjectId
        //Thie default is essentially telling mongoose to use its own unique objectId's to organize the new reactions. we are not giving them unique ids.
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
 
});


const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now
        //??
    },

    username:
    {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    reaction: [reactionSchema]
});

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.
virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

//Turn our thoughtSchema into a model so users can interact with it (constructor function)
//We are creating a model named Thought based on the thoughtSchema, this model allows methods like find, create, findOneAndUpdate... ect
const Thought = model('thought', thoughtSchema)


module.exports = Thought;

// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.


//