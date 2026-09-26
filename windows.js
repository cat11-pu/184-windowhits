// windows.js：滑动求和（步长为一，进一出加一，不重算区间和）
import { readShape } from "./shape.js";

export function windowSums(values, spec) {
  const shape = readShape(Object.assign({}, spec, { values: values }));
  const size = shape.window;
  const threshold = shape.min_sum;
  const sums = [];
  const hits = [];
  let current = 0;
  for (let spot = 0; spot < size; spot += 1) {
    current += values[spot];
  }
  let biggest = current;
  for (let start = 0; start + size <= values.length; start += 1) {
    if (start > 0) {
      current += values[start + size - 1] - values[start - 1];
    }
    sums.push(current);
    if (current >= threshold) {
      hits.push(start);
    }
    if (current > biggest) {
      biggest = current;
    }
  }
  return { sums: sums, hits: hits, biggest: biggest };
}
