import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "../shared/interceptor/jwt-interceptor";
import { ErrorInterceptor } from "../shared/interceptor/error-interceptor";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ], 
})
export class AdminModule { }
