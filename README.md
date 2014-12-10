# umd-ify

Want to use the awesome powers of [npm](https://npmjs.org) but can't/don't
want to use [browserify](https://browserify.org)? Then maybe this module is
for you...

## Installing

Install `umd-ify` either locally for your project(`npm i umd-ify`) or global
(`npm i -g umd-ify`).

## Usage

`umd-ify` goes through your `node_modules/` folder and packages each of your
dependencies as a [UMD](https://github.com/umdjs/umd) module and puts them into
a folder for you.

Just run this command in the root of your project:

```bash
umdify --dir umd_modules/
```

You can also define it as a script in your `package.json` file:

```json
{
  "name": "my-awesome-module",
  "dependencies": {
    "browserify": "^7.0.0",
    "concat-stream": "^1.4.7",
    "minimist": "^1.1.0"
  },
  "dev-dependencies": {
    "umd-ify": "^1.0.0"
  },
  "scripts": {
    "build-dependencies": "umdify --dir umd_modules"
  }
}
```

## API

If you want to you can also use `umd-ify` programatically by using its API.

It is pretty straight-forward:

```javascript
var umdify = require('umd-ify')

umdify('/path/to/project', '/path/to/output/dir', function(err) {
  if(err) return console.error(err)

  console.log('Done!')
})
```

## Tests

To execute the tests simply run `npm test`
