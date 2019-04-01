import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddAttestationPopupComponent } from '../components/add-attestation-popup/add-attestation-popup.component';
import { AnalyticsService } from '../../analytics/shared/analytics.service';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent implements OnInit {

  constructor(
    public popup: MatDialog
    ) { }

  ngOnInit() {
  }

  openAddTeacherPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;

    this.popup.open(AddAttestationPopupComponent, popupConfig);
  }
}
