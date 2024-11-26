import express from "express";
import { User } from "./models/user.js";
import { Post } from "./models/post.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });  // Ensure to await

        if (user) {
            return res.status(400).send("User already registered");  // Use return to prevent further execution
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let createdUser = await User.create({
            username,
            email,
            password: hash
        });

        let token = jwt.sign({ email: email, userId: createdUser._id }, "secretKey");

        res.cookie("token", token);

        res.status(201).send("User registered");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });  // Ensure to await

        if (!user) {
            return res.status(404).send("User not found");  // Use return to prevent further execution
        }

        let isMatch = await bcrypt.compare(password, user.password);  // Ensure to await
        if (!isMatch) {
            return res.status(401).send("Invalid password");  // Use return to prevent further execution
        }

        let token = jwt.sign({ email: email, userId: user._id }, "secretKey");

        res.cookie("token", token);

        res.status(200).send("logged in!");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/logout", (req, res) => {
    try {
        res.cookie("token", "");
        res.status(200).send("logged out!");
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get("/profile", isLoggedIn, async (req, res) => {
    try{
        let user = await User.findOne({email: req.user.email}).populate("posts");
        return res.status(200).send(user);
    }
    catch(error){
        return res.status(500).send(error);
    }
});

app.post("/post", isLoggedIn, async (req, res) => {
    try {
        let { title, content } = req.body;
        let createdPost = await Post.create({
            title,
            content,
            userId: req.user._id
        });

        let user = await User.findOne({ email: req.user.email });
        user.posts.push(createdPost._id);
        await user.save();
        res.status(200).send("Post created");
    }
    catch (error) {
        res.status(500).send(error);
    }
});

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") {
        return res.status(401).send("Unauthorised!");
    }
    try {
        let data = jwt.verify(req.cookies.token, "secretKey");
        req.user = data;
        next();
    }
    catch(error){
        return res.status(401).send("Unauthorosed");
    }
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
