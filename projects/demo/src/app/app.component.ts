import {Component, OnInit, ViewChild} from '@angular/core';
import {DayFeedConfig, NgxDayFeedComponent} from 'ngx-day-feed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NgxDayFeedComponent, null) ngxDayFeedComponent: NgxDayFeedComponent;
  title = 'demo';
  imagesSourceLink = 'https://raw.githubusercontent.com/younesnajjar/ngx-day-feed/master/projects/demo/src/assets/profiles/avatar-';
  colors: string[] = ['orange', 'purple', '#FFA0A0', 'grey', null, null];
  config: DayFeedConfig = {
    display: {
      items: {
        disableHoverAnimation: true,
      }
    },
    hours: {}
  };
  public data: any[] = [
    {
      startHour: 6,
      endHour: 9,
    },
    {
      startHour: 9,
      startMinute: 30,
      endHour: 12,
    },
    {
      startHour: 9,
      startMinute: 30,
      endHour: 12,
    },
    {
      startHour: 13,
      endHour: 19,
    },
    {
      startHour: 13,
      endHour: 16,
    },
    {
      startHour: 13,
      endHour: 16,
    }, {
      startHour: 13,
      endHour: 19,
    },
    {
      startHour: 17,
      endHour: 19,
    }, {
      startHour: 17,
      endHour: 19,
    },


  ];

  ngOnInit(): void {
    this.randImage();
    this.randColors();
  }

  showMessage($event: any) {
    this.data = this.data.filter((item, index) => index !== $event.index);
  }

  randImage() {
    this.data = this.data.map((item) => {
      item.imageLink = this.imagesSourceLink + (Math.floor(Math.random() * 10) + 1) + '.png';
      return item;
    });
  }

  randColors() {
    this.data = this.data.map((item) => {
      item.backgroundColor = this.colors[Math.floor(Math.random() * (this.colors.length))];
      return item;
    });
  }

  randomTimes() {
    this.data.forEach((item) => {
      item.startHour = Math.floor(Math.random() * (11)) + 1;
      item.startMinute = 30;
      item.endHour = Math.floor(Math.random() * (10)) + item.startHour + 2;
      // console.log(item.startHour + ':' + item.startMinute + ' -> ' + item.endHour + ':' + item.endMinute);
    });
    this.ngxDayFeedComponent.update();
  }

  addItem() {
    const startHour = Math.floor(Math.random() * (11)) + 1;
    this.data.push({
      startHour,
      startMinute: 30,
      endHour: Math.floor(Math.random() * (10)) + startHour + 2,
      imageLink: this.imagesSourceLink + (Math.floor(Math.random() * 10) + 1) + '.png',
      backgroundColor: this.colors[Math.floor(Math.random() * (this.colors.length))]
    });
  }
}
