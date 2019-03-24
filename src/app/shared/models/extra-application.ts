import { ApplicationStatus } from './application';

export class ExtraApplication {
  extra_application_number?: number;
  extra_application_date: string;
  extra_application_reason: any;
  extra_application_status: ApplicationStatus;
  personnel_number?: number;
  teacher_position?: string;
  teacher_pib?: string;
  get referrals() {
    return 'До пунктів 1.8 та 3.1';
  }
  get name() {
    return 'Заява про позачергову атестацію';
  }
}
