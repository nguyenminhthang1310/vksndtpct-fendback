// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import FeedbackView from "../page/FeedbackView.vue"; // 👈 đường dẫn tới file bạn gửi

const routes = [
  {
    path: "/", // hoặc "/phan-anh" nếu bạn muốn
    name: "Feedback",
    component: FeedbackView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
