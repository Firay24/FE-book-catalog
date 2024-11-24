export interface UserState {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: (token: string) => Promise<void>;
}
