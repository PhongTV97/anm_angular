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
  @Output() actionSucc = new EventEmitter();

  constructor(public dialog: MatDialog, private ultilsService: UtilsService) { }

  ngOnInit() {
  }

  openDialogAddOrUpdate(item, action) {
    const dialogRef = this.dialog.open(AccountDialogComponent, { data: { item, action } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'update_ok') {
        this.actionSucc.emit('update_ok')
      }
    });
  }

  showDialogConfirm(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { id } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete_ok') {
        this.actionSucc.emit('delete_ok')
      }
    });
  }

  formatBalance(balance) {
    return this.ultilsService.convertNumber(balance);
  }

  changePageNumber(page) {
    this.changePage.emit(page)
  }

}
