const Thought = require('../../models/Thought');

const router = require('express').Router();
// **`/api/thoughts`**

//Get All Thoughts

const getThoughts = async(req,res) => {
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err)
    }
};
router.get('/', getThoughts);

//Get A Single Thought

const getThought = async (req, res) => {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }

};
router.get('/:thoughtId', getThought);


// Post New Thought

const createThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
};

router.post('/', createThought);


//Update Thought

const updateThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.updateOne({ _id: req.params.thoughtId }, req.body, { new: true });
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
};
router.put('/:thoughtId', updateThought);



//Delete Thought

const deleteThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
};
router.delete('/:thoughtId', deleteThought);



//Post a Reactiong to a Thought

const addReaction = async (req, res) => {
    try {
        console.log('thoughtId', req.params.thoughtId);
        console.log('Reaction Body:', req.body);
       const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,{$addToSet:{reactions:req.body}}, {new: true});
       res.json(dbThoughtData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.post('/:thoughtId/reactions/', addReaction);


// Delete a Reaction to a Thought

const deleteReaction = async (req, res) => {
    try {
       const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId,{$pull:{reactions:{_id: req.params.reactionId}}}, {new: true});
       res.json(dbThoughtData);
    } catch (err){
        res.status(500).json(err);
    }
};
router.post('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;

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