/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import {assert} from 'chai';

import {TechItem} from '../src/TechItem';
import {TechTree} from '../src/TechTree';

describe('TechTree', () => {
  beforeEach( () => {
  });

  describe('TechTree', () => {
    it('TechTree is constructed with a list of TechItems', () => {
      var testObj = new TechTree([ new TechItem([]) ]);
    });
    //it('', ()=>{});
  });
});

