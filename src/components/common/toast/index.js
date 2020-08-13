import Toast from './Toast'
const obj = {}
obj.install = function (Vue) {
  console.log(1111);
  console.log(Vue);
  const toastConstructor = Vue.extend(Toast);
  const toast = new toastConstructor();
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj