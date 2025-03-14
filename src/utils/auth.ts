export const isAuthenticated = () => {
  console.log('checking auth')
  return localStorage.getItem("authToken") !== null; // Temporary authentication check
};