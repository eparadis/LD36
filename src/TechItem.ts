export class TechItem
{
  private _isBuilt : boolean;
  private _preReqs : TechItem[];

  constructor(preReqs: TechItem[]) {
    this._preReqs = preReqs;
  }

  isBuilt() : boolean {
    return this._isBuilt;
  }

  build() : void {
    this._isBuilt = true;
  }
  
  canBuild() : boolean {
    for( var prereq of this._preReqs) {
      if( !prereq.isBuilt()) {
        return false;
      }
    }
    return true;
  }
}

