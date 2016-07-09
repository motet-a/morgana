import { should, expect } from 'chai';

import * as barrel from '../src/index';

should();

const props = ['Container', 'naming', 'inject', 'singleton', '$'];

describe('Index', () => {
  it('should be a big barrel object', () => barrel.should.be.a('object'));

  props.forEach(prop => it(`should have method ${prop} in barrel`, () => {
    barrel.should.have.property(prop);
    barrel[prop].should.be.a('function');
  }));
});
