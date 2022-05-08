import { Component } from '@angular/core';

import { Item } from './types';

import ItemsJson from '../assets/items.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'planetcraftercalculator';

  items: { [index: string]: Item } = ItemsJson;
}
