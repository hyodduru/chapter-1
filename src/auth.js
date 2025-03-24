export const AuthStore = {
  isLoggedIn: () => !!localStorage.getItem("user"),
  login: (user) => localStorage.setItem("user", JSON.stringify(user)),
  logout: () => localStorage.removeItem("user"),
  getUser: () => JSON.parse(localStorage.getItem("user")),
};
