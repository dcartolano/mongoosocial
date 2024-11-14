import { Schema, Types, model, type Document } from 'mongoose';
import { dateFormat } from '../utils/dateFormatter.js';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Schema.Types.Date, // mongoose type, used instead of date since we're now returning a string
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Schema.Types.Date, // mongoose type, used instead of date since we're now returning a string
    username: string,
    reactions: Schema.Types.ObjectId[]
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
            max_length: 50,
        },
        createdAt: {
            type: Date,
            default: Date.now, // parens not needed?
            // get: 
            // Use a getter method to format the timestamp on query (?)
            get: (timeStamp: any) => dateFormat(timeStamp),
        },
    },
    {
        // timestamps: true,
        _id: false
    }
);

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        // Use a getter method to format the timestamp on query (?)
        get: (timeStamp: any) => {
            return dateFormat(timeStamp)
        }
        
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function (this: IThought) {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

export default Thought;
