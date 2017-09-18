import Vue from "vue";
import vueSocket from "vue-socket.io";
import App from "./components/App.vue";

export const ioConnection = io();

Vue.use(vueSocket, ioConnection);

new Vue({
  el: "#main",
  render: h => h(App)
});
