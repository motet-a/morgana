# Morgana

[![Code Climate](https://codeclimate.com/repos/578549bdee82fe0745002cc2/badges/9e13378054ac03ac965d/gpa.svg)](https://codeclimate.com/repos/578549bdee82fe0745002cc2/feed)

Dependency Injection for Node.js with ES7 decorators.

Morgana is a DIC (Dependency Injection Container) with friendly usage.

We use ES7 decorators to purpose a minimal set of functionality.

Actually, Morgana work only in a ES6 + ES7 environment.

# How to setup Node for ES6/ES7

You need to be in a ES6 + ES7 environment.

Create a directory and make a file ".babelrc", use this configuration :

```json
{
  "passPerPreset": true,
  "presets": [
    "es2015",
    "stage-0",
    "stage-1",
    "stage-2"
  ],
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy"
  ],
  "comments": false
}
```

You need to install Babel to transpile the next JavaScript into classic code.

```sh
npm init
npm i babel babel-core babel-loader babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0 babel-preset-stage-1 babel-preset-stage-2 babel-register --save-dev
```

To launch transpilation, you need a tool : WebPack or Gulp can do it.

For some test, install the Babel command line interface globally :

```sh
npm i babel-cli -g
```

Now, you can make a file "index.js" and write ES6/ES7 :

```js
/* index.js */
require('babel-register');

// You're in ES6/ES7 env
```

Run your app :

```sh
babel-node index.js
```

# How to use

Install morgana package :

```sh
npm i morgana --save-dev
```

We can now inject dependency with the inject decorator :

```js
/* index.js */
import { inject } from 'morgana';

class Attribut {
  constructor() {
    this.hp = 100;
    this.mana = 100;
  }
}

@inject(Attribut)
class Hero {
  constructor(attribut) {
    this.attribut = attribut;
  }
}
````

It's better to write 1 class per file, so move Attribut in other file.

To access to a new Hero, we can use the $ function and pass a reference to the Hero class :

```js
/* index.js */
import { inject, $ } from 'morgana';
import { Attribut } from './attribut';

@inject(Attribut)
class Hero {
  constructor(attribut) {
    this.attribut = attribut;
  }
}

const me = $(Hero); // new instance
```

Passing reference and import can be paintfull in large app, because you need to import the class in every file ...

You can use the naming decorator to alias your class, use it at first decorator :

```js
/* index.js */
import { inject, naming, $ } from 'morgana';
import { Attribut } from './attribut';

@naming('HeroFactory')
@inject(Attribut)
class Hero {
  constructor(attribut) {
    this.attribut = attribut;
  }
}

const me = $(Hero); // new instance
````

If we don't use parameter on naming decorator, the class name is used.

Now, we can use our alias rather than class reference.

```js
/* other-file.js */
import { $ } from 'morgana';

const me = $('HeroFactory'); // new instance
```

If you don't want a new instance, singleton decorator is her :

```js
/* index.js */
import { inject, naming, singleton, $ } from 'morgana';
import { Attribut } from './attribut';

@naming('HeroFactory')
@inject(Attribut)
@singleton()
class Hero {
 constructor(attribut) {
    this.attribut = attribut;
  }
}

const me = $('HeroFactory'); // new instance
const yo = $('HeroFactory'); // same instance
````

Now, every time we need a Hero, we got the same instance.

Every time you use inject, you can use class in every part of your app.

# Run test

```sh
npm run test
```

# Build app

```sh
npm run build
```

# Run dev. server

```sh
npm run dev
```

# Run test watcher

```sh
npm run test:watch
```

# Requirements

NodeJS >= v6
