import { io } from 'socket.io-client';
function SocketService() {
  // connection request to server
  this.connectSocket = () => {
    try {
      this.socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
      console.log(`${process.env.REACT_APP_SOCKET_URL}`);
      this.socket.on('connect', (data) => {
        console.log('socket connected');
        return socket;
      });
    } catch (error) {
      console.log('socket is not connect', error);
    }
  };

  this.socketConnected = () => {
    try {
      return this.socket.connected;
    } catch (error) {
      console.log('socket is not connect', error);
    }
  };

  // disconnect request from server
  this.disConnectSocket = () => {
    try {
      this.socket.on('disconnect', (data) => {
        console.log('socket disconnected');
      });
    } catch (error) {
      console.log('socket is not disconnect', error);
    }
  };

  // send request to server with method name sent to function
  this.sendRequest = (method, data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(method, data, (response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  // send request without args to server with method name sent to function
  this.sendRequestWithoutArgs = (method) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(method, (response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };
}

const socket = new SocketService();

export { socket };
