import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Teacher, Category, Rank } from '@atestattion/shared/models/teacher';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Attestation } from '@atestattion/shared/models/attestation';

@Component({
  selector: 'app-add-attestation-popup',
  templateUrl: './add-attestation-popup.component.html',
  styleUrls: ['./add-attestation-popup.component.sass']
})
export class AddAttestationPopupComponent implements OnInit, OnDestroy {
  attestationForm: FormGroup;
  teachers: Teacher[];
  personnelNumberSubscription: Subscription;
  filteredTeachers: Observable<Teacher[]>;
  previousRank = new FormControl('');
  previousCategory = new FormControl('');
  categoryOptions = Object.keys(Category).map(key => ({ value: key, option: Category[key] }));
  rankOptions = Object.keys(Rank).map(key => ({ value: key, option: Rank[key] }));
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAttestationPopupComponent>,
    private headService: HeadService
    ) { }

  ngOnInit() {
    this.initForm();
    this.headService.teachersValue.subscribe(teachers => {
      this.teachers = teachers;
      this.filteredTeachers = this.attestationForm.controls.personnel_number.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(surname => surname ? this._filter(surname) : this.teachers.slice())
      );
      this.personnelNumberSubscription = this.attestationForm.controls.personnel_number.valueChanges.subscribe(data => {
        data = +data;
        if (typeof data === 'number') {
          const index = this.teachers.findIndex(el => el.personnel_number === data);
          if (index > -1) {
            this.previousCategory.patchValue(teachers[index].qualification_category);
            this.previousRank.patchValue(teachers[index].rank);
          } else {
            this.previousCategory.patchValue('Вчителя не знайдено');
            this.previousRank.patchValue('Вчителя не знайдено');
          }
        }
      });
    });
  }
  ngOnDestroy() {
    this.personnelNumberSubscription.unsubscribe();
  }

  displayFn(teacher?: Teacher): string | undefined {
    return teacher ? `${teacher.surname} ${teacher.name}` : undefined;
  }

  private _filter(surname: string): Teacher[] {
    const filterValue = surname.toLowerCase();

    return this.teachers.filter(option => option.surname.toLowerCase().indexOf(filterValue) === 0);
  }

  setCatecoryRankValues(){

  }

  initForm() {
    this.attestationForm = this.formBuilder.group({
      attestation_date: ['', Validators.required],
      attestation_letter: ['', Validators.required],
      characteristic: ['', Validators.required],
      category_conclusion: ['', Validators.required],
      rank_conclusion: [''],
      on_category: ['', Validators.required],
      on_rank: [''],
      personnel_number: ['', Validators.required]
  });
  }

  save() {
    this.dialogRef.close();
    this.headService.saveAttestation(this.attestationForm.value as Attestation);
  }

  close(): void {
    this.dialogRef.close();
  }
}
