import { Schema, Types, model, type Document } from 'mongoose';
// import { dateFormat } from '../utils/dateFormatter.js';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Schema.Types.Date,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Schema.Types.Date,
    username: string,
    // reactions: Schema.Types.ObjectId[]
    reactions: [typeof reactionSchema]
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
            type: Schema.Types.Date,
            default: Date.now,
            // get: (timeStamp: any) => dateFormat(timeStamp)
        },
    },
    {
        toJSON: {
            // getters: true,
        },
        id: false
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
        default: Date.now,
        // get: (timeStamp: any) => dateFormat(timeStamp)
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
            // getters: true,
            virtuals: true,
        },
        // timestamps: true,
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: IThought) {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

export default Thought;
