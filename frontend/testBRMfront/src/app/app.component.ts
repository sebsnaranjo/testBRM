import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testBRMfront';

  constructor() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('roles_id');
    });
  }
}
