// src/utils/testWebSocket.js
export const testWebSocketConnection = () => {
  const socket = new WebSocket('ws://localhost:8080/ws');
  
  socket.onopen = () => {
    console.log('✅ WebSocket connecté avec succès');
    
    // Test d'abonnement
    const subscribeMessage = JSON.stringify({
      destination: '/app/connect',
      body: JSON.stringify({ userId: 'test' })
    });
    socket.send(subscribeMessage);
  };
  
  socket.onmessage = (event) => {
    console.log('📨 Message reçu:', event.data);
  };
  
  socket.onerror = (error) => {
    console.error('❌ Erreur WebSocket:', error);
  };
  
  socket.onclose = () => {
    console.log('🔌 WebSocket fermé');
  };
  
  return socket;
};