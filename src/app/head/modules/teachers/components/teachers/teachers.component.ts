import { Component, OnInit } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Teacher } from '@atestattion/head/shared/teacher';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTeacherPopupComponent } from '../add-teacher-popup/add-teacher-popup.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {

  constructor(private headService: HeadService, public popup: MatDialog) { }
  teachers: Array<Teacher>;
  isLoaded = true;

  ngOnInit() {
    this.headService.getAllTeachers().subscribe(data => {
      this.teachers = data;
      this.isLoaded = false;
    });
  }

  openPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;
    popupConfig.autoFocus = true;

    const popupRef = this.popup.open(AddTeacherPopupComponent, popupConfig);

    popupRef.afterClosed().subscribe(
        data => this.headService.addTeacher(data).subscribe(res => {
          console.log(res);
        })
    );
  }

}
