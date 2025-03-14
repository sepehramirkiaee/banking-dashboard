export interface User {
  id: string;
  name: string;
  email: string;
  token: string; // Authentication token
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}