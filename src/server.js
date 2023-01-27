import WebSocket from 'ws';
import http from 'http';
import express from 'express';

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));
  
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:${port}`);

// http server 위에 websocket server를 만들기 위함, 동일한 포트에서 2가지 처리
const server = http.createServer(app);
const wss = new WebSocket.Server({ server  });

// fake database
const sockets = [];

wss.on('connection', (socket) => {
    sockets.push(socket);
    socket['nickname'] = 'anonymous'; // default

    console.log('Connected to Client ✓');
    socket.on('close', () => console.log('Disconnected to Client ❌'));
    socket.on('message', (message) => {
        const { type, payload } = JSON.parse(message.toString('Utf8'));
        switch (type) {
            case 'new_message':
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${payload}`));
                break;
            case 'nickname':
                socket['nickname'] = payload;
                break;
        }
    });
});

server.listen(3000, handleListen);