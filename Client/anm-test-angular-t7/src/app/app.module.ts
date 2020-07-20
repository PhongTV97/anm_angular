import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MyTableComponent } from './component/my-table/my-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDialogComponent } from './component/home/account-dialog/account-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarsComponent } from './component/navbars/navbars.component';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyTableComponent,
    AccountDialogComponent,
    DialogConfirmComponent,
    NavbarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastNotificationsModule,
    NgbModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountDialogComponent, DialogConfirmComponent]
})
export class AppModule { }
