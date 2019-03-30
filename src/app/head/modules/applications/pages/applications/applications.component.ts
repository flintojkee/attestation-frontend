import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeadService } from '@atestattion/head/shared/head.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.sass']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  extraApplications$: Subscription;
  extraApplicationsInProgres = [];
  defermentApplications$: Subscription;
  defermentApplicationsInProgres = [];
  extraApplications = [];
  defermentApplications = [];


  constructor(
    private headService: HeadService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.extraApplications$ = this.headService.extraApplications.subscribe(applications => {
      this.extraApplications = applications.filter(obj => obj.extra_application_status !== 'на розгляді');
      this.extraApplicationsInProgres = applications.filter(obj => obj.extra_application_status === 'на розгляді');
      this.spinner.hide();
    });
    this.defermentApplications$ = this.headService.defermentApplications.subscribe(applications => {
      this.defermentApplicationsInProgres = applications.filter(obj => obj.deferment_application_status === 'на розгляді');
      this.defermentApplications = applications.filter(obj => obj.deferment_application_status !== 'на розгляді');
    });
  }
  ngOnDestroy() {
    this.defermentApplications$.unsubscribe();
    this.extraApplications$.unsubscribe();
  }

  getIcon(status: string): string {
    switch (status) {
      case 'підтверджено':
        return 'assignment_turned_in';
      case 'відхилено':
        return 'assignment_late';
      case 'на розгляді':
        return 'assignment';
      default:
        break;
    }
  }
  getColor(status: string): string {
    switch (status) {
      case 'підтверджено':
        return 'green';
      case 'відхилено':
        return 'red';
      case 'на розгляді':
        return 'gray';
      default:
        break;
    }
  }
}
