import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// for shallow
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { By } from '@angular/platform-browser';
// for deep
import { UpvoteComponent } from '../event-details/upvote.component';
import { DurationPipe } from '../shared/duration.pipe';
// for deep
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Joe'}
        };
        const mockVoterService = {
            userHasVoted: () => true
        };
        TestBed.configureTestingModule({
             imports : [],
             declarations: [
                 SessionListComponent,
                // CollapsibleWellComponent,
                // UpvoteComponent,
                 DurationPipe
             ],
             providers: [
                 {
                    provide: VoterService,
                    useValue: mockVoterService
                 },
                 {
                    provide: AuthService,
                    useValue: mockAuthService
                }
             ],
             schemas: [
                NO_ERRORS_SCHEMA
             ]
         });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [{id: 3, name : 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner',
            abstract : 'abstract', voters : ['john', 'bob']}];
            component.filterBy = 'all';
            component.sortBy = name;
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

           // expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        });
    });

});
