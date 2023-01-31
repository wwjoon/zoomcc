import http from "http";
import SocketIO from "socket.io";
import express from "express";

/*
- Socket is Framework
socket IO는 websocket 모듈에 비해 더 많은 기능을 간단하게 제공한다.
websocket으로 연결되지 않으면 재연결을 시도하거나 다른 것을 이용해서 연결을 시도한다.
 */

const port = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${port}`);

// http server 위에 websocket server를 만들기 위함, 동일한 포트에서 2가지 처리
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (message) => {
    console.log(message);
  });
});

httpServer.listen(3000, handleListen);
