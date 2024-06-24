import io from 'socket.io-client';
import {BASE_URL} from '../screens/app/Apimanager';

const SOCKET_URL = 'http://192.168.18.44:9000';
class wwService {
  sockets = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      console.log('check socket ', this.socket);

      this.socket.on('connect', data => {
        console.log('=== sockt connected ===');
      });
      this.socket.on('disconnect', data => {
        console.log('=== sockt disconnected ===',data);
      });
      this.socket.on('error', data => {
        console.log('=== sockt erro r===',data);
      });
    } catch (error) {
        console.log('===sockt not connected ===',error);

    }
  };
  on(event, data={}){
    this.socket.on(event,data)
  }
  emit(event, cb){
    console.log("event",event,cb);
    this.socket.emit(event,cb)
  }
  removeListener(listName){
    this.socket.removeListener(listName)
  }
}
const socketService = new wwService()
export default socketService
