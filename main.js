// ********
// on --> to listen for events
// emit --> to send and starts events
// ********

const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const socketServer = createServer(app);
const io = new Server(socketServer);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("typing", (msg) => {
    socket.broadcast.emit("typing", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
socketServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
