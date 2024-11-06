import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './shared/interceptors/general.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const AUTH_TOKEN = new InjectionToken<string | null>('auth_token', {
  providedIn: 'root',
  factory: () => sessionStorage.getItem('auth_token')
});


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(
    withInterceptors([errorInterceptor])
  )],
};
