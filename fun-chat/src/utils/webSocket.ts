import ModalWindow from '../components/modalWindow/modalWindow';
import { UserAuthenticationData } from '../types/types';

export class WebSocketUtil {
  baseUrl: string;

  socket: null | WebSocket;

  modalWindow: null | ModalWindow;

  constructor() {
    this.baseUrl = 'ws://127.0.0.1:4000';
    this.socket = null;
    this.modalWindow = null;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.baseUrl);

    this.socket.onopen = () => {
      console.log('connection');
      if (this.modalWindow) {
        this.modalWindow.connect();
        this.modalWindow = null;
      }
    };

    this.socket.onclose = () => {
      this.connect();
      console.log('disconnection');
      if (!this.modalWindow) {
        this.modalWindow = new ModalWindow().disconnect();
        document.body.prepend(this.modalWindow.getNode());
      }
    };
  }

  send(message: UserAuthenticationData) {
    if (this.socket) this.socket.send(JSON.stringify(message));
  }

  onMessage(callback: (message: UserAuthenticationData) => void) {
    if (this.socket)
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        callback(message);
      };
  }
}

export const webSocket = new WebSocketUtil();
