import { ApplicationStatus } from './application';

export class DefermentApplication {
  deferment_application_number?: number;
  deferment_application_date: string;
  deferment_application_reason: any;
  deferment_application_status: ApplicationStatus;
  deferment_application_years: number;
  personnel_number?: number;
  teacher_position?: string;
  teacher_pib?: string;
  get referrals() {
    return 'До пунктів 3.1 та 3.15';
  }
  get name() {
    return 'Заява про відтермінування чергової атестації';
  }
}
