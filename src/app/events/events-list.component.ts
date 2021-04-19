import {Component} from '@angular/core';
import {EventService} from './shared/event.service';
import {ActivatedRoute} from '@angular/router';
import { IEvent } from './shared';

@Component({
    templateUrl: './events-list.component.html'
})
export class EventsListComponent{
  events: IEvent[];
  constructor(private eventService: EventService, private route: ActivatedRoute){
  }

  ngOnInit(){
    // this.eventService.getEventList().subscribe(events=>{
    //   this.events=events;
    // });
    this.events = this.route.snapshot.data.events;
  }

}
