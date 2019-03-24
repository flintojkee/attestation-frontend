import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApplicationType} from '@atestattion/shared/models/application';

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

  constructor() { }
  teacherPersonnelNumber: number;

  ngOnInit() {
    debugger
    switch (this.type) {
      case ApplicationType.deferment:
        this.reason = this.application.deferment_application_reason;
        this.dateString = this.application.deferment_application_date;
        this.referrals = 'До пунктів 3.1 та 3.15';
        this.name = 'Заява про відтермінування чергової атестації';
        break;
      case ApplicationType.extra:
        this.reason = this.application.extra_application_reason;
        this.dateString = this.application.extra_application_date;
        this.referrals = 'До пунктів 1.8 та 3.1';
        this.name = 'Заява про позачергову атестацію';
        return ;
    }
  }

  ngOnDestroy() {
    this.alive = false;
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

