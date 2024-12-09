import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
})



io.on('connection', (socket) => {
    socket.on("chat-message", (msg) => {
        const messageData = {
            text: msg,
            senderId: socket.id
        };
        io.emit("chat-message", messageData)
    });
});

server.listen(3000, () => {
    console.log('listening on PORT:3000');
})