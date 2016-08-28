/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import {Counter} from '../src/Counter';
import {assert} from 'chai';

describe('Counter', () => {
  beforeEach( () => {
    // unused so far
  });

  describe('Counter', () => {
    // TODO how to test things in the document? introduce an interface+fake?
    /*it('add takes an integer', () => {
      var parent = document.createElement('p');
      var testObj = new Counter(parent, "unit");
      testObj.add(1234);
      assert.include(parent.innerHTML, "1234");
    });*/
    /*it('adding a value causes all subscribers to be called', () => {
        var testObj = new Counter("name");
        var subscriberCalled = false;
        testObj.subscribe( (time) => { subscriberCalled = true; });
        assert.notOk( subscriberCalled);
        testObj.add(1);
        assert.ok(subscriberCalled);
    });*/
   
    //it('', ()=>{});
  });
});

