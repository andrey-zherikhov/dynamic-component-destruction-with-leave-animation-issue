import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: `
    I'm dynamic component!
  `,
  styles: `
    :host {
      display: inline-flex;
      position: fixed;
      top: 50%;
      left: 50%;
      align-items: center;
      justify-content: center;
      height: 4em;
      width: 20em;
      margin: -2em -10em;
      border-radius: 1em;
      border: 3px solid #1b4a95;
      background-color: #aedaf4;
      color: #1b4a95;
      font-size: 1.5em;
      padding: 1em;
    }
  `,
  host: {
    'animate.enter': 'fade-in',
    'animate.leave': 'fade-out',
  }
})
export class Dynamic {}
