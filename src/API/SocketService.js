import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";
const accessToken = localStorage.getItem("accessToken");

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    const username = "john_doe";
    this.socket = io(SOCKET_URL, {
      auth: {
        token: accessToken,
      },
      //this is only for testing 
      query: {
        username: username,
      },
    });
    this.socket.on("connect", () => console.log("Connected to server"));
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
