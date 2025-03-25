import { AuthUser } from "../../shared/types/user.type";

const AUTH_USER_DATA = "auth_user";

export const getAuthUserFromStorage = (): AuthUser | undefined => {
  const data = localStorage.getItem(AUTH_USER_DATA);

  if (data) return JSON.parse(data) as AuthUser;
};

export const addAuthUserToLocalStorage = (user: AuthUser) => {
  localStorage.setItem(AUTH_USER_DATA, JSON.stringify(user));
};

export const deleteAuthUserFromLocalStorage = () => {
  localStorage.removeItem(AUTH_USER_DATA);
};
