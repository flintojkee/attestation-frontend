import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AttestationModule } from './head/modules/attestation/attestation.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { TeacherHomeModule } from './teacher-home/teacher-home.module';
import { TeacherProfileModule } from './teacher-home/modules/teacher-profile/teacher-profile.module';
import { TeacherAttestationModule } from './teacher-home/modules/teacher-attestation/teacher-attestation.module';
import { TeacherCoursesModule } from './teacher-home/modules/teacher-courses/teacher-courses.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    AttestationModule,
    TeacherHomeModule,
    TeacherProfileModule,
    TeacherAttestationModule,
    TeacherCoursesModule
  ],
  providers: [
    AppService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
