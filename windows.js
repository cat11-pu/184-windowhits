// windows.js：滑动求和
// 窗口沿序列逐格滑动（步长为一）。首个窗口直接累加，之后每滑一格
// 采用“进一出加一”：减去离开窗口的值、加上进入窗口的值，不重算整段区间和。
import { readShape } from "./shape.js";

export function windowSums(values, spec) {
  const list = values || [];
  spec = spec || {};
  // 越界或非整数参数在这里统一抛 E_BAD_WINDOW。
  const shape = readShape(Object.assign({}, spec, { values: list }));
  const window = shape.window;
  const min_sum = shape.min_sum;

  const sums = [];
  const hits = [];

  const count = list.length - window + 1;
  let total = 0;
  for (let i = 0; i < window; i += 1) total += list[i];
  sums.push(total);
  let biggest = total;
  if (total >= min_sum) hits.push(0);

  for (let start = 1; start < count; start += 1) {
    total += list[start + window - 1] - list[start - 1];
    sums.push(total);
    if (total > biggest) biggest = total;
    if (total >= min_sum) hits.push(start);
  }

  return { sums: sums, hits: hits, biggest: biggest };
}
