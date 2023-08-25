const User = require('../../models/User');

const router = require('express').Router();


// * `GET` all users

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err)
    }
};

router.get('/users', getUsers);

module.exports = router;



// * `GET` a single user by its `_id` and populated thought and friend data

// * `POST` a new user:

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// * `PUT` to update a user by its `_id`

// * `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.

// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list