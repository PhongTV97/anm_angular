import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit {
  curUser: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.curUser = JSON.parse(localStorage.getItem('cur_user'));
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

}
