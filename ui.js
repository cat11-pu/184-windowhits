// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let size = spec.window || 3;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，窗口 " + size + "，门槛 " + spec.min_sum + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { window: size }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.sums.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个窗口";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.hits.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = "和 " + value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "窗口数 " + view.count + "，达标 " + view.hit_count + " 个，最大和 " + view.biggest;
    parts.log.textContent = "窗口 " + size;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "数达标窗口";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "窗口加一";
  moreButton.addEventListener("click", function () {
    size = size + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "窗口减一";
  lessButton.addEventListener("click", function () {
    size = Math.max(1, size - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "窗口大小";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(size);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { size = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看达标个数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { window: size }));
    parts.out.textContent = "达标 " + view.hit_count + " 个，共 " + view.count + " 个窗口";
  });
  parts.controls.appendChild(readButton);

  draw();
}
