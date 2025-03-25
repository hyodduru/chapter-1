export function createRouter(rootElement) {
  const routes = {};
  let currentPath = window.location.pathname;

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler(rootElement);
    } else if (routes["404"]) {
      routes["404"](rootElement);
    }
  }

  function handlePopState() {
    currentPath = window.location.pathname;
    handleRoute(currentPath);
  }

  function navigateTo(path) {
    history.pushState(null, "", path);
    currentPath = path;
    handleRoute(path);
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function start() {
    handleRoute(currentPath);
  }

  window.addEventListener("popstate", handlePopState);

  return {
    addRoute,
    navigateTo,
    start,
  };
}
