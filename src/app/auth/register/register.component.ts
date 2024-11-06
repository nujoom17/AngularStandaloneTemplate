import { Component, effect, inject } from '@angular/core';
import { RegisterFormComponent } from './ui/register-form.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  template: ` <div class="container"></div> `,
  imports: [RegisterFormComponent],
})
export default class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!!this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
