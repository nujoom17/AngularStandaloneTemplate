import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { AuthService } from 'src/app/shared/data-access/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-form',
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="submit()"
       #form="ngForm"
    >
      <mat-form-field appearance="fill">
        <mat-label>username</mat-label>
        <input
          matNativeControl
          formControlName="userName"
          type="text"
          placeholder="User Name"
        />
        <mat-icon matPrefix>mail</mat-icon>
      @if( (loginForm.controls.userName.dirty || form.submitted) &&
        !loginForm.controls.userName.valid ){
        <mat-error>Please enter username</mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>password</mat-label>
        <input
          matNativeControl
          formControlName="password"
          type="password"
          placeholder="password"
        />
        <mat-icon matPrefix>lock</mat-icon>
        @if((loginForm.controls.password.dirty || form.submitted) &&
        !loginForm.controls.password.valid ){
        <mat-error>Please enter valid password</mat-error>
        }
      </mat-form-field>

      @if(authService.sessionData().status === 'pending'){
      <mat-spinner diameter="25"></mat-spinner> Authenticating credentials...
      }

      <button
        mat-raised-button
        color="accent"
        type="submit"
        [disabled]="authService.sessionData().status === 'pending'"
      >
        Login
      </button>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button {
        width: 100%;
      }

      mat-error {
        margin: 5px 0;
      }

      mat-spinner {
        margin: 1rem 0;
      }
    `,
  ],
})
export class LoginFormComponent {
  authService = inject(AuthService)

  @Output() login = new EventEmitter<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    userName: ['',Validators.required],
    password: ['',Validators.required],
  });

  submit(){
    if(this.loginForm.valid){
      this.login.emit(this.loginForm.getRawValue())
    }
  }
}
