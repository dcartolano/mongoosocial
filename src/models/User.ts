// import { Schema, Types, model, type Document } from 'mongoose';
import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[]
    friends: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        max_length: 50, // not needed?
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Must match a valid email address (look into Mongoose's matching validation)
        max_length: 50, // not needed?
    },
    thoughts: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
    {
        toJSON: {
            getters: true, // not necessarily needed?
            virtuals: true, 
        },
        id: false,
    }
);

userSchema
  .virtual('friendCount')
  .get(function (this: IUser) {
    return this.friends.length;
  });

const User = model('User', userSchema);

export default User;
