import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit {
  imgUser = 'https://lh3.googleusercontent.com/proxy/0wiwXSXKx2gNiMY_TMLbpGsx1UaKz5cuf5wEcbwvsZ5ZpPH-FhlbYupJ-F8onNLZ7Sk5f33MxPeQSDhkf6n4j_9Jn37IRGWbymTeB3LWbQbLw9S_BUIVR6CPf63qcuDMfQQ';
  imgAdmin = 'https://thumbs.dreamstime.com/b/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg';
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
