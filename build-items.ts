import { createReadStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from '@fast-csv/parse';
import { Item } from 'src/app/types';

interface CsvItem {
  key: string;
  name: string;
  type: string;
  power: string;
  oxygen: string;
  biomass: string;
  heat: string;
  pressure: string;
  dependency_1: string;
  dependency_2: string;
  dependency_3: string;
  dependency_4: string;
  dependency_5: string;
  dependency_6: string;
  dependency_7: string;
  dependency_8: string;
  dependency_9: string;
}

const in_file = 'src/items.csv';
const out_file = 'src/assets/items.json';

const items: Item[] = [];

function convertNumber(value: string): number {
  return parseFloat(value);
}

createReadStream(resolve(in_file))
  .pipe(parse({ headers: true }))
  .on('error', (error: any) => console.error(error))
  .on('data', (row: CsvItem) => {
    const json_item: Item = {
      key: row.key,
      name: row.name,
      type: row.type,
      dependencies: [],
    };

    const dependencies: { [index: string]: number } = {};

    if (row.power) {
      json_item.power = convertNumber(row.power);
    }

    if (row.heat) {
      json_item.heat = convertNumber(row.heat);
    }

    if (row.pressure) {
      json_item.pressure = convertNumber(row.pressure);
    }

    if (row.biomass) {
      json_item.biomass = convertNumber(row.biomass);
    }

    if (row.oxygen) {
      json_item.oxygen = convertNumber(row.oxygen);
    }

    for (let i = 1; i <= 9; i++) {
      const key: keyof CsvItem = `dependency_${i}` as keyof CsvItem;
      if (row[key]) {
        if (!dependencies.hasOwnProperty(row[key])) {
          dependencies[row[key]] = 0;
        }
        dependencies[row[key]] += 1;
      }
    }

    json_item.dependencies = Object.entries(dependencies).map(
      ([dep_item, quantity]) => ({
        item: dep_item,
        quantity: quantity,
      })
    );

    items.push(json_item);
  })
  .on('end', (rowCount: number) => {
    items.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    writeFileSync(out_file, JSON.stringify(items, null, 2));
    console.log(`Parsed ${rowCount} items`);
  });
