import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HeadService } from '@atestattion/head/shared/head.service';

@Component({
  selector: 'app-add-teacher-popup',
  templateUrl: './add-teacher-popup.component.html',
  styleUrls: ['./add-teacher-popup.component.sass']
})
export class AddTeacherPopupComponent implements OnInit {

  constructor(
    private headService: HeadService,
    public dialogRef: MatDialogRef<AddTeacherPopupComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }
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
      qualification_category: ['SPEC_1', Validators.required],
      rank: ['RANK1'],
      specialty: ['kek', Validators.required],
  });
  }
  get f() { return this.teacherForm.controls; }

  save() {
    this.dialogRef.close();
    this.headService.addTeacher(this.teacherForm.value);
  }
  close(): void {
    this.dialogRef.close();
  }

}
