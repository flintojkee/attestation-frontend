import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CalendarView, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CalendarEvent, DAYS_OF_WEEK } from 'calendar-utils';
import { Subject, Observable, Subscription } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Course } from '@atestattion/shared/models/course';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  courses$: Observable<Array<Course>>;
  coursesSubscription: Subscription;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  excludeDays: number[] = [0, 6];

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  constructor(private headService: HeadService, private router: Router) {
  }

  ngOnInit() {
    this.courses$ = this.headService.getCourses();
    this.coursesSubscription = this.courses$.subscribe(data => {
      this.events.push(...this.getCourseEvents(data));
      this.events.push(...this.getSelectiveCourseEvents(data));
    });

  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  getCourseEvents(courses: Course[]) {
    return courses.map(course => ({
      start: this.getDate(course.proff_course_start_date),
      end: this.getDate(course.proff_course_end_date),
      title: `Фаховий курс № ${course.referral_number} ${course.surname} ${course.name} `,
      color: colors.red,
      allDay: true,
      personnel_number: course.personnel_number
    }));
  }
  getSelectiveCourseEvents(courses: Course[]) {
    const selectiveCourses = courses.map(course => {
      return course.selective_courses.map(selectiveCourse => {
        return {
          start: this.getDate(selectiveCourse.date_of_course),
          end: this.getDate(selectiveCourse.date_of_course),
          title: `Вибірковий курс № ${selectiveCourse.date_of_course_id} ${course.surname} ${course.name} `,
          color: colors.blue,
          allDay: true,
          personnel_number: course.personnel_number
        };
      });
    });
    return selectiveCourses.reduce((acc, val) => acc.concat(val), []);
}

  getDate(dateString: string) {
    const dateParts = dateString.split('-');
// tslint:disable-next-line: radix
    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  openTeacherProfile(event: any): void {
    this.router.navigateByUrl('head/teachers/' + event.personnel_number);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
