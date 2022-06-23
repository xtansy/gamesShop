const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./src/db.json");
const middlewares = jsonServer.defaults({
    static: "./build",
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

if (process.env.NODE_ENV === "production") {
    server.use(express.static("build"));
    server.get("/", (req, res) => {
        req.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server is running");
});
