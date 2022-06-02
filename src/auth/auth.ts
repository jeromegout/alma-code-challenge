const fakeAuthProvider = {
  isAuthenticated: false,
  login(callback: () => void) {
    fakeAuthProvider.isAuthenticated = true;
    // in order to simulate API call add some delay
    setTimeout(callback, 100);
  },
  logout(callback: () => void) {
    fakeAuthProvider.isAuthenticated = false;
    // in order to simulate API call add some delay
    setTimeout(callback, 100);
  },
};

export default fakeAuthProvider;
