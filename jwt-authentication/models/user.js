import mongoose, {Schema} from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/authentication");

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
    }
);

export const User = mongoose.model("user", userSchema);