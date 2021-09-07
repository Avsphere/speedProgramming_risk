const express = require('express') // known as (basically) a router, whose job is to help us handle requests
const app = express()
const port = 3001
const chat = require('./Connection');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening ${port}`)
})

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors())

app.get('/api/someRoute', async(req, res) => {
  console.log("HEREERERe")
  res.sendStatus(200)
})



chat(io);