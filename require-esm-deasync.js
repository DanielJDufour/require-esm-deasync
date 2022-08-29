const Module = require("module");
const deasync = require("deasync");

const __require__ = Module.prototype.require;

Module.prototype.require = function () {
  try {
    return __require__.apply(this, arguments);
  } catch (error) {
    if (error.message.includes("require() of ES Module")) {
      let result;
      const module_name = arguments[0];
      import(module_name).then((mod) => {
        if (typeof mod.default === "function") {
          result = mod.default;
        } else {
          result = {};
          console.warn(
            "[require-esm-deasync] failed to find default function for " +
              module_name
          );
        }
      });
      while (result === undefined) {
        deasync.runLoopOnce();
      }
      console.warn(
        "[require-esm-deasync] synchronously imported " + module_name
      );
      return result;
    } else {
      throw error;
    }
  }
};
