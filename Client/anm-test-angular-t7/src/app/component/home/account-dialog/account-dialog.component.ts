import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Account } from 'src/app/models/Accounts';
import { ActionService } from 'src/app/service/action.service';


@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  public accountForm: FormGroup;
  public action: string;
  account: Account;
  isView: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private actionService: ActionService
  ) {
    this.account = new Account();
  }

  ngOnInit() {
    this.action = this.data.action
    console.log(this.action);
    if (this.action === 'edit' || this.action === 'view') {
      if (this.action === 'view') {
        this.isView = true
      }
      this.account = this.data.item;
      this.account = { ...this.account, gender: this.account.gender.toString() }
      console.log(this.account);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateAccount() {
    this.actionService.update(this.account).subscribe(data => {
      console.log(data);
    })
  }

  addAccount() {
    this.actionService.add(this.account).subscribe(data => {
      console.log(data);
    })
  }

}
