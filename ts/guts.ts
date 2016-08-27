class TechItem
{
  private _isBuild : boolean;

  constructor(preReqs: TechItem[]) {
    this.preReqs = preReqs;
  }

  isBuilt() : boolean {
    return false;
  }

  build() : void {
    this._isBuilt = true;
  }
}

class Tests
{
  // tech tree
  treeItemStartsUnbuilt(assert) {
    var testObj = new TechItem([]);
    assert.ok(!testObj.isBuilt());
  }

  treeItemWithNoPreReqsCanBeBuilt(assert) {
    var testObj = new TechItem([]);
    testObj.build();
    assert.ok(testObj.isBuilt());
  }

  treeItemWithUnbuiltPrereqCannotBeBuilt(assert) {
    var prereq = new TechItem([]);
    var testObj = new TechItem([prereq]);
    testObj.build();
    assert.ok(!testObj.isBuilt());
  }
}
