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

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.of("/ws").on("connection", (socket) => {
    socket.on("message", (data) => {
        io.of("/ws").emit("message", data);
    });
    console.log(" WebSocket ulanishi o'rnatildi- true ");
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
