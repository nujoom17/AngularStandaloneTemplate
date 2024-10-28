import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const AUTH_TOKEN = new InjectionToken('auth', {
  providedIn: 'root',
  factory: () => {
    return sessionStorage.getItem('auth_token') // we could add more conditions here either within the function or as separate injection token for better security
      ? sessionStorage.getItem('auth_token')
      : null;
  },
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};
