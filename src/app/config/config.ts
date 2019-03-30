import { environment } from '../../environments/environment';

const authBase = environment.apiUrl;

export let URL_CONFIG = {
  loginUrl: authBase + '/login',
  teacherUrl: authBase + '/teacher',
  teacherProfileUrl: authBase + '/profile',
  teachersUrl: authBase + '/teachers',
  subjectUrl: authBase + '/subject',
  applicationUrl: authBase + '/application',
  analyticsUrl: authBase + '/analytics',
  attestationUrl: authBase + '/attestation'
};
