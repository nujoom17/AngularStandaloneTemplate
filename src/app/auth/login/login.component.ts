import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginFormComponent } from './ui/login-form.component';
import { LoginService } from './data-access/login.service';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { RegisterService } from '../register/data-access/register.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import RegisterComponent from '../register/register.component';
import { RegisterFormComponent } from '../register/ui/register-form.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  providers: [LoginService, RegisterService],
  imports: [
    RouterModule,
    LoginFormComponent,
    MatProgressSpinnerModule,
    RegisterComponent,
    RegisterFormComponent,
  ],
  styleUrls: [`./login.component.scss`],
})
export default class LoginComponent implements AfterViewInit {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);
  public registerService = inject(RegisterService);
  public ngZone = inject(NgZone);
  public activatedRoute = inject(ActivatedRoute);

  isRegistration: boolean = true;
  constructor() {
    effect(() => {
      console.log(this.authService.user());
      if (this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }
  @ViewChild('signupBtn', { static: false }) signupBtn!: ElementRef;
  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  @ViewChild('formSection', { static: false }) formSection!: ElementRef;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((value) => {
      setTimeout(() => {
        if (value['q'] == 'new-user') {
          this.signupBtn?.nativeElement?.click();
        } else {
          this.loginBtn?.nativeElement?.click();
        }
      }, 400);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this.signupBtn?.nativeElement?.addEventListener('click', () => {
          this.ngZone.run(() => {
            this.router.navigate(['login'], {
              queryParams: { q: 'new-user' },
            });
          });
          this.slider.nativeElement.classList.add('moveslider');
          this.formSection.nativeElement.classList.add('form-section-move');
        });

        this.loginBtn?.nativeElement?.addEventListener('click', () => {
          this.ngZone.run(() => {
            this.router.navigate(['login'], {
              queryParams: { q: 'existing-user' },
            });
          });

          this.slider.nativeElement.classList.remove('moveslider');
          this.formSection.nativeElement.classList.remove('form-section-move');
        });
      });
    }, 100);
  }
}
