import { Subject } from './subject';

export class Course {
  referral_number: number;
  proff_course_start_date: string;
  proff_course_end_date: string;
  sertificate: boolean;
  personnel_number: number;
  selective_courses: SelectiveCourse [];
  surname?: string;
  name?: string;
  middle_name?: string;
  subjects?: Subject[];
}

export class SelectiveCourse {
  date_of_course: string;
  date_of_course_id?: number;
}
