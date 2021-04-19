import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IEvent } from './shared';
@Component({
    selector: 'eventsthumbnail-root',
    template: `
    <div [routerLink]="['/events',event.id]" class='well hoverwell thumbnail'>
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date : {{event?.date | date:'shortDate'}}</div>
        <div [ngStyle]="getProperty()" [ngSwitch]="event?.time">
            Time : {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price : {{event?.price | currency:'USD'}}</div>
        <div *ngIf="event?.location">
            <span>Address : {{event?.location?.address}}</span>
            <span class="paddingLeft"></span>
            <span>{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">
            Online Url : {{event?.onlineUrl}}
        </div>
    </div>`,
styles: [`
    .paddingLeft{
        margin-left:10px;
    }
    .well div{
        color:#bbb;
    }
    .thumbnail{
        min-height: 210px;
    }
    .green{
        color:green !important;
    }
    .bold{
        font-weight:bold !important;
    }
    `
]
})
export class EventsThumbnailComponent{
    @Input() event: IEvent;
    getProperty(): any{
        if (this.event && this.event.time === '8:00 am') {
            return {color: '#003300', 'font-weight': 'bold'};
        }
        else {
            return {};
        }
    }
}
