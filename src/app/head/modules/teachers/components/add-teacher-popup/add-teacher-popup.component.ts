import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialogRef, MatSnackBar, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Category, Rank } from '@atestattion/shared/models/teacher';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subject } from '@atestattion/shared/models/subject';

@Component({
  selector: 'app-add-teacher-popup',
  templateUrl: './add-teacher-popup.component.html',
  styleUrls: ['./add-teacher-popup.component.sass']
})
export class AddTeacherPopupComponent implements OnInit {
  teacherForm: FormGroup;
  categoryOptions = Object.keys(Category).map(key => ({ value: key, option: Category[key] }));
  rankOptions = Object.keys(Rank).map(key => ({ value: key, option: Rank[key] }));

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSubjects: Observable<Subject[]>;
  subjects: Subject[] = [];
  allSubjects: Subject[];

  @ViewChild('subjectInput') subjectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private headService: HeadService,
    public dialogRef: MatDialogRef<AddTeacherPopupComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.initForm();
    this.headService.getAllSubjects().subscribe(data => {
      this.allSubjects = data;
      this.filteredSubjects = this.teacherForm.controls.subjects.valueChanges.pipe(
        startWith(null),
        map((subject: string | null) => subject ? this.filterSubjects(subject) : this.allSubjects.slice()));
    });
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
      accreditation_level: [, Validators.required],
      birth_date: ['', Validators.required],
      degree: [],
      educational_institution: ['', Validators.required],
      employment_history: [ Validators.required],
      experience: [ Validators.required],
      graduation_year: [ Validators.required],
      middle_name: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      next_attestation_date: [Validators.required],
      personnel_number: [ Validators.required],
      position: ['', Validators.required],
      previous_attestation_date: [ Validators.required],
      qualification_category: ['', Validators.required],
      rank: [''],
      specialty: ['', Validators.required],
      subjects: [''],
      avatar_url: ['']
  });
  }
  get f() { return this.teacherForm.controls; }

  save() {
    this.dialogRef.close();
    this.teacherForm.controls.subjects.setValue(this.subjects);
    this.headService.addTeacher(this.teacherForm.value);
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

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.teacherForm.controls.subjects.setValue(null);
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
    this.teacherForm.controls.subjects.setValue(null);
  }

  private filterSubjects(value: Subject | string): Subject[] {
    if (value instanceof Array) {
      return [];
    }
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.subject_name.toLowerCase();
    return this.allSubjects.filter(subject => subject.subject_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
