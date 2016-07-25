# Morgana

[![Code Climate](https://codeclimate.com/repos/578549bdee82fe0745002cc2/badges/9e13378054ac03ac965d/gpa.svg)](https://codeclimate.com/repos/578549bdee82fe0745002cc2/feed)

Dependency Injection for Node.js with ES7 decorators.

Morgana is a DIC (Dependency Injection Container) with friendly usage.

We use ES7 decorators to purpose a minimal set of functionality.

Actually, Morgana works only in a ES6 + ES7 environment.

# How to setup a Node.js project for ES6/ES7

You need to be in a ES6 + ES7 environment.

Create a directory and make a file ".babelrc", use this configuration:

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

To launch transpilation, you need a tool: WebPack or Gulp can do it.

For some tests, install the Babel command line interface globally:

```sh
npm i babel-cli -g
```

Now, you can make an `index.js` file and write ES6/ES7:

```js
/* index.js */
require('babel-register');

// You're in ES6/ES7 env
```

Run your app:

```sh
babel-node index.js
```

# How to use

Install morgana package:

```sh
npm i morgana --save-dev
```

We can now inject dependencies with the inject decorator:

```js
/* index.js */
import { inject } from 'morgana';

class Attribute {
  constructor() {
    this.hp = 100;
    this.mana = 100;
  }
}

@inject(Attribute)
class Hero {
  constructor(attribute) {
    this.attribute = attribute;
  }
}
```

It's better to write one class per file, so move Attribute in other file.

To access to a new Hero, we can use the `$` function and pass a
reference to the Hero class:

```js
/* index.js */
import { inject, $ } from 'morgana';
import { Attribute } from './attribute';

@inject(Attribute)
class Hero {
  constructor(attribute) {
    this.attribute = attribute;
  }
}

const me = $(Hero); // new instance
```

Passing reference and import can be painful in large apps, because you
need to import the class in every file…

You can use the naming decorator to alias your classes, use it at first
decorator:

```js
/* index.js */
import { inject, naming, $ } from 'morgana';
import { Attribute } from './attribute';

@naming('HeroFactory')
@inject(Attribute)
class Hero {
  constructor(attribute) {
    this.attribute = attribute;
  }
}

const me = $(Hero); // new instance
```

If we don't use parameter on naming decorator, the class name is used.

Now, we can use our alias rather than class reference.

```js
/* other-file.js */
import { $ } from 'morgana';

const me = $('HeroFactory'); // new instance
```

If you don't want a new instance, singleton decorator is here:

```js
/* index.js */
import { inject, naming, singleton, $ } from 'morgana';
import { Attribute } from './attribute';

@naming('HeroFactory')
@inject(Attribute)
@singleton()
class Hero {
 constructor(attribute) {
    this.attribute = attribute;
  }
}

const me = $('HeroFactory'); // new instance
const yo = $('HeroFactory'); // same instance
```

Now, every time we need a Hero, we get the same instance.

Every time you use `inject`, you can use the class in any part of your
app.

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

Node.js >= v6
