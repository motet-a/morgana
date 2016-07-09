import { should, expect } from 'chai';

import { inject, naming, singleton, $ } from '../src/injectable';

should();

describe('Injectable', () => {
  describe('inject', () => {
    it('should be a function', () => inject.should.be.a('function'));
  });

  describe('naming', () => {
    it('should be a function', () => naming.should.be.a('function'));

  });

  describe('singleton', () => {
    it('should be a function', () => singleton.should.be.a('function'));

  });

  describe('$', () => {
    it('should be a function', () => $.should.be.a('function'));
  });
});
