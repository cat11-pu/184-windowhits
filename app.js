// app.js：渲染结果
import { readShape } from "./shape.js";
import { windowSums } from "./windows.js";

export function render(spec) {
  const values = spec.values || [];
  const shape = readShape(spec);
  const view = windowSums(values, spec);
  const sums = view.sums || [];
  const hits = view.hits || [];
  return { sums: sums, hits: hits, count: sums.length, hit_count: hits.length,
           biggest: view.biggest || 0, window: shape.window, value_count: values.length };
}
