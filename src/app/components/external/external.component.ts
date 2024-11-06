import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { loadScript } from 'src/app/shared/functions/project-loader';

@Component({
  selector: 'app-external',
  standalone: true,
  imports: [],
  template: `
    @if(!!isProjectBLoaded){
      <div style="width:90% !important;height:90% !important">
        <mass-home-element></mass-home-element>
      </div>
    }
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated // or ShadowDom

})
export class ExternalComponent {
  isProjectBLoaded = false;

  ngOnInit(): void {

     this.loadProjectB();
  }

  loadScript(url: string, type: 'script' | 'module' | 'stylesheet') {
    return new Promise<void>((resolve, reject) => {
        let element: HTMLScriptElement | HTMLLinkElement;

        if (type === 'stylesheet') {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = url;
            element.onload = () => resolve();
            element.onerror = () => reject(`Failed to load stylesheet: ${url}`);
            document.head.appendChild(element);
        } else {
            element = document.createElement('script');
            element.src = url;
            element.type = type === 'module' ? 'module' : 'text/javascript';
            element.onload = () => resolve();
            element.onerror = () => reject(`Failed to load script: ${url}`);
            document.body.appendChild(element);
        }
    });
}

  async loadProjectB() {
    try {
      await this.loadScript(`${environment.externalModuleFilePath}`+'styles-7SDZ5Z4Z.css', 'stylesheet');
      await this.loadScript(`${environment.externalModuleFilePath}`+'main-J4IC3F5Z.js', 'module');
      await this.loadScript(`${environment.externalModuleFilePath}`+'polyfills-XD2QEJ3Z.js', 'module');
      this.isProjectBLoaded = true;
    } catch (error) {
      console.warn(error)
      console.warn("Failed to load Project B.");
    }
  }
}
