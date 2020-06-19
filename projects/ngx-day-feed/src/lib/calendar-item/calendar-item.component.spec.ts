import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarItemComponent} from './calendar-item.component';

describe('AvailabilityComponent', () => {
  let component: CalendarItemComponent;
  let fixture: ComponentFixture<CalendarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
