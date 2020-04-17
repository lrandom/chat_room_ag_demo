import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../services/message.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  msgs: Array<any> = new Array<any>();
  content: string = '';
  username: string = '';
  lastTime: string = '';
  constructor(
    public activatedRouter: ActivatedRoute,
    public messageService: MessageService
  ) {
    this.activatedRouter.params.subscribe(params => {
      this.username = params.username;
    })
    this.messageService.feedMessage(this.lastTime).subscribe((data) => {
      console.log(data);
      this.msgs = this.msgs.concat(data);
      this.msgs.reverse();
      this.feedMessage();
    });
  }

  convertDate(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
    return formattedTime;
  }

  ngOnInit() {

  }

  feedMessage() {
    setInterval(() => {
      this.lastTime = this.msgs[this.msgs.length - 1].created_date;
      this.messageService.feedMessage(this.lastTime).subscribe((data: Array<any>) => {
        this.msgs = this.msgs.concat(data.reverse());
      })
    }, 2000)
  }

  send() {
    this.messageService.sendMessage({ content: this.content, username: this.username }).subscribe((data) => {

    });
  }

}
