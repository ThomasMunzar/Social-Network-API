// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //Need to validate email with validator
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],

        friends: [{ type: Schema.Types.ObjectId, ref: 'friend' }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`
    });

// referencing friends will be similiar to ^ above

const User = model('user', userSchema)

module.exports = User;

// create the schema

// **User**:

// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.



// User Routes:
// 