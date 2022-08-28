const test = require("flug");

test("require('quick-lru')", ({ eq }) => {
  const required = require('quick-lru');
  eq(required.name, "QuickLRU");
});
