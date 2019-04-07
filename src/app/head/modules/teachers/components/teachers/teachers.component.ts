import { Component, OnInit } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Teacher, Category, Rank, TeacherFilters } from '@atestattion/shared/models/teacher';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTeacherPopupComponent } from '../add-teacher-popup/add-teacher-popup.component';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditTeacherPopupComponent } from '../edit-teacher-popup/edit-teacher-popup.component';
import { Subject } from '@atestattion/shared/models/subject';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {

  constructor(
    private headService: HeadService,
    public popup: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  teachers$: Observable<Array<Teacher>>;
  isLoaded = true;
  filtersForm: FormGroup;
  categoryOptions = Object.keys(Category).map(key => ({ value: key, option: Category[key] }));
  rankOptions = Object.keys(Rank).map(key => ({ value: key, option: Rank[key] }));
  subjectOptions$ = new Observable<Subject[]>();

  ngOnInit() {
    this.teachers$ = this.headService.teachersValue;
    this.subjectOptions$ = this.headService.getAllSubjects();
    this.createForm();
  }


  deleteTeacher(id: number) {
    if (confirm('Ви впевнені, що бажаєте видалити вчителя?')) {
      this.headService.removeTeacher(id);
    }
  }

  filterTeachers() {
    if (!this.filtersForm.pristine) {
      this.headService.filterTeachers(this.filtersForm.getRawValue() as TeacherFilters);
      this.filtersForm.markAsPristine();
    }
  }

  openAddTeacherPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;

    this.popup.open(AddTeacherPopupComponent, popupConfig);
  }

  openEditTeacherPopup(id: number): void {
    const popupConfig = new MatDialogConfig();
    popupConfig.disableClose = true;
    this.headService.getTeacherById(id).subscribe(data => {
      popupConfig.data = data;
      this.popup.open(EditTeacherPopupComponent, popupConfig);
    });
  }


  createForm() {
    this.filtersForm = this.formBuilder.group({
      qualification_category: [''],
      rank: [''],
      subject_name: ['']
    });
  }

  getTeacherSubjects(subjects: Subject[]) {
    return subjects.map(sub => sub.subject_name).join(', ');
  }

}
