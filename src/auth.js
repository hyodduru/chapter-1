export const AuthStore = {
  user: null,
  listeners: new Set(),

  init() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  },

  setUser(newUser) {
    this.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));

    this.notify();
  },

  logout() {
    this.user = null;
    localStorage.removeItem("user");

    this.notify();
  },

  getUser() {
    return this.user;
  },

  isLoggedIn() {
    return !!this.user;
  },

  subscribe(cb) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  },

  notify() {
    for (const cb of this.listeners) {
      cb(this.user);
    }
  },
};
