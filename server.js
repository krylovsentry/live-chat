const express = require('express');
const bodyParser = require("body-parser");
const http = require('http');
const ml = require('ml-sentiment')();
const app = express();
app.use(bodyParser.json());

const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 8080;

let lastThirtyWords = ["Funny"];

io.on('connection', (socket) => {
  console.debug('user connected');
  socket.on('new-message', (message) => {
    const sentimentLevel = ml.classify(message);
    io.emit('new-message', {
      message,
      sentimentLevel
    });

    if (lastThirtyWords.length >= 30) {
      lastThirtyWords[0] = message;
    } else {
      lastThirtyWords.push(message);
    }

    const chatSentimentLevel = ml.classify(lastThirtyWords.join(' '));
    io.emit('chat-sentiment', chatSentimentLevel);
  });
});

server.listen(port, () => {
  console.debug(`started on port: ${port}`);
});

let distDir = __dirname + "/dist/";
app.use(express.static(distDir));
