import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        io.emit("message", data);
    });
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
server.address = import.meta.env.VITE_WS_URL;
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
