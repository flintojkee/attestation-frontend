import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApplicationType, ApplicationStatus} from '@atestattion/shared/models/application';
import { HeadService } from '@atestattion/head/shared/head.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.sass']
})
export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() application: any;
  @Input() type: string;
  alive: boolean;
  dateString: string;
  reason: string;
  name: string;
  referrals: string;
  id: number;
  constructor(private headService: HeadService) { }
  teacherPersonnelNumber: number;
  inProgress: boolean;
  rejected: boolean;

  ngOnInit() {
    switch (this.type) {
      case ApplicationType.deferment:
        this.reason = this.application.deferment_application_reason;
        this.dateString = this.application.deferment_application_date;
        this.referrals = 'До пунктів 3.1 та 3.15';
        this.name = 'Заява про відтермінування чергової атестації';
        this.inProgress = this.application.deferment_application_status === 'на розгляді' ? true : false;
        this.rejected = this.application.deferment_application_status === 'відхилено' ? true : false;
        break;
      case ApplicationType.extra:
        this.reason = this.application.extra_application_reason;
        this.dateString = this.application.extra_application_date;
        this.referrals = 'До пунктів 1.8 та 3.1';
        this.name = 'Заява про позачергову атестацію';
        this.inProgress = this.application.deferment_application_status === 'на розгляді' ? true : false;
        this.rejected = this.application.deferment_application_status === 'відхилено' ? true : false;
        return ;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  rejectApplication() {
    switch (this.type) {
      case ApplicationType.deferment:
        this.application.deferment_application_status = ApplicationStatus.REJECTED;
        this.id = this.application.deferment_application_number;
        break;
      case ApplicationType.extra:
        this.application.extra_application_status = ApplicationStatus.REJECTED;
        this.id = this.application.extra_application_number;
        break ;
    }
    this.headService.updateApplication(this.type, this.id, this.application).subscribe(res => {
      let index = -1;
      if (res.status === 200) {
        switch (this.type) {
          case ApplicationType.deferment:
          index = this.headService.defermentApplications.value
                        .findIndex(el => el.deferment_application_number === this.application.deferment_application_number);
          if (index > -1) {
            this.headService.defermentApplications[index] = this.application;
            this.headService.defermentApplications.next(this.headService.defermentApplications.value);
          }
            break;
          case ApplicationType.extra:
          index = this.headService.extraApplications.value
                        .findIndex(el => el.extra_application_number === this.application.extra_application_number);
          if (index > -1) {
            this.headService.extraApplications[index] = this.application;
            this.headService.extraApplications.next(this.headService.extraApplications.value);
          }
            break ;
        }
      }
    });
  }

  confirmApplication() {
    switch (this.type) {
      case ApplicationType.deferment:
        this.application.deferment_application_status = ApplicationStatus.CONFIRMED;
        this.id = this.application.deferment_application_number;
        break;
      case ApplicationType.extra:
        this.application.extra_application_status = ApplicationStatus.CONFIRMED;
        this.id = this.application.extra_application_number;
        break ;
    }
    this.headService.updateApplication(this.type, this.id, this.application).subscribe(res => {
      let index = -1;
      if (res.status === 200) {
        switch (this.type) {
          case ApplicationType.deferment:
          index = this.headService.defermentApplications.value
                        .findIndex(el => el.deferment_application_number === this.application.deferment_application_number);
          if (index > -1) {
            this.headService.defermentApplications[index] = this.application;
            this.headService.defermentApplications.next(this.headService.defermentApplications.value);
          }
            break;
          case ApplicationType.extra:
          index = this.headService.extraApplications.value
                        .findIndex(el => el.extra_application_number === this.application.extra_application_number);
          if (index > -1) {
            this.headService.extraApplications[index] = this.application;
            this.headService.extraApplications.next(this.headService.extraApplications.value);
          }
            break ;
        }
      }
    });
  }

  isDeferment() {
    return this.type === ApplicationType.deferment;
  }

  savePdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const extraApplicationPdf = {
        content: [
          {
            columns: [
              {
                type: 'none',
                ul: [
                  this.referrals,
                  'Типового положення',
                  this.name
                ]
              }
            ]
          },
          {
            columns: [
              {
                type: 'none',
                ul: [
                  'Голові атестаційної комісії Київської',
                  'спеціалізованої школи №173',
                  'І-ІІІ ступенів',
                  'Мазаєвій Л. А.'
                ],
                margin: [250, 0, 0, 20]
              }
            ]
          },
          {
            columns: [
              {
                type: 'none',
                ul: [
                  this.application.teacher_position,
                  this.application.teacher_pib
                ],
                margin: [250, 0, 0, 0]
              }
            ]
          },
          {
            columns: [
                { width: '*', text: '' },
                {
                    margin: [0, 70, 0, 20],
                    width: 'auto',
                    text: 'Заява'
                },
                { width: '*', text: '' },
            ]
          },
          {
            text: [this.reason],
            alignment: 'justify'
          }
        ],
        footer: {
          columns: [
              { width: 'auto', text: this.dateString, margin: [ 60, 0, 0, 100 ]  },
              { width: '*', text: '' },
              { width: 'auto', text: '________', margin: [ 0, 0, 60, 100 ] },
          ]
        },
        styles: {
          header: {
            fontSize: 14
          }
        }
      };
    // pdfMake.createPdf(dd).download();
    pdfMake.createPdf(extraApplicationPdf).open();
  }
}

