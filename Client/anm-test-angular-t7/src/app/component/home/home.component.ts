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
  constructor(private apiService: ActionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.apiService.getData().subscribe(res => {
      this.lstAccounts = res.lstAccounts;
    })
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { action: 'add' } });
  }

}
