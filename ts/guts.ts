
class Tests
{
  // tech tree
  treeItemStartsUnbuilt(assert) {
    var testObj = new TechItem([]);
    assert.ok(!testObj.isBuilt());
  }

  treeItemWithNoPreReqsCanBeBuilt(assert) {
    var testObj = new TechItem([]);
    testObj.Build();
    assert.ok(testObj.isBuilt());
  }

  treeItemWithUnbuiltPrereqCannotBeBuilt(assert) {
    var prereq = new TechItem([]);
    var testObj = new TechItem([prereq]);
    testObj.Build();
    assert.ok(!testObj.isBuilt());
  }
}
