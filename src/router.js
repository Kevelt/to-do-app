import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/:filter?",
      name: "filter",
      component: () => import("./components/ToDo"),
    },
  ]
});
