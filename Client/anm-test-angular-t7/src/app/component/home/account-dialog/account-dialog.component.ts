import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Account } from 'src/app/models/Accounts';
import { ActionService } from 'src/app/service/action.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  accountForm: FormGroup;
  action: string;
  account: Account;
  isView: boolean = false;
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private actionService: ActionService,
    private formBuilder: FormBuilder
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
    }
    this.initUserForm();
  }

  initUserForm() {
    this.accountForm = this.formBuilder.group({
      name: [this.account.name || '', Validators.required],
      email: [this.account.email || '', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
      address: [this.account.address || '', Validators.required],
      age: [this.account.age || '', [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER)]],
      balance: [this.account.balance || '', [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER)]],
      gender: [this.account.gender || '', Validators.required],
      account_number: [this.account.account_number || '', [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER), Validators.maxLength(13)]],
    });
  }

  get f() { return this.accountForm.controls; }

  checkSubmitted() {
    this.submitted = true;
    if (this.f.name.errors) {
      if (this.f.name.errors.required) {
        console.log('require name');
        return false;
      }
    }
    if (this.f.email.errors) {
      if (this.f.email.errors.required) {
        console.log('require email');
        return false;
      }
      if (this.f.email.errors.pattern) {
        console.log('pattern email');
        return false;
      }
    }
    if (this.f.address.errors) {
      if (this.f.address.errors.required) {
        console.log('address');
        return false;
      }
    }
    if (this.f.age.errors) {
      if (this.f.age.errors.required) {
        console.log('requie age');

        return false;
      }
      if (this.f.age.errors.pattern) {
        console.log('pattern age');
        return false;
      }
    }
    if (this.f.balance.errors) {
      if (this.f.balance.errors.required) {
        console.log('balance');
        return false;
      }
      if (this.f.balance.errors.pattern) {
        console.log('pattern');
        return false;
      }
    }

    if (this.f.account_number.errors) {
      if (this.f.account_number.errors.required) {
        console.log('require account_number');
        return false;
      }
      if (this.f.account_number.errors.pattern) {
        console.log('partter account_number');
        return false;
      }
    }
    return true;
  }

  getValueToForm() {
    return {
      name: this.accountForm.get('name').value,
      email: this.accountForm.get('email').value,
      address: this.accountForm.get('address').value,
      age: this.accountForm.get('age').value,
      gender: this.accountForm.get('gender').value,
      balance: this.accountForm.get('balance').value,
      account_number: this.accountForm.get('account_number').value,
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateAccount() {
    const checkValidate = this.checkSubmitted()
    console.log(this.accountForm);

    if (checkValidate) {
      this.actionService.update(this.account).subscribe(data => {
        console.log(data);
      })
    }
  }

  addAccount() {
    const checkValidate = this.checkSubmitted()
    console.log(this.f);

    if (checkValidate) {
      this.actionService.add(this.account).subscribe(data => {
        console.log(data);
      })
    }
  }

}
