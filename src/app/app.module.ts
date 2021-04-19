import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
  EventsListComponent,
  EventsThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
 // EventRouteActivator,
  EventListResolverService,
  CreateSessionComponent,
  SessionListComponent ,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolverService
} from './events/index';
import {EventsappComponent} from './events-app.component';
import {NavComponent} from './nav/nav.component';
import {
  JQ_TOKEN,
  TOASTR_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index';
import {appRoutes} from './routes';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {Error404Component} from './errors/404.component';
import {UserModule} from './user/user.module';
import {AuthService} from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const toastr: Toastr = window['toastr'];
const jQuery: Toastr = window['$'];

@NgModule({
  declarations: [
    EventsappComponent,
    EventsListComponent,
    EventsThumbnailComponent,
    NavComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules}),
    UserModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jQuery},
    // EventRouteActivator,
    EventResolverService,
    EventListResolverService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    AuthService,
    VoterService
  ],
  bootstrap: [EventsappComponent]
})
export class AppModule {
 }
export function checkDirtyState(component: CreateEventComponent){
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
