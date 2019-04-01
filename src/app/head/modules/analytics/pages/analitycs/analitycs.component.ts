import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';
import { Observable, of } from 'rxjs';
import { Teacher } from '@atestattion/shared/models/teacher';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.sass']
})
export class AnalitycsComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService) { }
  teachersAttestation: Observable<Array<Teacher>>;
  fileUrl: string;
  ngOnInit() {
    this.fileUrl = 'https://attestation-backend.herokuapp.com/api/analytics/plan/download'
    this.teachersAttestation = this.analyticsService.getTeachersCurrentYearAttestation();
  }
  downloadExcel() {
    this.analyticsService.downloadExcel().subscribe(data => {
      console.log(data);
      this.downloadFile(data);
    });
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
