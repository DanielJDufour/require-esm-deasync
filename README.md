:warning: Don't use in Production.  
# reqesm
> Synchronously Require ES6 Modules in NodeJS.  

# background
I do a lot of test driven development, so a lot of my dev dependencies aren't actually used in production.
This is a hacky workaround built on another hacky workaround deasync.

### how does it work?
Intercepts failing `require(NAME_OF_ES_MODULE)` and calls dynamic import while blocking the thread with deasync.

### install
```bash
npm install reqesm
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
node -r reqesm test.js
```

#### placing at top of file
```js
// test.js
// place at top of file before requiring an ES Module
require("reqesm");

const lru = require("quick-lru");
...
```
```bash
node test.js
```
