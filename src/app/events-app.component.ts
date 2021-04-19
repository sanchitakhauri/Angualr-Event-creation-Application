import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { AuthService } from './user/auth.service';
@Component({
  selector: 'eventsapp-root',
  template: `
  <nav-root></nav-root>
  <router-outlet></router-outlet>
  `
})
export class EventsappComponent {

constructor(private auth: AuthService){}

ngOnInit(){
  this.auth.checkAuthenticationStatus();
}

}
