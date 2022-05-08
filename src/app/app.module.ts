import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { ItemsListComponent } from './items-list/items-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ItemsListComponent,
  },
];

@NgModule({
  declarations: [AppComponent, ItemsListComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
