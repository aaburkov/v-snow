export const _debounce = function(fn: Function, ms: number) {
  var timer: ReturnType<typeof setTimeout>;
  return function(this: Window | null) {
    clearTimeout(timer);
    var args: any = Array.prototype.slice.call(arguments);
    args.unshift(this);
    timer = setTimeout(fn.bind.apply(fn, args), ms);
  };
};
