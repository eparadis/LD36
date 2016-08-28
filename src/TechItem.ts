export class TechItem
{
  private _isBuilt : boolean;
  private _preReqs : TechItem[];

  constructor(preReqs: TechItem[]) {
    this._preReqs = preReqs;
  }

  isBuilt() : boolean {
    return false;
  }

  build() : void {
    this._isBuilt = true;
  }
}

