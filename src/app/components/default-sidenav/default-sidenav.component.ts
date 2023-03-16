import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Sidenav</h1>

    <ul>
      <li>
        <a routerLink="/">Home</a>
      </li>

      <ul>
        <li>
          <a routerLink="home/screen-1">Screen 1</a>
        </li>

        <li>
          <a routerLink="home/screen-2">Screen 2</a>
        </li>
      </ul>

      <li>
        <a routerLink="/settings">Settings</a>
      </li>
    </ul>
  `,
})
export class DefaultSidenavComponent {}