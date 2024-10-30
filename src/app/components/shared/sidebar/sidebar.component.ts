import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl:'./sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed = signal(false)
  collapsedEvent = output<boolean>();

  toggleSidebar(){
    this.isCollapsed.set(!this.isCollapsed())
    this.collapsedEvent.emit(this.isCollapsed())
  }
}
