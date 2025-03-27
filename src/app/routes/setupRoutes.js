import { routes } from "./routes";

export function setupRoutes(router) {
  routes.forEach(({ path, guard, redirect, render }) => {
    router.addRoute(path, (container) => {
      if (guard && !guard()) {
        router.navigateTo(redirect);
        return;
      }

      render(container, router);
    });
  });
}
