var { Server } = require('ws');
var socket = new Server({ port: 5081 });

socket.on('connection', function(websocket) {
  websocket.on('message', function(message) {
    // console.log(message);
    var message = JSON.parse(message);
    if (message.type == 'name') {
      websocket.username = message.data;
      return;
    }

    console.log('Received', message);
    socket.clients.forEach(function e(client) {
      if (client != websocket) {
        client.send(JSON.stringify({
          name: websocket.username,
          data: message.data
        }));
      }
    });
  });

  // action to fire off if a connection is lost
  websocket.on('close', function(message) {
    // console.log(message);
    console.log('connection lost...');
  });

  // action to fire when user connects
  console.log('one user connected');
});
