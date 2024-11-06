import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';
import { AUTH_TOKEN, USER_ENCRYPTED, USER_INJECTOR } from 'src/app/app.config';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);  
    const userDataEncrypted = inject(USER_ENCRYPTED)

    if (authService.sessionData().status=='authenticated' && new RegExp("^U2FsdGVkX.*").test(userDataEncrypted as string)) {
      return true;
    }

    return router.parseUrl('auth/login');
  };
};
