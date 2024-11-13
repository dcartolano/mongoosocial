import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';
// import { Thought } from '../models/index.js';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

/**
 * GET Thought based on id /thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//   {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }
/**
* POST Thought /thoughts
* @param object username (userId?)
* @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username, userId } = req.body;
  try {
    const newThought = await Thought.create({
      thoughtText, username
    });
    await User.findByIdAndUpdate(
      userId, {$push: {thoughts: newThought._id}}
    )
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

/**
 * PUT Thought based on id /thoughts/:thoughtId
 * @param object thoughtId, username (userId?)
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought)
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

// do reactions also need to be deleted? or will it happen automatically?
/**
* DELETE Thought based on id /thoughts/:thoughtId
* @param string thoughtsId
* @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      res.status(404).json({
        message: 'No thought with that ID'
      });
    } 
    // not sure that I need this, or if it would even work
    // else {
    //   await Reaction.deleteMany({ _id: { $in: thought.reaction } });
    //   res.json({ message: 'Thought and reactions deleted!' });
    // }

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * POST new Reaction stored in a single thought's reactions array field based on /thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @param string reaction
 * @returns object thought 
*/
export const addReaction = async (req: Request, res: Response) => {
  console.log('You are adding a reaction');
  console.log(req.body);
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reaction: req.body } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}

/**
* DELETE (pull and remove) Reaction from a thought based on /thoughts/:thoughtId/reactions/:reactionId
* @param string reactionId
* @param string thoughtId
* @returns object thought 
*/
export const removeReaction = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}