export const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null; // Temporary authentication check
};

export const signOut = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/auth/login";
};