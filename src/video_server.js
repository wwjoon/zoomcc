import http from "http";
import { Server } from "socket.io";
import express from "express";

const port = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("video"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

const handleListen = () =>
  console.log(`🎥 Listening on http://localhost:${port}`);
httpServer.listen(port, handleListen);
