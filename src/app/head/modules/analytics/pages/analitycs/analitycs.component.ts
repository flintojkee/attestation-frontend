import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.scss']
})
export class AnalitycsComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }
  downloadExcel() {
    this.analyticsService.downloadExcel().subscribe(data => {
      this.downloadFile(data);
    });
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
