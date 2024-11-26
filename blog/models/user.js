import mongoose , {Schema} from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/blog");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

export const User = mongoose.model("User", userSchema);