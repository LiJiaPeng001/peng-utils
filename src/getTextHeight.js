let instance;

function pxToNumber(value) {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}

export function styleToString(style) {
  const styleNames = Array.prototype.slice.apply(style);
  return styleNames
    .map((name) => `${name}: ${style.getPropertyValue(name)};`)
    .join("");
}

export default (file, rows = 5) => {
  if (!instance) {
    instance = document.createElement("div");
    instance.setAttribute("aria-hidden", "true");
    document.body.appendChild(instance);
  }
  let child = file.cloneNode(true);
  instance.appendChild(child);

  // 获取元素的style属性
  const originStyle = window.getComputedStyle(file);
  const originCSS = styleToString(originStyle);
  const lineHeight = pxToNumber(originStyle.lineHeight);
  // set style
  instance.setAttribute("style", originCSS);
  instance.style.position = "fixed";
  instance.style.top = "-999px";
  instance.style.left = "-999px";

  // clean up css overflow
  instance.style.display = "block";
  instance.style.oveflow = "visible";
  instance.style.textOverflow = "clip";
  instance.style.webkitLineClamp = "none";

  const maxHeight = Math.round(lineHeight * rows);
  const offsetHeight = child.offsetHeight;

  instance.removeChild(child);
  return offsetHeight > maxHeight;
};
