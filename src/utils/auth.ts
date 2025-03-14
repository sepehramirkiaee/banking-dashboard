export const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null; // Temporary authentication check
};