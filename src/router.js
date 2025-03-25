export function createRouter(rootElement) {
  const routes = {};
  let currentPath = getHashPath();

  function getHashPath() {
    return window.location.hash.replace(/^#/, "") || "/";
  }

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler(rootElement);
    } else if (routes["404"]) {
      routes["404"](rootElement);
    }
  }

  function handleHashChange() {
    currentPath = getHashPath();
    handleRoute(currentPath);
  }

  function navigateTo(path) {
    window.location.hash = path;
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function start() {
    handleRoute(currentPath);
  }

  window.addEventListener("hashchange", handleHashChange);

  return {
    addRoute,
    navigateTo,
    start,
  };
}
