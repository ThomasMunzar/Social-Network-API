const User = require('../../models/User');

const router = require('express').Router();


// * `GET` all users

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err)
    }
};

router.get('/', getUsers);

// Get Single User
const getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }

};
router.get('/:userId', getUser);


const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
};

router.post('/', createUser);

const updateUser = async (req, res) => {
    try {
        const dbUserData = await User.updateOne({ _id: req.params.userId }, req.body, { new: true });
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
};
router.put('/:userId', updateUser);


const deleteUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId })
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
};
router.delete('/:userId', deleteUser);

//to add friend

const addFriend = async (req, res) => {
    try {
       const dbUserData = await User.findByIdAndUpdate(req.params.userId,{$addToSet:{friends:req.params.friendId}}, {new: true});
       res.json(dbUserData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.post('/:userId/friends/:friendId', addFriend);

const deleteFriend = async (req, res) => {
    try {
       const dbUserData = await User.findByIdAndUpdate(req.params.userId,{$pull:{friends:req.params.friendId}}, {new: true});
       res.json(dbUserData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.delete('/:userId/friends/:friendId', deleteFriend);


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