import { Request, Response } from 'express';
import { User } from '../models/index.js';

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json({ message: `Showing all users!`, users });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * GET single User based on id /users/:userId
 * @param string userId
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne(
            { _id: req.params.userId }
        );

        if (user) {
            res.json({ message: `User Found!`, user });

        } else {
            res.status(404).json({ message: 'No user found with that ID :(' });
        }

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }
/**
 * POST new User /users
 * @body object user (username, email)
 * @returns a single User object
*/
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(
            req.body
        );

        res.json({ message: `User created!`, user });

    } catch (err) {
        res.status(500).json(err);
    }
}

// {
//     "username": "amiko2020"
// }
/**
 * PUT User /users/:userId
 * @param string userId
 * @body object user (username, email, etc.)
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID :(' });
        }

        res.json({ message: `User updated!`, user });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * DELETE User /users/:userId
 * @param string userId
 * @returns string 
*/
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete(
            { _id: req.params.userId }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID :(' });
        }

        return res.json({ message: `User ${req.params.userId} deleted!` });

    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * POST new Friend to a user's friend list /users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns object user 
*/
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json({ message: `Friend ${req.params.friendId} added!`, user });

    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Friend from a user's friend list /users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns object user 
*/
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json({ message: `Friend ${req.params.friendId} removed!`, user });

    } catch (err) {
        return res.status(500).json(err);
    }
}
