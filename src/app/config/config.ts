import { environment } from '../../environments/environment';

const authBase = environment.apiUrl;

export let URL_CONFIG = {
  loginUrl: authBase + '/login',
  teacherUrl: authBase + '/teacher'
};
