import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxSelectModule } from 'ngx-select-ex';

import { AppComponent } from './app.component';

import { BuildItemsComponent } from './build-items/build-items.component';
import { ItemsListComponent } from './items-list/items-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ItemsListComponent,
  },
  {
    path: 'build',
    component: BuildItemsComponent,
  },
  {
    path: '',
    component: BuildItemsComponent,
  },
];

@NgModule({
  declarations: [AppComponent, ItemsListComponent, BuildItemsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgxSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
