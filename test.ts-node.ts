import test from "flug";
import QuickLRU from "quick-lru";

test("import QuickLRU from 'quick-lru'", ({ eq }) => {
  eq(QuickLRU.name, "QuickLRU");
});
