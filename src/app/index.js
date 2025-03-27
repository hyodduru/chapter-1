import { authStore } from "../features/auth";
import { setupNavigationClickEvents } from "./navigationEvents";
import { createRouter, setupRoutes } from "./routes";

export function initializeApp(isHashMode = false) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const router = createRouter(rootElement, { isHashMode });

  authStore.init();
  authStore.subscribe(() => {
    router.start();
  });

  setupRoutes(router);
  setupNavigationClickEvents(router);
  router.start();
}
