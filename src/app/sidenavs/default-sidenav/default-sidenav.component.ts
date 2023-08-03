import { Component } from '@angular/core';

@Component({
  template: ` <h1>GMS</h1>

    <app-sidenav-link routerLink="/home">
      <mat-icon icon>home</mat-icon>

      Home
    </app-sidenav-link>

    <app-sidenav-link routerLink="/vehicles">
      <mat-icon icon>directions_car</mat-icon>

      Vehicles
    </app-sidenav-link>

    <app-sidenav-link routerLink="/profile">
      <mat-icon icon>account_circle</mat-icon>

      Profile
    </app-sidenav-link>

    <app-sidenav-link routerLink="screen-1">
      <mat-icon icon>screen_share</mat-icon>

      Screen 1
    </app-sidenav-link>

    <app-sidenav-link routerLink="screen-2">
      <mat-icon icon>screen_share</mat-icon>

      Screen 2
    </app-sidenav-link>

    <app-sidenav-link routerLink="/settings">
      <mat-icon icon>settings</mat-icon>

      Settings
    </app-sidenav-link>`,
  styles: [``],
})
export class DefaultSidenavComponent {}
