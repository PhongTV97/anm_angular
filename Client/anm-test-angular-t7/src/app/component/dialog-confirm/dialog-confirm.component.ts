import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ActionService } from 'src/app/service/action.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    private actionService: ActionService
  ) { }

  ngOnInit() {
  }

  closeDialogConfirm() {
    this.dialogRef.close();
  }

  removeItem() {
    this.actionService.remove(this.data.id).subscribe(res => {
      this.closeDialogConfirm();
    })
  }

}
