import ModalWindow from '../components/modalWindow/modalWindow';
import { UserAction, UserData, UserStatus } from '../types/types';

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

  connect(): Promise<void> {
    return new Promise((resolve) => {
      this.socket = new WebSocket(this.baseUrl);
      this.socket.onopen = () => {
        // console.log('connection');
        if (this.modalWindow) {
          this.modalWindow.connect();
          this.modalWindow = null;
        }
        if (sessionStorage.getItem('funChatUserPassword')) {
          this.logInOutUser(UserAction.login);
        }
        resolve();
      };

      this.socket.onclose = () => {
        this.connect();
        //  console.log('disconnection');
        if (!this.modalWindow) {
          this.modalWindow = new ModalWindow().disconnect();
          document.body.prepend(this.modalWindow.getNode());
        }
      };
    });
  }

  send(message: UserData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify(message));
  }

  onMessage(callback: (message: UserData) => void) {
    if (this.socket)
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        callback(message);
      };
  }

  logInOutUser(action: UserAction) {
    const login = sessionStorage.getItem('funChatUser') || '';
    const password = sessionStorage.getItem('funChatUserPassword') || '';
    const request = {
      id: crypto.randomUUID(),
      type: action,
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    if (this.socket) this.send(request);
  }

  getAllUsers(userStatus: UserStatus) {
    const request = {
      id: crypto.randomUUID(),
      type: userStatus,
      payload: null,
    };
    if (this.socket) this.send(request);
  }
}

export const webSocket = new WebSocketUtil();
