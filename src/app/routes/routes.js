import LoginPage, { bindLoginEvent, authStore } from "../../features/auth";
import ProfilePage, { bindProfileEvent } from "../../features/profile";
import MainPage from "../../features/main";
import ErrorPage from "../../features/error";

export const routes = [
  {
    path: "/",
    render: (container) => {
      container.innerHTML = MainPage();
    },
  },
  {
    path: "/login",
    guard: () => !authStore.isLoggedIn(),
    redirect: "/",
    render: (container, router) => {
      container.innerHTML = LoginPage();
      bindLoginEvent(container, router);
    },
  },
  {
    path: "/profile",
    guard: () => authStore.isLoggedIn(),
    redirect: "/login",
    render: (container) => {
      container.innerHTML = ProfilePage("/profile");
      bindProfileEvent(container);
    },
  },
  {
    path: "404",
    render: (container) => {
      container.innerHTML = ErrorPage();
    },
  },
];
