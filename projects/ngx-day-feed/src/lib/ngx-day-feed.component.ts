import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ngx-day-feed',
  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: []
})
export class NgxDayFeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
