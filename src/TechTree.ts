import {TechItem} from './TechItem';

export class TechTree
{
  private _items : TechItem[];

  constructor( items: TechItem[]) {
    this._items = items;
  }
}
