import { AuthStore } from "./auth/AuthStore";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { createRouter } from "./router";

function bindLoginEvent(container, router) {
  const loginForm = container.querySelector("#login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.querySelector("input[type='text']").value;

    if (!username) return;

    const userData = {
      username,
      email: "",
      bio: "",
    };

    AuthStore.setUser(userData);
    router.navigateTo("/");
  });
}

function bindProfileEvent(container) {
  const profileForm = container.querySelector("#profile-form");
  if (!profileForm) return;

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = profileForm.querySelector("#username").value;
    const email = profileForm.querySelector("#email").value;
    const bio = profileForm.querySelector("#bio").value;

    if (!username) return;

    const userData = {
      username,
      email,
      bio,
    };

    AuthStore.setUser(userData);

    alert("프로필이 업데이트되었습니다.");
  });
}

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

function initializeApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const router = createRouter(rootElement);

  AuthStore.init();
  AuthStore.subscribe(() => {
    const path = window.location.hash.replace(/^#/, "") || "/";
    router.navigateTo(path);
  });

  router.addRoute("/", (container) => {
    container.innerHTML = MainPage();
  });

  router.addRoute("/login", (container) => {
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

initializeApp();
