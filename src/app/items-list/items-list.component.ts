import { Component, OnInit } from '@angular/core';

import { Item } from '../types';

import ItemsJson from '../../assets/items.json';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.pug',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  items: { [index: string]: Item } = ItemsJson;

  constructor() {}

  ngOnInit(): void {}
}
