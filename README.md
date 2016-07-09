# Morgana

Dependency Injection for Node.js with ES7 decorators.

Morgana is a DIC (Dependency Injection Container) with friendly usage.

We use ES7 decorators to purpose a minimal set of functionality.

Actually, Morgana work only on Node.js >= 6 !

# How to use

Remember : to use decorator, you need to use Babel with this .babelrc configuration :

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

The npm package "babel-plugin-transform-decorators-legacy" is needed.

You can't use decorator without a transpiler.

Now, install morgana :

```sh
npm i morgana --save-dev
```

We can now inject dependency with the inject decorator :

```js
/* hero.js */
import { inject } from 'morgana/injectable';

import { Life, Mana } from './hero.detail';

@inject(Life, Mana)
class Hero {
  constructor(life, mana) {
    this.life = life;
    this.mana = mana;

    this.life.set(100);
    this.mana.set(100);
  }
}
````

To access to a new Hero, we can use the $ function and pass a reference to the Hero class :

```js
/* app.js */
import { $ } from 'morgana/injectable';
import { Hero } from './hero';

const me = $(Hero); // got a new Hero instance
```

Passing reference and import can be paintfull in large app ...

You can use the naming decorator to alias your class, use it in first :

```js
/* hero.js */
import { inject, naming } from 'morgana/injectable';

import { Life, Mana } from './hero.detail';

@naming('HeroFactory')
@inject(Life, Mana)
class Hero {
  constructor(life, mana) {
    this.life = life;
    this.mana = mana;

    this.life.set(100);
    this.mana.set(100);
  }
}
````

If we don't use parameter in naming decorator, the class name is used.

```js
/* app.js */
import { $ } from 'morgana/injectable';

const me = $('HeroFactory'); // got a new Hero instance
```

If you don't want a new instance every time you claim your class (singleton pattern), you can use the singleton decorator :

```js
/* hero.js */
import { inject, naming, singleton } from 'morgana/injectable';

import { Life, Mana } from './hero.detail';

@naming('HeroFactory')
@inject(Life, Mana)
@singleton
class Hero {
  constructor(life, mana) {
    this.life = life;
    this.mana = mana;

    this.life.set(100);
    this.mana.set(100);
  }
}
````

Now, every time we need a Hero, we got the same instance.

If you need all functionnality, you can use the barrel facade :

```js
import { container, inject, naming, singleton, $ } from 'morgana';
```

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
