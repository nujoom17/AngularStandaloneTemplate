import { Injectable, computed, inject, signal, ɵunwrapWritableSignal } from '@angular/core';
import { from, defer, of } from 'rxjs';

import { Credentials } from '../interfaces/credentials';
import { AUTH_TOKEN } from 'src/app/app.config';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

export type AuthUser = any | null | undefined;


export interface AuthState {
  user: any; // Replace 'any' with the specific user type if available
  status?: 'authenticated' | 'pending' | 'unauthenticated';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(AUTH_TOKEN); // Inject the token from sessionStorage
  
  private state = signal<AuthState>({
    user: undefined,
    status: this.auth ? 'authenticated' : 'unauthenticated'
  });

  // Computed signal to access the user state
  private authTokenSignal = signal(inject(AUTH_TOKEN));

  // Computed signal for the user state
  user = computed(() => {
    const token = this.authTokenSignal();
    return {
      user: token ? { token } : undefined,
      status: token ? 'authenticated' : 'unauthenticated'
    };
  });
  // Update the state based on the current auth token

  constructor() {
  
  }

  login(credentials: Credentials) {
    // Mocking the login API response
    return of(new Promise<void>((resolve) => {
      // Simulate API call
      sessionStorage.setItem('auth_token', 'mock_token'); // Example token
      this.authTokenSignal.set('mock_token'); // Update signal with new token
      resolve();
    }));
  }

  logout() {
    sessionStorage.clear();
    this.authTokenSignal.set(null); // Clear the auth token in signal
    this.state.update(() => ({ user: null, status: 'unauthenticated' }));
  }

  createAccount(credentials: Credentials) {
    // Mocking the account creation process
    return of(new Promise<void>((resolve) => {
      // Simulate registration API call
      resolve();
    }))
  }
}

