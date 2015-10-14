# Enforce NODE_PATH
[![Build Status](https://travis-ci.org/inxilpro/enforce-node-path.svg)](https://travis-ci.org/inxilpro/enforce-node-path) [![Dependency Status](https://david-dm.org/inxilpro/enforce-node-path.svg)](https://david-dm.org/inxilpro/enforce-node-path)

> **Please Note:** Due to the very limited scope of this module, I do not anticipate needing to make very many changes to it.  Expect long stretches of zero updates—that does not mean that the module is outdated.

This simple module enforces usage of the `NODE_PATH` environmental variable to make loading _application modules_ (modules that are not in `node_modules`) in Node.js more consistent.

## Why?

The [Node.js module loader](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) uses a special environmental variable called `NODE_PATH`:

> If the `NODE_PATH` environment variable is set to a colon-delimited list of absolute paths, then Node.js will search those paths for modules if they are not found elsewhere.

This means that if you set the `NODE_PATH` environmental variable to the root of your application, you can load application files relative to your root directory wherever you are.

Assuming that `NODE_PATH` set to `/var/www`:

``` js
// In /var/www/server/router.js
var routes = require('config/routes.json'); // Looks in /var/www/config/routes.json
```

Unfortunately, the module loader caches this environmental variable before your app runs, so it's not possible to set `process.env.NODE_PATH` after the fact.  And as the [docs state](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders), relying on this variable can be dangerous because developers may not know that it needs to be set.  **This module makes that dependency explicit and triggers an error if it's not set.**

## Installation

``` bash
$ npm install enforce-node-path --save
```

## Usage

**As close to the top of your app's entry point,** add the following code:

``` js
var enforceNodePath = require('enforce-node-path');
enforceNodePath(__dirname);
```

If `NODE_PATH` is not set to `__dirname` (`path.resolve` is used, so they just have to resolve to the same directory), an `Error` is thrown.

It is recommended that you set this environmental variable in your npm scripts section so that `npm start` just works:

``` json
{
  "scripts": {
    "start": "NODE_PATH=. node index.js",
  }
}
```