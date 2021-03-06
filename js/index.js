import Vue from 'vue';
import App from './App.vue';
import config from '../config.yml';

// source: http://2ality.com/2014/05/current-script.html
const currentScript = document.currentScript || (function() {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
})();

const parse = url => {
  const queries = {};
  const queryString = url.replace(/^[^?]+\??/, '');
  queryString.replace(/\\?([^?=&]+)(=([^&#]*))?/g, (_k, k, _v, v) => {
    queries[k] = v;
  });
  return queries;
};

const { element_id, institution } = parse(currentScript.src);

Vue.prototype.$config = Object.freeze(config.institutions[institution]);

const app = new Vue({
  el: `#${element_id}`,
  render: h => h(App),
  propsData: {
    institution,
  }
});
