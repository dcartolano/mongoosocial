import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
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
            default: () => new Date(),
            // Use a getter method to format the timestamp on query (?)
        },
    },
    {
        timestamps: true,
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
