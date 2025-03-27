import { AuthStore } from "./AuthStore";

export function bindLoginEvent(container, router) {
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
