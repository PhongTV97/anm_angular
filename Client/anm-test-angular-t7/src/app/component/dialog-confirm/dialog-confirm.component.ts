import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ActionService } from 'src/app/service/action.service';
import { Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    private actionService: ActionService,
    private toaster: Toaster
  ) { }

  ngOnInit() {
  }

  showToast(data) {
    let types: Array<ToastType> = ['success', 'danger'];
    let type = types[0];
    let texts = data.message
    if (!data.result) {
      type = types[1];
    }
    this.toaster.open({
      text: texts,
      caption: type + ' notification',
      type: type
    });
  }

  closeDialogConfirm(status) {
    this.dialogRef.close(status);
  }

  removeItem() {
    this.actionService.remove(this.data.id).subscribe(res => {
      if (res.result) {
        this.closeDialogConfirm('delete_ok');
      }
      this.showToast(res);
    })
  }
}
