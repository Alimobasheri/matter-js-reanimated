"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _withMatter = require("./withMatter");
Object.keys(_withMatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _withMatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _withMatter[key];
    }
  });
});
//# sourceMappingURL=index.js.map