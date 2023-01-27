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

wss.on('connection', (socket) => {
    console.log('Connected to Client ✓');
    socket.on('close', () => console.log('Disconnected to Client ❌'));
    socket.on('message', (message) => {
        console.log('New message: ', message.toString('Utf8'));
    });
    socket.send('Hello from the Server !');
});

server.listen(3000, handleListen);