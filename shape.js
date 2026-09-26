// shape.js：读参数并校验（窗口越界或门槛非整数报 E_BAD_WINDOW）
function badWindow(message) {
  const error = new Error(message);
  error.code = "E_BAD_WINDOW";
  return error;
}

export function readShape(spec) {
  const source = spec || {};
  const size = source.window;
  const threshold = source.min_sum;
  const values = Array.isArray(source.values) ? source.values : null;
  if (!Number.isInteger(size) || size < 1 || (values !== null && size > values.length)) {
    throw badWindow("窗口大小必须是一到数值个数之间的整数");
  }
  if (!Number.isInteger(threshold)) {
    throw badWindow("门槛必须是整数");
  }
  return { window: size, min_sum: threshold };
}
