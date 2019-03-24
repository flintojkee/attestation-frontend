import { Component, OnInit, OnDestroy } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { ApplicationType, ApplicationStatus } from '@atestattion/shared/models/application';
import { ExtraApplication } from '@atestattion/shared/models/extra-application';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';
import { TeacherAttestationService } from '../../shared/teacher-attestation.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.sass']
})
export class ApplicationComponent implements OnInit, OnDestroy {
  application: any;
  applicationForm: FormGroup;
  alive: boolean;
  today = new Date();
  todayString: string;
  dateString: string;
  constructor(
    private teacherAttestaionService: TeacherAttestationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService
  ) { }
  teacherPersonnelNumber: number;

  ngOnInit() {
    this.teacherService.currentTeacher.subscribe(teacher => {
      this.teacherPersonnelNumber = teacher.personnel_number;
    });

    this.todayString = `${this.today.getDate()}.${this.today.getMonth() + 1}.${this.today.getFullYear()} р.`;
    this.dateString = `${this.today.getFullYear()}-0${this.today.getMonth() + 1}-${this.today.getDate()}`;
    this.alive = true;
    this.initForm();
    this.route.data
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { type: ApplicationType }) => {
        switch (data.type) {
          case ApplicationType.extra:
            this.application = new ExtraApplication();
            break;

          default:
            break;
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  saveApplication() {
    const extraApplication: ExtraApplication = {
      extra_application_date: this.dateString,
      extra_application_reason: this.applicationForm.controls.applicationText.value,
      extra_application_status: ApplicationStatus.IN_PROGRESS,
      personnel_number: this.teacherPersonnelNumber,
      referrals: '',
      name: ''
    };
    this.teacherAttestaionService.addExtraApplication(extraApplication);
  }

  initForm() {
    this.applicationForm = this.formBuilder.group({
      position: [''],
      fullName: [''],
      applicationText: [''],
  });
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
                  this.application.referrals,
                  'Типового положення',
                  this.application.name
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
                  this.applicationForm.controls.position.value,
                  this.applicationForm.controls.fullName.value
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
            text: [this.applicationForm.controls.applicationText.value],
            alignment: 'justify'
          }
        ],
        footer: {
          columns: [
              { width: 'auto', text: this.todayString, margin: [ 30, 0, 0, 0 ]  },
              { width: '*', text: '' },
              { width: 'auto', text: '________', margin: [ 0, 0, 30, 0 ] },
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
