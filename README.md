# Morgana

[![Code Climate](https://codeclimate.com/repos/5781715fe0063c008500555f/badges/c99739c75f39565b418e/gpa.svg)](https://codeclimate.com/repos/5781715fe0063c008500555f/feed)

Dependency Injection for Node.js with ES7 decorators.

Morgana is a DIC (Dependency Injection Container) with friendly usage.

We use ES7 decorators to purpose a minimal set of functionality.

Actually, Morgana work only in a ES6/ES7 environment.

# How to use

We recommend to use Babel (in stage-0) with "babel-plugin-transform-decorators-legacy" and "babel-plugin-transform-runtime" plugins.

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

If you don't want a new instance, you can use the singleton decorator :

```js
/* hero.js */
import { inject, naming, singleton } from 'morgana/injectable';

import { Life, Mana } from './hero.detail';

@naming('HeroFactory')
@inject(Life, Mana)
@singleton()
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
