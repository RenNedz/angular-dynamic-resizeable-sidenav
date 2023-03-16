import { SidenavContentHostDirective } from './components/sidenav/sidenav-content-host.directive';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SidenavComponent,
    SidenavContentHostDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
