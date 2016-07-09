import { Container } from './container';

export function inject(...args) {
  return classReference => Container.registerAsDependencies(classReference, args);
}

export function naming(...args) {
  return classReference => (!args.length ? Container.registerName(classReference, classReference.name) : Container.registerName(classReference, args.shift()));
}

export function singleton() {
  return classReference => Container.registerAsSingleton(classReference);
}

export function $(classReference) {
  return Container.resolve(classReference);
}
