export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginUserState {
  email: string;
  password: string;
}
