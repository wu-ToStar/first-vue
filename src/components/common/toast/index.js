import Toast from "./Toast";

export default Object;

const obj = {};
obj.install = function(Vue) {
  // Vue.extend(trn)
  const constructor = Vue.extend(Toast);

  const toast = new constructor();

  toast.$mount(document.createElement("div"));

  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};
