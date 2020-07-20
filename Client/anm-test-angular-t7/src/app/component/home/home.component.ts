import { Component, OnInit } from '@angular/core';
import { ActionService } from './../../service/action.service';
import { Account } from 'src/app/models/Accounts';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { Search } from 'src/app/models/Search';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lstAccounts: Account[] = [];
  accCurrent: Account;
  objSearch: Search;
  fields: any[];
  page = 1;
  totals = 100;
  pageSize = 50;
  searchForm: FormGroup;
  submitted = false;
  query: any = {};

  constructor(private apiService: ActionService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.accCurrent = new Account();
    this.objSearch = new Search();
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
    this.getAccountFromServer();
    this.initUserForm();
  }

  getAccountFromServer() {
    this.apiService.getData(this.query).subscribe(res => {
      this.lstAccounts = res.lstAccounts;
      this.page = res.page;
      this.totals = res.total;
    })
  }

  initUserForm() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      gender: ['' || '', [Validators.pattern(Constant.PATTERN.NUMBER)]],
      age: ['', [Validators.pattern(Constant.PATTERN.NUMBER)]],
      balance: ['', [Validators.pattern(Constant.PATTERN.NUMBER)]],
      account_number: ['', [Validators.pattern(Constant.PATTERN.NUMBER), Validators.maxLength(13)]],
    });
  }

  get f() { return this.searchForm.controls; }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { action: 'add' } });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getAccountFromServer();
    // });
  }

  changePageNumber(page) {
    this.query.page = page
    this.getAccountFromServer();
  }

  checkSubmitted() {
    this.submitted = true;
    if (this.f.age.errors) {
      if (this.f.age.errors.required) {
        return false;
      }
      if (this.f.age.errors.pattern) {
        return false;
      }
    }
    if (this.f.balance.errors) {
      if (this.f.balance.errors.required) {
        return false;
      }
      if (this.f.balance.errors.pattern) {
        return false;
      }
    }
    if (this.f.account_number.errors) {
      if (this.f.account_number.errors.required) {
        return false;
      }
      if (this.f.account_number.errors.pattern) {
        return false;
      }
    }
    return true;
  }

  searchData() {
    const check = this.checkSubmitted();
    const obj = {
      name: this.searchForm.get('name').value,
      email: this.searchForm.get('email').value,
      address: this.searchForm.get('address').value,
      age: this.searchForm.get('age').value !== '' ? Number(this.searchForm.get('age').value) : '',
      gender: this.searchForm.get('gender').value !== '' ? Number(this.searchForm.get('gender').value) : '',
      balance: this.searchForm.get('balance').value !== '' ? Number(this.searchForm.get('balance').value) : '',
      account_number: this.searchForm.get('account_number').value,
    };
    if (check) {
      Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
      this.query = obj;
      this.getAccountFromServer();
    }
  }


  clearForm() {
    this.searchForm.get('name').setValue('');
    this.searchForm.get('email').setValue('');
    this.searchForm.get('address').setValue('');
    this.searchForm.get('age').setValue('');
    this.searchForm.get('gender').setValue('');
    this.searchForm.get('balance').setValue('');
    this.searchForm.get('account_number').setValue('');
  }

  reloadData(data) {
    console.log(data);
    if (data === 'delete_ok' || data === 'update_ok') {
      this.getAccountFromServer();
    }
  }
}
