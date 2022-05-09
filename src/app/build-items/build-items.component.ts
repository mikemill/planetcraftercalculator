import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { filter } from 'rxjs/operators';

import { Item } from '../types';

import ItemsJson from '../../assets/items.json';

interface Dependency {
  name: string;
  quantity: number;
  max_depth: number;
}

@Component({
  selector: 'app-build-items',
  templateUrl: './build-items.component.pug',
  styleUrls: ['./build-items.component.scss'],
})
export class BuildItemsComponent implements OnInit {
  items: Item[] = ItemsJson;
  faTrashAlt = faTrashAlt;

  itemControl: FormControl = new FormControl();

  itemsAndQuantities: FormGroup[] = [];
  quantities: FormArray = new FormArray([]);
  dependencies: Dependency[] = [];

  resource_changes = {
    power: 0,
    heat: 0,
    pressure: 0,
    oxygen: 0,
    biomass: 0,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itemControl.valueChanges
      .pipe(filter((value) => value !== null))
      .subscribe((value) => {
        const fg = this.fb.group({
          item: this.items.find((item) => item.key == value),
          quantity: 0,
        });

        this.itemsAndQuantities.push(fg);
        this.quantities.push(fg);
        window.setTimeout(() => this.itemControl.patchValue(null), 0);
      });

    this.quantities.valueChanges.subscribe((values) => {
      this.calculateDependencies();
    });
  }

  removeItem(itemGroup: any) {
    const index = this.quantities.controls.findIndex(
      (control) => control.value.item.key === itemGroup.value.item.key
    );
    this.quantities.removeAt(index);
    this.itemsAndQuantities = this.itemsAndQuantities.filter(
      (iq) => iq.value.item.key !== itemGroup.value.item.key
    );

    this.calculateDependencies();
  }

  addItemDepencencies(
    dependencies: { [index: string]: Dependency },
    item: Item,
    quantity: number,
    depth = 0
  ) {
    const key = item.key;

    if (!dependencies.hasOwnProperty(key)) {
      dependencies[key] = {
        name: item.name,
        quantity: 0,
        max_depth: 0,
      };
    }

    dependencies[key].quantity += quantity;
    dependencies[key].max_depth = Math.max(depth, dependencies[key].max_depth);

    for (const dep of item.dependencies) {
      const depItem = this.items.find((i) => i.key === dep.item) as Item;
      this.addItemDepencencies(
        dependencies,
        depItem,
        quantity * dep.quantity,
        depth + 1
      );
    }
  }

  calculateDependencies() {
    const dependencies: { [index: string]: Dependency } = {};

    for (const item of this.itemsAndQuantities) {
      this.addItemDepencencies(
        dependencies,
        item.value.item,
        item.value.quantity,
        0
      );
    }
    this.resource_changes = {
      power: 0,
      heat: 0,
      pressure: 0,
      oxygen: 0,
      biomass: 0,
    };

    for (const [key, value] of Object.entries(dependencies)) {
      if (value.quantity === 0) {
        continue;
      }

      const item = this.items.find((i) => i.key == key) as Item;

      this.resource_changes.power += (item.power || 0) * value.quantity;
      this.resource_changes.heat += (item.heat || 0) * value.quantity;
      this.resource_changes.pressure += (item.pressure || 0) * value.quantity;
      this.resource_changes.oxygen += (item.oxygen || 0) * value.quantity;
      this.resource_changes.biomass += (item.biomass || 0) * value.quantity;
    }

    this.dependencies = Object.values(dependencies)
      .filter((item) => item.quantity > 0)
      .sort((a, b) => {
        return b.max_depth - a.max_depth;
      });
  }
}
