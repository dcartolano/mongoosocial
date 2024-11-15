import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();

    res.json({ message: `Showing all thoughts!`, thoughts });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * GET single Thought /thoughts/:thoughtId
 * @param string thoughtId
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne(
      { _id: req.params.thoughtId }
    );

    if (thought) {
      res.json({ message: `Thought found!`, thought });

    } else {
      res.status(404).json({ message: 'Thought not found' });
    }

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }
/**
* POST new Thought /thoughts
* @body object thought (thoughtText, username, userId)
* @returns a single Thought object & associated user
*/
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username, userId } = req.body;

  try {
    const newThought = await Thought.create({
      thoughtText,
      username
    });

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json({ message: `Thought created!`, newThought, user });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT Thought /thoughts/:thoughtId
 * @param string thoughtId
 * @body object thought (thoughtText)
 * @returns a single Thought object & associated user, if possible
*/
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );

    let user: {} | null = {};
    if (thought) {
      user = await User.findOne(
        { username: thought.username }
      );
    }

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json({ message: `Thought updated!`, thought, user });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
* DELETE Thought /thoughts/:thoughtId
* @param string thoughtsId
* @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.thoughtId }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought found with that ID :(' });
    }

    return res.json({ message: `Thought ${req.params.thoughtId} deleted` });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
 * POST new Reaction to a thought's reactions list /thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @body object reaction
 * @returns a single Thought object
*/
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    return res.json({ message: `Reaction added!`, thought });

  } catch (err) {
    return res.status(500).json(err);
  }
}

/**
* DELETE Reaction from a thought's reactions list /thoughts/:thoughtId/reactions/:reactionId
* @param string thoughtId
* @param string reactionId
* @returns object thought 
*/
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    return res.json({ message: `Reaction ${req.params.reactionId} removed!`, thought });

  } catch (err) {
    return res.status(500).json(err);
  }
}