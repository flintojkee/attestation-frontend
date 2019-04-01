import { Component, OnInit, OnDestroy } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { ApplicationType, ApplicationStatus } from '@atestattion/shared/models/application';
import { ExtraApplication } from '@atestattion/shared/models/extra-application';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';
import { TeacherAttestationService } from '../../shared/teacher-attestation.service';
import { DefermentApplication } from '@atestattion/shared/models/deferment-application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.sass']
})
export class ApplicationComponent implements OnInit, OnDestroy {
  application: any;
  type: string;
  applicationForm: FormGroup;
  submitted = false;
  alive: boolean;
  today = new Date();
  todayString: string;
  dateString: string;
  constructor(
    private teacherAttestaionService: TeacherAttestationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
  ) { }
  teacherPersonnelNumber: number;

  ngOnInit() {
    if (this.teacherService.currentTeacher) {
      this.teacherService.currentTeacher.subscribe(teacher => {
        this.teacherPersonnelNumber = teacher.personnel_number;
      });
    } else {
      this.teacherService.getTeacherProfile().subscribe(teacher => {
        this.teacherPersonnelNumber = teacher.personnel_number;
      });
    }

    this.todayString = `${this.today.getDate()}.${this.today.getMonth() + 1}.${this.today.getFullYear()} р.`;
    this.dateString = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;

    this.alive = true;
    this.initForm();
    this.route.data
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { type: ApplicationType }) => {
        switch (data.type) {
          case ApplicationType.extra:
            this.type = data.type;
            this.application = new ExtraApplication();
            break;
          case ApplicationType.deferment:
            this.type = data.type;
            this.application = new DefermentApplication();
            break;
          default:
            break;
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  isDeferment() {
    return this.type === ApplicationType.deferment;
  }
  saveApplication() {
    if (this.applicationForm.invalid) {
      return;
    }
    switch (this.type) {
      case ApplicationType.extra:
        const extraApplication: ExtraApplication = {
          extra_application_date: this.dateString,
          extra_application_reason: this.applicationForm.controls.applicationText.value,
          extra_application_status: ApplicationStatus.IN_PROGRESS,
          personnel_number: this.teacherPersonnelNumber,
          referrals: '',
          name: '',
          teacher_position: this.applicationForm.controls.position.value,
          teacher_pib: this.applicationForm.controls.fullName.value
        };
        this.teacherAttestaionService.addApplication(extraApplication, this.type);
        break;
      case ApplicationType.deferment:
        const defermentApplication: DefermentApplication = {
          deferment_application_date: this.dateString,
          deferment_application_reason: this.applicationForm.controls.applicationText.value,
          deferment_application_status: ApplicationStatus.IN_PROGRESS,
          personnel_number: this.teacherPersonnelNumber,
          deferment_application_years: this.applicationForm.controls.years.value,
          referrals: '',
          name: '',
          teacher_position: this.applicationForm.controls.position.value,
          teacher_pib: this.applicationForm.controls.fullName.value
        };
        this.teacherAttestaionService.addApplication(defermentApplication, this.type);
        break;
      default:
        break;
    }
    this.router.navigate(['/teacher/attestation']);

  }

  initForm() {
    this.applicationForm = this.formBuilder.group({
      position: ['', Validators.required],
      fullName: ['', Validators.required],
      applicationText: ['', Validators.required],
      years: [1, Validators.required]
  });
  }
  savePdf() {
    if (this.applicationForm.invalid) {
      return;
    }
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
              { width: 'auto', text: this.todayString, margin: [ 60, 0, 0, 100 ]  },
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
