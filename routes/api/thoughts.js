const Thought = require('../../models/Thought');

const router = require('express').Router();
// **`/api/thoughts`**

//
const addReaction = async (req, res) => {
    try {
       const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,{$addToSet:{reactions:req.body}}, {new: true});
       res.json(dbThoughtData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.post('/:thoughtId/reactions/', addReaction);

const deleteReaction = async (req, res) => {
    try {
       const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,{$pull:{reactions:{_id: req.params.reactionId}}}, {new: true});
       res.json(dbThoughtData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.post('/:thoughtId/reactions/:reactionId', deleteReaction);

// * `GET` to get all thoughts

// * `GET` to get a single thought by its `_id`

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// * `PUT` to update a thought by its `_id`

// * `DELETE` to remove a thought by its `_id`

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value