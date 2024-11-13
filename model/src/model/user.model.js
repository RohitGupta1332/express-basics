import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video" //taking refernce from video model
            }
        ]
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)