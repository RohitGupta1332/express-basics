import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});

export const Post = mongoose.model("post", postSchema); 