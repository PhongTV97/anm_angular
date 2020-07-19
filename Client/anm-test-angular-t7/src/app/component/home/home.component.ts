import { Component, OnInit } from '@angular/core';
import { ActionService } from './../../service/action.service';
import { Account } from 'src/app/models/Accounts';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lstAccounts: Account[] = [];
  accCurrent: Account;
  fields: any[];
  page = 1;
  totals = 100;
  pageSize = 50;
  constructor(private apiService: ActionService, public dialog: MatDialog) {
    this.accCurrent = new Account()
    this.fields = [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Email',
        field: 'email'
      },
      {
        label: 'Address',
        field: 'address'
      },
      {
        label: 'Age',
        field: 'age'
      },
      {
        label: 'Gender',
        field: 'gender'
      },
      {
        label: 'Balance',
        field: 'balance'
      },
      {
        label: 'Account No',
        field: 'account_number'
      }
    ];
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('cur_user'));
    this.accCurrent = data.user;
    this.apiService.getData().subscribe(res => {
      this.lstAccounts = res.lstAccounts;
      this.page = res.page;
      this.totals = res.total;
    })
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { action: 'add' } });
  }

}
