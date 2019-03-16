import { Subject } from './subject';

export class Teacher {
  accreditation_level?: string;
  birth_date?: Date;
  degree?: string;
  educational_institution?: string;
  employment_history?: number;
  experience?: number;
  graduation_year?: number;
  middle_name?: string;
  name: string;
  next_attestation_date?: number;
  personnel_number: number;
  position?: string;
  previous_attestation_date?: number;
  qualification_category?: Category;
  rank?: Rank;
  specialty?: string;
  surname: string;
  avatar_url?: string;
  subjects?: Subject[];
}

export enum Category {
  SPEC = 'спеціаліст',
  SPEC_1 = 'спеціаліст першої категорії',
  SPEC_2 = 'спеціаліст другої категорії',
  SPEC_HIGH = 'спеціаліст вищої категорії'
}

export enum Rank {
  RANK1 = 'учитель-методист',
  RANK2 = 'педагог-організатор-методист',
  RANK3 = 'практичний психолог-методист',
  RANK4 = 'керівник гуртка-методист',
  RANK5 = 'старший учитель',
}

export class TeacherFilters {
  qualification_category: Category;
  rank: Rank;
  subject_name: string;
}
