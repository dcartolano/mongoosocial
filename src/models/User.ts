// import { Schema, Types, model, type Document } from 'mongoose';
import { Schema, model, type Document } from 'mongoose';
// import Thought from './Thought';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[]
    // friends: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        max_length: 50, // is this trimmed?
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Must match a valid email address (look into Mongoose's matching validation)
        max_length: 50, // is this trimmed? if so, not needed here?
    },
    thoughts: 
    // [Thought], // mdoel or schema?
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'student',
        },
    ],
    // friends: [userSchema], //  how to self reference before defined??
    // how to add in a virtual? Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const User = model('User', userSchema);

export default User;
