import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log(authService.user())
    if (authService.sessionData().status=='authenticated' && !!authService.user()) {
      return true;
    }

    return router.parseUrl('auth/login');
  };
};
