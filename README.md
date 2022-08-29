:warning: Don't use in Production.  
# require-esm-deasync
> Synchronously Require ES6 Modules in NodeJS.  

# background
I do a lot of test-driven development and I have found that it's generally easier to write tests that can be run with a simple
`node test.js`.  However, if a dependency of a dependency is an ES6 Module, I'll run into a "Error [ERR_REQUIRE_ESM]: require() of ES Module not supported."  I won't convert my module to an ES6 Module, because I want it to simply work in a CJS environment without any additional processing or compilation steps.  I can't use a dynamic import because I don't want to fork a dependency and take on that maintenance burden.  In my case, it was easier to just hack the require function to work with ES6 Modules.

Furthermore, currently my issues are only with development dependencies I use for testing, so this hack doesn't apply to anything in production. 

### how does it work?
Intercepts failing `require(NAME_OF_ES_MODULE)` and calls dynamic import while blocking the thread with deasync.

### why you shouldn't use this in production
This library depends on [deasync](https://www.npmjs.com/package/deasync), which relies on a non-standardized NodeJS API.  In other words, there's no guarantee of stability.  I can also not guarantee the security of this package (or any package really), but especially deasync because it uses C++ and I'm not an expert in C++.

### install
```bash
npm install require-esm-deasync
```

### usage
#### using r flag
```js
// test.js
const lru = require("quick-lru"); // an ES Module

console.log(lru);
[class QuickLRU extends Map]
...
```
```bash
node -r require-esm-deasync test.js
```

#### placing at top of file
```js
// test.js
// place at top of file before requiring an ES Module
require("require-esm-deasync");

const lru = require("quick-lru");
...
```
```bash
node test.js
```