/* eslint-env node */
// The main file that is included when you run `require("fluid-gamepad-orchestra")`.
"use strict";
var fluid = require("infusion");

// Register our content so it can be used with calls like fluid.module.resolvePath("%fluid-gamepad-orchestra/path/to/content.js");
fluid.module.register("fluid-gamepad-orchestra", __dirname, require);
