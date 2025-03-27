export function createRouter(rootElement, { isHashMode = false } = {}) {
  const routes = {};
  let currentPath = "";

  function getCurrentPath() {
    if (isHashMode) {
      return window.location.hash.replace(/^#/, "") || "/";
    } else {
      return window.location.pathname || "/";
    }
  }

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler(rootElement);
    } else if (routes["404"]) {
      routes["404"](rootElement);
    }
  }

  function handleRouteChange() {
    currentPath = getCurrentPath();
    handleRoute(currentPath);
  }

  function navigateTo(path) {
    if (isHashMode) {
      window.location.hash = path;
    } else {
      history.pushState({}, "", path);
      handleRouteChange();
    }
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function start() {
    currentPath = getCurrentPath();
    handleRoute(currentPath);

    if (isHashMode) {
      window.addEventListener("hashchange", handleRouteChange);
      window.addEventListener("popstate", handleRouteChange);
    } else {
      window.addEventListener("popstate", handleRouteChange);
    }
  }

  return {
    addRoute,
    navigateTo,
    start,
    getCurrentPath,
  };
}
