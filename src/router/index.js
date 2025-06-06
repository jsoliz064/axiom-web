import { createRouter, createWebHistory } from "vue-router";
import ConsultaMesaView from "@/views/ConsultaMesaView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ConsultaMesaView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
