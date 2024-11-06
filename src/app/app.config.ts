import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './shared/interceptors/general.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import crypto from 'crypto-js'

export const AUTH_TOKEN = new InjectionToken<string | null>('auth_token', {
  providedIn: 'root',
  factory: () => sessionStorage.getItem('auth_token')
});

export const USER_INJECTOR = new InjectionToken<string | null>('user_data', {
  providedIn: 'root',
  factory: () => {
    let data = sessionStorage.getItem('user_data')
    if(data && new RegExp("^U2FsdGVkX.*").test(data)){
      return crypto.AES.decrypt(
        data,
        "u3eR"
      ).toString(crypto.enc.Utf8);
    }
    return data
  }
});

export const USER_ENCRYPTED = new InjectionToken<string | null>('user_data_encrypt', {
  providedIn: 'root',
  factory: () => sessionStorage.getItem('user_data')
});


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(
    withInterceptors([errorInterceptor])
  )],
};
