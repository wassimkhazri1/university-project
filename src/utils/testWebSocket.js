// src/utils/testWebSocket.js
export const testWebSocketConnection = () => {
  const socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => {
    // Test d'abonnement
    const subscribeMessage = JSON.stringify({
      destination: "/app/connect",
      body: JSON.stringify({ userId: "test" }),
    });
    socket.send(subscribeMessage);
  };

  return socket;
};
