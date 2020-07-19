import { Component, OnInit } from '@angular/core';
import { ActionService } from './../../service/action.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  hasError = false;
  constructor(private apiService: ActionService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (!this.username) {
      this.hasError = true;
    } else if (!this.password) {
      this.hasError = true
    } else {
      this.apiService.login({ user_name: this.username, password: this.password }).subscribe(res => {
        if (res.result) {
          localStorage.setItem('cur_user', JSON.stringify(res));
          this.router.navigate(['home'])
        } else {
          this.hasError = true
        }
      }, err => console.log(err))
    }
  }

}
