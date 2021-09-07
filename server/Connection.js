const uuidv4 = require('uuid').v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    socket.on('ping', (value) => this.handleMessage(value));
    socket.on('testy', (value) => this.fakeMessages());
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  fakeMessages() {
      let arv = setInterval(() => {
          const fakePianoEvent = {
            deltaT : 300 - Math.random()*50,
            supposedDelay : 300,
        };

        console.log("emitting fake message", fakePianoEvent);


        this.socket.emit('update', fakePianoEvent)
      }, 400)

      setTimeout( () => clearInterval(arv), 15000)
  }
  
  sendMessage(message) {
      this.io.sockets.emit('message', message);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    // console.log("handling socket message of value:", value)
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now()
    };

    messages.add(message);
    this.sendMessage(message);

    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      messageExpirationTimeMS,
    );

    this.io.sockets.emit('pong', '');
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    console.log("Connection established")
    new Connection(io, socket);   
  });
};

module.exports = chat;