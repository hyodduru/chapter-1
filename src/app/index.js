import LoginPage, { AuthStore, bindLoginEvent } from "../features/auth";
import ErrorPage from "../features/error/ErrorPage";
import MainPage from "../features/main";
import ProfilePage, { bindProfileEvent } from "../features/profile";
import { createRouter } from "./routes";

function handleNavigationClick(router) {
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("/")) {
        e.preventDefault();

        if (e.target.id === "logout") {
          AuthStore.logout();
        }

        router.navigateTo(href);
      }
    }
  });
}

export function initializeApp(isHashMode = false) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const router = createRouter(rootElement, { isHashMode });

  AuthStore.init();
  AuthStore.subscribe(() => {
    router.start();
  });
  router.addRoute("/", (container) => {
    container.innerHTML = MainPage();
  });

  router.addRoute("/login", (container) => {
    if (AuthStore.isLoggedIn()) {
      router.navigateTo("/");
      return;
    }

    container.innerHTML = LoginPage();
    bindLoginEvent(container, router);
  });

  router.addRoute("/profile", (container) => {
    if (!AuthStore.isLoggedIn()) {
      router.navigateTo("/login");
      return;
    }
    container.innerHTML = ProfilePage("/profile");
    bindProfileEvent(container);
  });

  router.addRoute("404", (container) => {
    container.innerHTML = ErrorPage();
  });

  handleNavigationClick(router);
  router.start();
}
