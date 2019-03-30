import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Subscription } from 'rxjs';
import { ApplicationType } from '@atestattion/shared/models/application';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-head-home',
  templateUrl: './head-home.component.html',
  styleUrls: ['./head-home.component.sass']
})
export class HeadHomeComponent implements OnInit, OnDestroy {

  toggleValue: string;
  extraApplicationsSubscription: Subscription;
  defermentApplicationsSubscription: Subscription;
  extraApplications$: Subscription;
  extraApplicationsInProgres = [];
  defermentApplications$: Subscription;
  defermentApplicationsInProgres = [];

  constructor(
    private headService: HeadService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.extraApplicationsSubscription = this.headService.getApplications(ApplicationType.extra).subscribe(
     applications => {
      this.headService.extraApplications.next(applications);
     }
    );
    this.extraApplications$ = this.headService.extraApplications.subscribe(applications => {
      this.extraApplicationsInProgres = applications.filter(obj => obj.extra_application_status === 'на розгляді');
    });

    this.defermentApplicationsSubscription = this.headService.getApplications(ApplicationType.deferment).subscribe(
      applications => {
        this.headService.defermentApplications.next(applications);
      }
     );
    this.defermentApplications$ = this.headService.defermentApplications.subscribe(applications => {
      this.defermentApplicationsInProgres = applications.filter(obj => obj.deferment_application_status === 'на розгляді');

    });
  }

  ngOnDestroy() {
    this.extraApplicationsSubscription.unsubscribe();
    this.extraApplications$.unsubscribe();
    this.defermentApplicationsSubscription.unsubscribe();
    this.defermentApplications$.unsubscribe();
  }

}
