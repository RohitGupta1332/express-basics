const express = require('express');
const path = require('path');
const userModel = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get("/read", async (req, res) => {
    try {
        let users = await userModel.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/create", async (req, res) => {
    try {
        let createdUser = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        })
        res.send(createdUser)
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        let deleteUser = await userModel.findByIdAndDelete(userId);

        if (deleteUser) {
            res.json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        res.status(500).send(error.message);
    }
})
app.listen(3000);