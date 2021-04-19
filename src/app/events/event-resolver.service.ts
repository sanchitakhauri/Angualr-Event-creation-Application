import {Injectable} from '@angular/core';
import {EventService} from './shared/event.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable()
export class EventResolverService implements Resolve<any>{

    constructor(private eventService: EventService){

    }

    resolve(route: ActivatedRouteSnapshot){
       return this.eventService.getEvent(route.params.id);
    }
}
