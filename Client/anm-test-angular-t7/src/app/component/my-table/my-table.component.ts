import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from './../home/account-dialog/account-dialog.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @Input() data;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogAddOrUpdate(item, action) {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { item, action } });
  }

  showDialogConfirm(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { id } });
  }

}
