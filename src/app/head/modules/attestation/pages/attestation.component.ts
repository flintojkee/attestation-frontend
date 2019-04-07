import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddAttestationPopupComponent } from '../components/add-attestation-popup/add-attestation-popup.component';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Observable, Subscription } from 'rxjs';
import { Attestation } from '@atestattion/shared/models/attestation';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.sass']
})
export class AttestationComponent implements OnInit, OnDestroy {

  constructor(
    public popup: MatDialog,
    private headService: HeadService
    ) { }
  attestations: Observable<Array<Attestation>>;
  deleteAttestation$: Subscription;
  displayedColumns: string[] = ['surname', 'name', 'date', 'category_conclusion', 'rank_conclusion', 'delete'];
  currentYear = new Date().getFullYear();
  yearFormControl = new FormControl(this.currentYear);
  ngOnInit() {
    this.attestations = this.headService.getAttestations();
    this.yearFormControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe( res => {
      this.attestations = this.headService.getAttestations(res);
    });
  }

  ngOnDestroy() {
    if (this.deleteAttestation$) {
      this.deleteAttestation$.unsubscribe();
    }
  }

  openAddTeacherPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;

    this.popup.open(AddAttestationPopupComponent, popupConfig);
  }

  deleteAttestation(id: number) {
    if (confirm('Ви впевнені, що бажаєте видалити атестацію?')) {
      this.deleteAttestation$ = this.headService.deleteAttestation(id).subscribe(res => {
        if (res.message === 'successfully deleted attestation' ) {
          this.attestations = this.headService.getAttestations();
        }
      });
    }
  }
}
