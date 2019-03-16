import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher, Category, Rank } from '@atestattion/shared/models/teacher';
import { Observable } from 'rxjs';
import { Subject } from '@atestattion/shared/models/subject';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-teacher-popup',
  templateUrl: './edit-teacher-popup.component.html',
  styleUrls: ['./edit-teacher-popup.component.sass']
})
export class EditTeacherPopupComponent implements OnInit {

  constructor(
    private headService: HeadService,
    public dialogRef: MatDialogRef<EditTeacherPopupComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
    ) { }

  editTeacherForm: FormGroup;
  teacherData: Teacher;
  categoryOptions = Object.keys(Category).map(key => ({ value: key, option: Category[key] }));
  rankOptions = Object.keys(Rank).map(key => ({ value: key, option: Rank[key] }));
  @ViewChild('subjectInput') subjectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSubjects: Observable<Subject[]>;
  subjects: Subject[];
  allSubjects: Subject[];

  ngOnInit() {
    this.teacherData = this.data;
    this.initForm();
    this.subjects = this.teacherData.subjects;
    this.headService.getAllSubjects().subscribe(data => {
      this.allSubjects = data;
      this.filteredSubjects = this.editTeacherForm.controls.subjects.valueChanges.pipe(
        startWith(null),
        map((subject: string | null) => subject ? this.filterSubjects(subject) : this.allSubjects.slice()));
    });
  }

  get f() { return this.editTeacherForm.controls; }

  initForm() {
    const rank = Object.keys(Rank).find(key => Rank[key] === this.teacherData.rank);
    const category = Object.keys(Category).find(key => Category[key] === this.teacherData.qualification_category);
    this.editTeacherForm = this.formBuilder.group({
      accreditation_level: [this.teacherData.accreditation_level, Validators.required],
      birth_date: [this.teacherData.birth_date, Validators.required],
      degree: [this.teacherData.degree],
      educational_institution: [this.teacherData.educational_institution, Validators.required],
      employment_history: [this.teacherData.employment_history, Validators.required],
      experience: [this.teacherData.experience, Validators.required],
      graduation_year: [this.teacherData.graduation_year, Validators.required],
      middle_name: [this.teacherData.middle_name, Validators.required],
      name: [this.teacherData.name, Validators.required],
      surname: [this.teacherData.surname, Validators.required],
      next_attestation_date: [this.teacherData.next_attestation_date, Validators.required],
      personnel_number: [this.teacherData.personnel_number, Validators.required],
      position: [this.teacherData.position, Validators.required],
      previous_attestation_date: [this.teacherData.previous_attestation_date, Validators.required],
      qualification_category: [category, Validators.required],
      rank: [rank],
      subjects: [''],
      specialty: [this.teacherData.specialty, Validators.required],
      avatar_url: [this.teacherData.avatar_url]
  });
  }

  save() {
    this.dialogRef.close();
    this.editTeacherForm.controls.subjects.setValue(this.subjects);
    const oldTeacher: Teacher = {
      personnel_number: this.teacherData.personnel_number,
      name: this.teacherData.name,
      surname: this.teacherData.surname,
      rank: this.teacherData.rank,
      qualification_category: this.teacherData.qualification_category
    };
    this.editTeacherForm.controls.subjects.setValue(this.subjects);
    this.headService.editTeacher(this.editTeacherForm.value, oldTeacher);
  }
  close(): void {
    this.dialogRef.close();
  }

  addSubject(event: MatChipInputEvent): void {

    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      // if ((value || '').trim()) {
      //    if (this.allSubjects.indexOf(value) > -1) {
      //      this.subjects.push(value.trim());
      //     } else {
      //     value.trim();
      //   }
      // }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.editTeacherForm.controls.subjects.setValue(null);
    }
  }

  remove(value: Subject): void {
    const index = this.subjects.indexOf(value);

    if (index >= 0) {
      this.subjects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.subjects.indexOf(event.option.value) === -1) {
      this.subjects.push(event.option.value);
    }
    this.subjectInput.nativeElement.value = '';
    this.editTeacherForm.controls.subjects.setValue(null);
  }

  private filterSubjects(value: Subject | string): Subject[] {
    if (value instanceof Array) {
      return [];
    }
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.subject_name.toLowerCase();
    return this.allSubjects.filter(subject => subject.subject_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
