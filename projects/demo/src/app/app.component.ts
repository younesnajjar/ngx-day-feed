import {Component, ViewChild} from '@angular/core';
import {DayFeedConfig, NgxDayFeedComponent} from 'ngx-day-feed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(NgxDayFeedComponent, null) ngxDayFeedComponent: NgxDayFeedComponent;
  title = 'demo';
  public data: any[] = [
    {
      startHour: 1,
      endHour: 7,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      backgroundColor: 'orange'
    },
    {
      startHour: 3,
      startMinute: 30,
      endHour: 9,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      backgroundColor: 'orange'
    },

    {
      startHour: 6,
      endHour: 11,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4',
      disableHoverAnimation: false
    },
    {
      startHour: 9,
      endHour: 13,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4'
    },
    {
      startHour: 6,
      endHour: 11,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4',
      backgroundColor: 'purple'
    }, {
      startHour: 11,
      endHour: 13,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_2538828949683130_492962' +
        '7466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_eui2=AeE_ajamA4T' +
        '3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4z4skB1Ip250bRGn-DU' +
        'sA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.frak1-1.fna&oh=03e7d8b7' +
        '26bc5bfbf469b46ceefd0542&oe=5F0BF0CD'
    }, {
      startHour: 17,
      endHour: 19,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD'
    },


    {
      startHour: 14,
      endHour: 16,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      opacity: 1,
      hoverOpacity: 0.5,
    }, {
      startHour: 1,
      endHour: 7,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      backgroundColor: 'orange'
    },
    {
      startHour: 3,
      startMinute: 30,
      endHour: 9,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      backgroundColor: 'orange'
    },

    {
      startHour: 6,
      endHour: 11,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4',
      disableHoverAnimation: false
    },
    {
      startHour: 9,
      endHour: 13,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4'
    },
    {
      startHour: 6,
      endHour: 11,
      imgLink: 'https://avatars3.githubusercontent.com/u/37715926?s=400&u=19561cb03e388feebe6d6380b4c45095ef71fb62&v=4',
      backgroundColor: 'purple'
    }, {
      startHour: 11,
      endHour: 13,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_2538828949683130_492962' +
        '7466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_eui2=AeE_ajamA4T' +
        '3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4z4skB1Ip250bRGn-DU' +
        'sA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.frak1-1.fna&oh=03e7d8b7' +
        '26bc5bfbf469b46ceefd0542&oe=5F0BF0CD'
    }, {
      startHour: 17,
      endHour: 19,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD'
    },


    {
      startHour: 14,
      endHour: 16,
      imgLink: 'https://scontent.frak1-1.fna.fbcdn.net/v/t1.0-9/74802279_25' +
        '38828949683130_4929627466504339456_o.jpg?_nc_cat=105&_nc_sid=09cbfe&' +
        '_nc_eui2=AeE_ajamA4T3ZcmKfwIw5lUk4i0MefoJL93iLQx5-gkv3VQob374s3AebFSs-4' +
        'z4skB1Ip250bRGn-DUsA_CPIVw&_nc_ohc=05gvfvnI5xcAX8x04bm&_nc_ht=scontent.fra' +
        'k1-1.fna&oh=03e7d8b726bc5bfbf469b46ceefd0542&oe=5F0BF0CD',
      hoverOpacity: 0.5,
    }


  ];
  config: DayFeedConfig = {
    display: {
      items: {
        disableHoverAnimation: true,
        opacity: 0.6,
      }
    },
    hours: {

      callback: (value: string) => {
        return value.split(':').map((v, i) => (i === 1) ? v + 'min' : v + 'h').join(':');
      }
    }
  };

  showMessage($event: any) {
    this.data = this.data.filter((item, index) => index !== $event.index);
  }

  test() {
    this.data.forEach((item) => {
      item.startHour = Math.floor(Math.random() * (11)) + 1;
      item.endHour = Math.floor(Math.random() * (3)) + item.startHour + 4;
    });
    this.ngxDayFeedComponent.update();
  }
}
