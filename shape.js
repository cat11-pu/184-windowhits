// shape.js：读参数并校验
// 窗口大小必须是 1..数值个数 之间的整数，门槛必须是整数，否则抛 E_BAD_WINDOW。
// 不传 values 时只校验“正整数”这一半（供只关心参数形状的调用方使用）。
export function readShape(spec) {
  spec = spec || {};
  const window = spec.window;
  const min_sum = spec.min_sum;

  const windowIsInt = typeof window === "number" && Number.isInteger(window);
  const values = spec.values;
  const hasCount = Array.isArray(values) || typeof values === "number";
  const count = Array.isArray(values) ? values.length : (typeof values === "number" ? values : null);

  const windowOk = windowIsInt && window >= 1 &&
    (!hasCount || window <= count);
  const thresholdOk = typeof min_sum === "number" && Number.isInteger(min_sum);

  if (!windowOk || !thresholdOk) {
    const error = new Error("窗口大小或门槛不合法");
    error.code = "E_BAD_WINDOW";
    throw error;
  }

  return { window: window, min_sum: min_sum };
}
