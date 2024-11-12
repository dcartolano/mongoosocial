import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb'; // need this?
// import { User, Thought } from '../models/index.js'; // may not need thought
import { User } from '../models/index.js'; // may not need thought

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const usersObj = {
            users,
            // headCount: await headCount(),
        }

        res.json(usersObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /users/:userId
 * @param string userId
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                // grade: await grade(studentId)
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// need to adjust this to have this format (?):
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }
/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// NOT complete, need to finish
/**
 * PUT User /users/:userId
 * @param object userId
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No such user exists' });
        }

        res.json({ user });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * DELETE Student based on id /users/:userId
 * @param string userId
 * @returns string 
*/
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        // // not sure if this ish is gonna work yet
        // const thought = await User.findOneAndUpdate(
        //     { users: req.params.userId },
        //     { $pull: { users: req.params.userId } },
        //     { new: true }
        // );

        // if (!thought) {
        //     return res.status(404).json({
        //         message: 'User deleted, but no thoughts found',
        //     });
        // }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST new Friend to a user's friend list based on /users/:userId/friends/:friendId
 * @param string userId
 * @param object friendId
 * @returns object user 
*/
export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Friend from a user's friend list based on /users/:userId/friends/:friendId
 * @param string friendId
 * @param string userId
 * @returns object user 
*/
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
