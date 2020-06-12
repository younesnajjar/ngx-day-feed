import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDayFeedComponent } from './ngx-day-feed.component';

describe('NgxDayFeedComponent', () => {
  let component: NgxDayFeedComponent;
  let fixture: ComponentFixture<NgxDayFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDayFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDayFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
