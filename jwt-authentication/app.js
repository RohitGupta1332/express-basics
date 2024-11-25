import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./models/user.js";
import bcrypt from "bcrypt";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.post("/create", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let createdUser = User.create({
            username,
            email,
            password: hash
        });

        let token = jwt.sign({ email: email }, "shhhh");

        res.cookie("token", token);

        res.status(200).send("User added successfully");
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "shhhh");

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/logout", (req, res) => {
    res.cookie("token", "");
     res.status(200).json({ message: "Logged out successfully" });
})


app.listen(3000);
