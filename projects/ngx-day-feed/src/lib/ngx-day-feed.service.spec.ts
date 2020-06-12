import { TestBed } from '@angular/core/testing';

import { NgxDayFeedService } from './ngx-day-feed.service';

describe('NgxDayFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDayFeedService = TestBed.get(NgxDayFeedService);
    expect(service).toBeTruthy();
  });
});
