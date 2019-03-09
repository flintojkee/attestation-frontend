import { Component, OnInit, Inject } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '@atestattion/head/shared/teacher';

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
    @Inject(MAT_DIALOG_DATA) public id
    ) { }

  editTeacherForm: FormGroup;
  teacherData: Teacher;
  oldTeacherData: Teacher;

  ngOnInit() {
    this.teacherData = this.headService.getLocalTeacherById(this.id);
    this.oldTeacherData = this.teacherData;
    this.editTeacherForm = this.formBuilder.group({
        accreditation_level: [this.teacherData.accreditation_level, Validators.required],
        birth_date: [this.teacherData.birth_date, Validators.required],
        degree: [this.teacherData.degree, Validators.required],
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
        qualification_category: [this.teacherData.qualification_category, Validators.required],
        rank: [this.teacherData.rank],
        specialty: [this.teacherData.specialty, Validators.required],
    });
  }
  get f() { return this.editTeacherForm.controls; }

  save() {
    this.dialogRef.close();
    this.headService.editTeacher(this.editTeacherForm.value, this.oldTeacherData);
  }
  close(): void {
    this.dialogRef.close();
  }
}
