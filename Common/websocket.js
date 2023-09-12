// websocket.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 6969 });

const connectedClients = [];

wss.on('connection', (ws) => {
  connectedClients.push(ws);

  ws.on('message', (message) => {
    // Handle messages from clients, if needed
  });

  ws.on('close', () => {
    // Remove disconnected clients from the list
    const index = connectedClients.indexOf(ws);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
});

// Function to broadcast a message to all connected clients
function broadcastMessage(message) {
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = {
  broadcastMessage,
};
