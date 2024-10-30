import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/shared/data-access/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [   MatIconModule,
    MatToolbarModule,
  CommonModule],
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSidebarCollapsed = input<boolean>(false)
  authService = inject(AuthService)
  
  toggleSidebar(){

  }
}
