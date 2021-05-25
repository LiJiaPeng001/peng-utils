/**
 * 截流函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function throttle(fn = () => {}, time = 300) {
  let firstInvoke = true;
  let timer;
  return throttled;

  function throttled(...args) {
    if (firstInvoke) {
      firstInvoke = false;
      return fn.call(this, ...args);
    }
    if (timer) return;
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, time);
  }
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function debounce(fn = () => {}, time = 300) {
  let timer;
  return debounced;
  function debounced(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, time);
  }
}

export default {
  throttle,
  debounce,
};
