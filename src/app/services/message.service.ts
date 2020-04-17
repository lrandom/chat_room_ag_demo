import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public httpClient: HttpClient) {

  }

  feedMessage(lastTime) {
    return this.httpClient.get('http://192.168.1.232/chatroom_cms/rooms.php?lastTime=' + lastTime);
  }

  sendMessage(payload) {
    return this.httpClient.post('http://192.168.1.232/chatroom_cms/rooms.php', payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
