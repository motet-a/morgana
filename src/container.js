const [dependencies, naming, singletons] = [new Map(), new Map(), new Map()];

export class Container {
  /**
   * Resolve dependency
   * @param {String|Function} classReference
   * @returns {Function}
   */
  static resolve(classReference) {
    classReference = Container.normalize(classReference);

    if (singletons.has(classReference)) {
      return Container.resolveSingleton(classReference);
    }

    return Container.resolveSingleInstance(classReference);
  }

  /**
   * Resolve all dependencies
   * @param {...String|Function} classes
   * @returns {Array}
   */
  static resolveAll(...classes) {
    return classes.map(Container.resolve);
  }

  /**
   * Resolve singleton
   * @param {Function} classReference
   * @returns {Function}
   */
  static resolveSingleton(classReference) {
    if (singletons.get(classReference) === null) {
      singletons.set(classReference, Container.resolveSingleInstance(classReference));
    }

    return singletons.get(classReference);
  }

  /**
   * Resolve single instance
   * @param {Function} ClassReference
   * @returns {Function}
   */
  static resolveSingleInstance(ClassReference) {
    return new ClassReference(...Container.resolveAll(...(dependencies.get(ClassReference) || [])));
  }

  /**
   * Normalize class reference
   * @param {String|Function} classReference
   * @returns {Function}
   */
  static normalize(classReference) {
    if (typeof classReference === 'string' && naming.has(classReference)) {
      return naming.get(classReference);
    } else if (typeof classReference === 'function') {
      return classReference;
    }

    throw new Error('Unable to resolve the dependency name to the class.');
  }

  /**
   * Register as dependencies
   * @param {Function} classReference
   * @param {Array} deps
   * @returns {Function}
   */
  static registerAsDependencies(classReference, deps) {
    dependencies.set(classReference, deps);
  }

  /**
   * Register as singleton
   * @param {Function} classReference
   */
  static registerAsSingleton(classReference) {
    if (!singletons.has(classReference)) {
      singletons.set(classReference, null);
    }
  }

  /**
   * Register name
   * @param {Function} classReference
   * @param {String} className
   */
  static registerName(classReference, className) {
    if (naming.has(className)) {
      throw new Error('Unable to register the dependency name to the class.');
    }

    naming.set(className, classReference);
  }

  /**
   * Getter of dependencies map
   * @returns {Map}
   */
  static get dependencies() {
    return dependencies;
  }

  /**
   * Getter of naming Map
   * @returns {Map}
   */
  static get naming() {
    return naming;
  }

  /**
   * Getter of singletons Map
   * @returns {Map}
   */
  static get singletons() {
    return singletons;
  }
}
