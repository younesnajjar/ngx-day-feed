import {Component, OnInit, ViewChild} from '@angular/core';
import {DayFeedConfig, NgxDayFeedComponent} from 'ngx-day-feed';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NgxDayFeedComponent, null) ngxDayFeedComponent: NgxDayFeedComponent;
  title = 'demo';
  images: string[] = [
    'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
    '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
    '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
    'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
    'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
    'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4',
  ];
  colors: string[] = ['orange', 'purple', '#FFA0A0', 'grey', null, null];
  imagesArray: string[] = [];
  public data: ItemConfig[] = [
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
      endHour: 19,
      disableHoverAnimation: false
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
    }, {
      startHour: 17,
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
  private colorsArray: string[];
  config: DayFeedConfig = {
    display: {
      items: {
        disableHoverAnimation: true,
      }
    },
    hours: {
      callback: (value: string) => {
        return value.split(':').map((v, i) => (i === 1) ? v + 'min' : v + 'h').join(':');
      }
    }
  };

  ngOnInit(): void {
    this.randImage();
    this.randColors();
  }

  showMessage($event: any) {
    this.data = this.data.filter((item, index) => index !== $event.index);
  }

  randImage() {
    this.imagesArray = this.data.map((item) => this.images[Math.floor(Math.random() * (this.images.length))]);
  }

  randColors() {
    this.colorsArray = this.data.map((item) => this.colors[Math.floor(Math.random() * (this.colors.length))]);
  }

  test() {
    this.data.forEach((item) => {
      item.startHour = Math.floor(Math.random() * (11)) + 1;
      item.endHour = Math.floor(Math.random() * (10)) + item.startHour + 2;
      // console.log(item.startHour + ':' + item.startMinute + ' -> ' + item.endHour + ':' + item.endMinute);
    });
    this.ngxDayFeedComponent.update();
  }
}
