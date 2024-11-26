import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const Post = mongoose.model("post", postSchema); 