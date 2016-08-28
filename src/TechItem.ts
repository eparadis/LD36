export class TechItem
{
  private _isBuilt : boolean;
  private _preReqs : TechItem[];
  private _buildActions : Function[];

  constructor(preReqs: TechItem[]) {
    this._preReqs = preReqs;
    this._buildActions = [];
  }

  isBuilt() : boolean {
    return this._isBuilt;
  }

  build() : void {
    this._isBuilt = true;
    for( var callback of this._buildActions) {
      callback();
    }
  }
  
  canBuild() : boolean {
    for( var prereq of this._preReqs) {
      if( !prereq.isBuilt()) {
        return false;
      }
    }
    return true;
  }

  addBuildAction( callback : Function) {
    this._buildActions.push(callback);
  }
}

