import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  enterRoom() {
    if (this.username == '') {
      alert('Vui long nhap nickname');
      return;
    }
    this.router.navigate(['/room', { username: this.username }]);
  }

}
