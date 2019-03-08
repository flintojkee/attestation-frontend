import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-teacher-popup',
  templateUrl: './add-teacher-popup.component.html',
  styleUrls: ['./add-teacher-popup.component.sass']
})
export class AddTeacherPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTeacherPopupComponent>, private formBuilder: FormBuilder) { }
  teacherForm: FormGroup;

  ngOnInit() {
    this.teacherForm = this.formBuilder.group({
      accreditation_level: [4, Validators.required],
      birth_date: ['', Validators.required],
      degree: [2, Validators.required],
      educational_institution: ['Naukma', Validators.required],
      employment_history: [101, Validators.required],
      experience: [5, Validators.required],
      graduation_year: [1999, Validators.required],
      middle_name: ['Tarasovych', Validators.required],
      name: ['Denys', Validators.required],
      surname: ['Vasylenko', Validators.required],
      next_attestation_date: [2020, Validators.required],
      personnel_number: [101, Validators.required],
      position: ['ukr', Validators.required],
      previous_attestation_date: [2015, Validators.required],
      qualification_category: ['SPEC1', Validators.required],
      rank: ['RANK1', Validators.required],
      specialty: ['kek', Validators.required],
  });
  }
  get f() { return this.teacherForm.controls; }

  save() {
    this.dialogRef.close(this.teacherForm.value);
  }
  close(): void {
    this.dialogRef.close();
  }

}
// accreditation_level: ['', Validators.required],
// birth_date: ['', Validators.required],
// degree: ['', Validators.required],
// educational_institution: ['', Validators.required],
// employment_history: ['', Validators.required],
// experience: ['', Validators.required],
// graduation_year: ['', Validators.required],
// middle_name: ['', Validators.required],
// name: ['', Validators.required],
// surname: ['', Validators.required],
// next_attestation_date: ['', Validators.required],
// personnel_number: ['', Validators.required],
// position: ['', Validators.required],
// previous_attestation_date: ['', Validators.required],
// qualification_category: ['', Validators.required],
// rank: ['', Validators.required],
// specialty: ['', Validators.required],