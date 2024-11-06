import { Injectable, computed, effect, inject, signal, ɵunwrapWritableSignal } from '@angular/core';
import { from, defer, of, fromEvent, BehaviorSubject, Observable } from 'rxjs';

import { Credentials } from '../interfaces/credentials';
import { AUTH_TOKEN, USER_INJECTOR } from 'src/app/app.config';
import crypto from "crypto-js";

export type AuthUser = any | null | undefined;


export interface AuthState {
  user: any; // Replace 'any' with the specific user type if available
  token: string | null,
  status?: 'authenticated' | 'pending' | 'unauthenticated';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenInjector = inject(AUTH_TOKEN); 
  private userInjector = inject(USER_INJECTOR); 

  private state = signal<AuthState>({
     user: this.userInjector,
     token: this.tokenInjector,
     status: this.tokenInjector && this.userInjector ? 'authenticated' : 'unauthenticated',
  });

  sessionData = this.state.asReadonly()

  user = computed(() => this.state().user);

  constructor(){
    effect(()=>{
      if (this.state().user) {
        let encrypted = crypto.AES.encrypt(
          JSON.stringify(this.state().user),
          "u3eR"
        ).toString();
        sessionStorage.setItem('user_data', encrypted);
      } else {
        sessionStorage.removeItem('user_data');
      }

      if (this.state().token) {
        sessionStorage.setItem('auth_token', this.state().token as string);
      } else {
        sessionStorage.removeItem('auth_token');
      }
    })
 
  }


  login(credentials: Credentials) {
    return new Observable((observer) => {
      setTimeout(async () => {
        let user_data = {name: 'John Doe'}
        let tokenVal = 'ey2bhQk.uquwuqwendqd'

        this.state.set({ user:user_data, token: tokenVal, status:'authenticated'});

        observer.next();
        observer.complete();
      }, 2000);
    });
  }

  logout() {
    this.state.set({user:null, token: null,status:'unauthenticated'}); // Clear the tokenInjector token in signal
    sessionStorage.clear()
    // this.state.update(() => ({ user: null, status: 'unauthenticated' }));
  }

  createAccount(credentials: Credentials) {
    // Mocking the account creation process
    return of(new Promise<void>((resolve) => {
      // Simulate registration API call
      resolve();
    }))
  }

}

