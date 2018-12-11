import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

if (window.sessionStorage && window.localStorage) {
  //объекты sessionStorage и localtorage поддерживаются
  const products = [
    {
      id: 1,
      name: 'Frozen Yogurt',
      description: 'Description for Frozen Yogurt',
    },
    {
      id: 2,
      name: 'Ice cream sandwich',
      description: 'Description for Ice cream sandwich',
    },
    {
      id: 3,
      name: 'Eclair',
      description: 'Description for Eclair',
    },
    {
      id: 4,
      name: 'Cupcake',
      description: 'Description for Cupcake',
    },
    {
      id: 5,
      name: 'Gingerbread',
      description: 'Description for Gingerbread',
    },
    {
      id: 6,
      name: 'Jelly bean',
      description: 'Description for Jelly bean',
    },
    {
      id: 7,
      name: 'Lollipop',
      description: 'Description for Lollipop',
    },
    {
      id: 8,
      name: 'Honeycomb',
      description: 'Description for Honeycomb',
    },
    {
      id: 9,
      name: 'Donut',
      description: 'Description for Donut',
    },
    {
      id: 10,
      name: 'KitKat',
      description: 'Description for KitKat',
    },
  ];

  if(!localStorage.getItem ('products')) {
    localStorage.setItem ('products', JSON.stringify(products));
  }
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
else {
  const h1 = document.createElement('h1');
  document.body.appendChild(h1);
  h1.innerHTML='Sorry! SessionStorage and LocalStorage objects are not supported in your browser.';
  h1.style='padding:50px;text-align:center'
}
 