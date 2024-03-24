import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(SOCKET_URL);
    this.socket.on('connect', () => console.log('Connected to server'));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Example method to emit events
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Method to listen for events
  on(event, func) {
    if (this.socket) {
      this.socket.on(event, func);
    }
  }
}

const socketService = new SocketService();
export default socketService;
