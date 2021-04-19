import {Component, Input, OnChanges} from '@angular/core';
import {ISession} from '../shared/index';
import {AuthService} from '../../user/auth.service';
import {VoterService} from './voter.service';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges{

    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSession: ISession[] = [];

    constructor(public auth: AuthService, private voterService: VoterService){

    }

    ngOnChanges(){
        if (this.sessions){
            this.filterSession(this.filterBy);
            this.sortBy === 'name' ? this.visibleSession.sort(sortByNameAsc) :
             this.visibleSession.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession){
        if (this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        } else{
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if (this.sortBy == 'voted'){
            this.visibleSession.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session,
            this.auth.currentUser.userName);
    }

    filterSession(filter){
        if (filter === 'all'){
            this.visibleSession = this.sessions.slice(0);
        } else {
            this.visibleSession = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            });
        }
    }
}


function sortByNameAsc(s1: ISession, s2: ISession) {
    const newLocal = 0;
    if (s1.name > s2.name) { return 1; }
    else if (s1.name === s2.name) { return newLocal; }
    else { return -1; }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}
