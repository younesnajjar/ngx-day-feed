# NgxDayFeed

NgxDayFeed is an Angular library for making day based calendars.

The items in the calendar can be filled with any html content including your custom components.
<div style="text-align: center;display: flex; flex-direction: 'row'; justify-content: center">
<img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/small-screen.PNG?raw=true" height="400" />
 <img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/wide-screenShot2.PNG?raw=true" height="400" />
 <img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/small-screen-2.PNG?raw=true" height="400" />

</div>

## Installation

Install NgxDayFeed using NPM::

```bash
npm i ngx-day-feed --save
```

## Usage

1. Import NgxDayFeedModule :

Once you have installed ngx-day-feed, you can import it in your `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify NgxDayFeedModule as an import
    NgxDayFeedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Start using it:

Once the NgxDayFeedModule is imported, you can start using the component in your Angular application:

```html
<ngx-day-feed>
    <ngx-calendar-item [itemConfig]="{startHour: 8, endHour: 12}"></ngx-calendar-item>
  </ngx-day-feed>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
