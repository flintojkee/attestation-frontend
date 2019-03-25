import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeadService } from '@atestattion/head/shared/head.service';

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


  constructor(private headService: HeadService) { }

  ngOnInit() {
    this.extraApplications$ = this.headService.extraApplications.subscribe(applications => {
      this.extraApplications = applications.filter(obj => obj.extra_application_status !== 'in progress');
      this.extraApplicationsInProgres = applications.filter(obj => obj.extra_application_status === 'in progress');
    });
    this.defermentApplications$ = this.headService.defermentApplications.subscribe(applications => {
      this.defermentApplicationsInProgres = applications.filter(obj => obj.deferment_application_status === 'in progress');
      this.defermentApplications = applications.filter(obj => obj.deferment_application_status !== 'in progress');
    });
  }
  ngOnDestroy() {
    this.defermentApplications$.unsubscribe();
    this.extraApplications$.unsubscribe();
  }

  getIcon(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'assignment_turned_in';
      case 'rejected':
        return 'assignment_late';
      case 'in progress':
        return 'assignment';
      default:
        break;
    }
  }
  getColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'rejected':
        return 'red';
      case 'in progress':
        return 'gray';
      default:
        break;
    }
  }
}
