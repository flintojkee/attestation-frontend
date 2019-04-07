import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddAttestationPopupComponent } from '../components/add-attestation-popup/add-attestation-popup.component';
import { AnalyticsService } from '../../analytics/shared/analytics.service';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Observable } from 'rxjs';
import { Attestation } from '@atestattion/shared/models/attestation';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent implements OnInit {

  constructor(
    public popup: MatDialog,
    private headService: HeadService
    ) { }
  attestations: Observable<Array<Attestation>>;
  displayedColumns: string[] = ['surname', 'name', 'date', 'category_conclusion', 'rank_conclusion', 'delete'];
  ngOnInit() {
    this.attestations = this.headService.getAttestations();
  }

  openAddTeacherPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;

    this.popup.open(AddAttestationPopupComponent, popupConfig);
  }

  deleteAttestation() {
    if (confirm('Ви впевнені, що бажаєте видалити атестацію?')) {
    }
  }
}
