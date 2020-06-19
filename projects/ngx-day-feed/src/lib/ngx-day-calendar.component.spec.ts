import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxDayCalendarComponent} from './ngx-day-calendar.component';

describe('NgxDayFeedComponent', () => {
  let component: NgxDayCalendarComponent;
  let fixture: ComponentFixture<NgxDayCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDayCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
