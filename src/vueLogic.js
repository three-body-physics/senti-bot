import Vue from "vue";
import vueSocket from "vue-socket.io";
import App from "./components/App.vue";

export const ioConnection = io.connect('localhost:3000');

Vue.use(vueSocket, ioConnection);

new Vue({
  el: "#app",
  render: h => h(App)
});
