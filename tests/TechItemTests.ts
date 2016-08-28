/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

// if we used a `default` modifier to TechItem, we wouldn't need
// curly braces around TechItem
import {TechItem} from '../src/TechItem';
import {assert} from 'chai';

describe('TechItem', () => {
  beforeEach( () => {
    // unused so far
  });

  it('TechItem starts unbuilt', () => {
    var testObj = new TechItem([]);
    assert.isNotOk(testObj.isBuilt());
  });
  it('TechItem can be built', ()=>{
    var testObj = new TechItem([]);
    testObj.build();
    assert.ok(testObj.isBuilt());
  });
  it('TechItem with unbuilt prereq cannot be built', ()=>{
    var prereq = new TechItem([]);
    assert.notOk( prereq.isBuilt());
    var testObj = new TechItem([prereq]);
    assert.notOk(testObj.canBuild());
  });
  it('TechItem with built prereq can be built', ()=>{
    var prereq = new TechItem([]);
    prereq.build();
    assert.ok( prereq.isBuilt());
    var testObj = new TechItem([prereq]);
    assert.ok(testObj.canBuild());
  });
  it('build action is called when TechItem is built', ()=>{
    var testObj = new TechItem([]);
    var buildActionCalled = false;
    testObj.addBuildAction( () => { buildActionCalled = true;})
    assert.notOk(buildActionCalled);
    testObj.build();
    assert.ok(buildActionCalled);
  });
  //it('', ()=>{});

});

