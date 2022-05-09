import { Component, OnInit } from '@angular/core';
import { Item } from '../types';

import ItemsJson from '../../assets/items.json';

@Component({
  selector: 'app-build-items',
  templateUrl: './build-items.component.pug',
  styleUrls: ['./build-items.component.scss'],
})
export class BuildItemsComponent implements OnInit {
  items: { [index: string]: Item } = ItemsJson;

  constructor() {}

  ngOnInit(): void {}
}
