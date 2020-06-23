# NgxDayFeed

NgxDayFeed is an Angular library for making day based calendars.

The items in the calendar can be filled with any html content including your custom components.
<div >
 <img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/small-screen.PNG?raw=true" height="400"  />
 <img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/wide-screenShot2.PNG?raw=true" height="400" />
  <img src="https://github.com/younesnajjar/ngx-day-feed/blob/master/projects/demo/src/assets/screens/numbers-screenshot.PNG?raw=true" height="400"  />

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
import { NgxDayFeedModule } from 'ngx-avatar';

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
    <ngx-feed-item [itemConfig]="{startHour: 8, endHour: 12}"> Hello Wolrd </ngx-feed-item>
  </ngx-day-feed>
```

## Configuration Properties

There are multiple properties, some are made for the global component and other are for each item.

### Global properties

  
```html
<ngx-day-feed [config]="config" >
  ...
  </ngx-day-feed>
```
```typescript
config: DayFeedConfig = {
  display?: {
    gap?: number,
    items?: {
    ...
    }

  };
  hours?: {
  ...
  };
}
```


#### display

|   Attribute   |      Type        | Default |                                              Description                                               |
| ------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `gap`  | *number \| null* |    1 (%)     | The horizontal gap between items                                                                                            |
| `items.backgroundColor`    | *string \| null* |  #37AEEB   |  Items default background color                                                                                             |
| `items.opacity`   | *number \| null* |    0.8     | Items opacity                                                                                      |
| `items.hoverOpacity`   | *number \| null* |     1    | Items mouseover opacity                                                                                         |
| `items.disableHoverAnimation` | *boolean \| null* |     false    | Disabling the Hover animation (Grow animation) including component items first creation                          |
| `items.disableNewAnimation`     | *boolean \| null* |    false     |  Disable create items animation                                                                                           |
#### hours

|   Attribute   |      Type        | Default |                                              Description                                               |
| ------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `min`  | *number \| null* |    undefined     | Vertical hours min value                                                                                           |
| `max`    | *number \| null* |  undefined   | Vertical hours max value                                                                                             |
| `callback`   | *(value: string) => number \| null* |    undefined     | change string format from value(HH:MM) to any other format

### Item Config

```html
<ngx-day-feed [config]="config" >
  <ngx-feed-item [itemConfig]="itemConfig"> ANY HTML CONTENT </ngx-feed-item>
    ...
  </ngx-day-feed>
```
```typescript
itemConfig: DayFeedConfig = {
  startHour: number;
  endHour: number;
  startMinute?: number;
  endMinute?: number;
  backgroundColor?: string;
  opacity?: number;
  hoverOpacity?: number;
  disableHoverAnimation?: boolean;
  disableNewAnimation?: boolean;
}
```
|   Attribute   |      Type        | Default |                                              Description                                               |
| ------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `startHour`  | *number* |    undefined     | Item start hour                                                                                         |
| `endHour`    | *number* |  undefined   |  item end hour                                                                                            |
| `startMinute`   | *number* |    0     | Item start minute                                                                                       |
| `endMinute`   | *number* |     0    | Item end minute      |
| `backgroundColor` | *string \| null* |     null    | Item background color                                                                                           |
| `opacity`     | *boolean \| null* |    false     |  Item opacity     |
| `hoverOpacity`     | *boolean \| null* |    false     |  Item mouseover opacity     |
| `disableHoverAnimation`     | *boolean \| null* |    false     |  Disable hover item animation (Grow animation)  |
| `disableNewAnimation`     | *boolean \| null* |    false     |  Disable created item animation        |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/) © [Younes Najjar](mailto:younes.najjar.96@gmail.com)
