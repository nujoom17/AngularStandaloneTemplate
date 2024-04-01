import { Injectable, computed, inject, signal } from '@angular/core';
import { from, defer, of } from 'rxjs';

import { Credentials } from '../interfaces/credentials';
import { AUTH_TOKEN } from 'src/app/app.config';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

export type AuthUser = any | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH_TOKEN); // to check the injection status of session token in client-side storage

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  // selectors
  user = computed(() => this.state().user);

  private user$ = of(this.auth); // currently we only look into token injection status to validate the login status of user,
  //^^we may add additional conditions to the injection token value to amplify the security access properties

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user: any) => {
      return this.state.update((state) => ({
        ...state,
        user,
      }));
    });
  }

  login(credentials: Credentials) {
    return from(
      defer(
        //loginAPI()
        () => of(true)
      )
    );
  }

  logout() {
    localStorage.clear();
    this.state.update(() => ({ status: 'pending', user: null }));
  }

  createAccount(credentials: Credentials) {
    return from(
      defer(
        //registerAPI()
        () => of(true)
      )
    );
  }
}
