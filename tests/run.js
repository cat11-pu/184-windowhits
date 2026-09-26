import assert from "node:assert";
import { readShape } from "../shape.js";
import { windowSums } from "../windows.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readShape returns a window", () => {
  assert.strictEqual(typeof readShape({ window: 2, min_sum: 3 }).window, "number");
});

check("windowSums returns sums", () => {
  assert.ok(Array.isArray(windowSums([1, 2], { window: 1, min_sum: 1 }).sums));
});

check("windowSums returns hits", () => {
  assert.ok(Array.isArray(windowSums([1, 2], { window: 1, min_sum: 1 }).hits));
});

check("render counts windows", () => {
  assert.strictEqual(typeof render({ values: [1], window: 1, min_sum: 1 }).count, "number");
});

check("render exposes hit count", () => {
  assert.strictEqual(typeof render({ values: [1], window: 1, min_sum: 1 }).hit_count, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
