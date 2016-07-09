import { should, expect } from 'chai';

import { Container } from '../src/container';
import { inject, naming, singleton, $ } from '../src/injectable';

should();

class DummyDependency {
  constructor() {

  }
}

class SecondDummyDependency {
  constructor() {

  }
}

@inject(DummyDependency)
class DummyWithDependency {
  constructor(dummyDependency) {
    this._dependency = dummyDependency;
  }

  get dependency() {
    return this._dependency;
  }
}

@inject(DummyWithDependency)
class DummyWithNestedDependencies {
  constructor(dummyWithDependency) {
    this._dependency = dummyWithDependency;
  }

  get dependency() {
    return this._dependency;
  }
}

@singleton
class Singleton {

}

describe('Container', () => {
  it('should be a function', () => Container.should.be.a('function'));

  describe('#normalize()', () => {
    it('should have method normalize', () => {
      Container.should.have.property('normalize');
      Container.normalize.should.be.a('function');
    });

    it('should return the class constructor unmodified if one is passed in', () => {
      expect(Container.normalize(DummyDependency)).to.equal(DummyDependency);
    });

    it('should throw an error if the provided "class reference" is not a string or constructor', () => {
      expect(Container.normalize.bind(Container, 666)).to.throw('Unable to resolve the dependency name to the class.');
    });
  });

  describe('#registerName()', () => {
    it('should have method registerName', () => {
      Container.should.have.property('registerName');
      Container.registerName.should.be.a('function');
    });

    it('should register a class constructor by name provided', () => {
      Container.registerName(DummyDependency, 'myAlias');
      expect(Container.naming.get('myAlias')).to.equal(DummyDependency);
    });

    it('should trow an error if the provided "class name" already exist', () => {
      Container.registerName.bind(Container, DummyDependency, 'myAlias');
      expect(Container.registerName.bind(Container, DummyDependency, 'myAlias')).to.throw('Unable to register the dependency name to the class.');
    });
  });
});
