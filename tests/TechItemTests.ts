/// <reference path="../typings/mocha/mocha.d.ts" />

// if we used a `default` modifier to TechItem, we wouldn't need
// curly braces around TechItem
import {TechItem} from '../src/TechItem';

describe('TechItem', () => {
  beforeEach( () => {
    // unused so far
  });

  describe('constructor', () => {
    it('TechItem starts unbuilt', () => {
      var testObj = new TechItem([]);
      if( testObj.isBuilt() ) {
        throw new Error('TechItem was constructed already Built');
      }
    });
    //it('', ()=>{});
  });
});

class OriginalTechItemTests
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
