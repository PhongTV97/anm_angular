import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from './../home/account-dialog/account-dialog.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { UtilsService } from './../../helper/utils.service';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @Input() rows: any;
  @Input() user: any;
  @Input() columns: any;
  @Input() totals: number;
  @Input() page: number;
  @Input() pageSize: number;
  @Output() changePage = new EventEmitter();

  constructor(public dialog: MatDialog, private ultilsService: UtilsService) { }

  ngOnInit() {
  }

  openDialogAddOrUpdate(item, action) {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { item, action } });
  }

  showDialogConfirm(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { id } });
  }

  formatBalance(balance) {
    return this.ultilsService.convertNumber(balance);
  }

  changePageNumber(page) {
    this.changePage.emit(page)
  }

}
