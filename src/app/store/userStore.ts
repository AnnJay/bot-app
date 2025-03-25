import { createEffect, createEvent, createStore, sample } from "effector";

import { AuthUser, LoginUserState } from "../../shared/types/user.type";
import { axiosInstance } from "../../shared/api/axiosInstance";
import {
  addAuthUserToLocalStorage,
  deleteAuthUserFromLocalStorage,
  getAuthUserFromStorage,
} from "./utils";

interface AuthError {
  message: string;
}

interface UserState {
  user: AuthUser | null;
  error: AuthError | null;
  isAuthChecking: boolean;
}

export const initialUserState: UserState = {
  user: null,
  error: null,
  isAuthChecking: false,
};

export const $userState = createStore<UserState>(initialUserState);

export const loginUser = createEvent<LoginUserState>();
export const logoutUser = createEvent();
export const checkAuth = createEvent();

const loginFx = createEffect<LoginUserState, AuthUser>();
const logoutFx = createEffect<void, void>();
const checkAuthFx = createEffect<void, AuthUser | undefined>();

sample({
  clock: loginUser,
  target: loginFx,
});

sample({
  clock: logoutUser,
  target: logoutFx,
});

sample({
  clock: checkAuth,
  target: checkAuthFx,
});

loginFx.use(async ({ email, password }) => {
  const res = await axiosInstance.post<AuthUser>("/auth/signin", {
    email,
    password,
  });

  if (res) {
    addAuthUserToLocalStorage(res.data);
  }

  return { id: res.data.id, name: res.data.name, email: res.data.email };
});

logoutFx.use(() => {
  deleteAuthUserFromLocalStorage();
});

checkAuthFx.use(() => {
  const authUser = getAuthUserFromStorage();
  if (authUser)
    return { id: authUser.id, name: authUser.name, email: authUser.email };
  else return undefined;
});

$userState
  .on(loginFx.doneData, (state, user) => ({ ...state, user, error: null }))
  .on(loginFx.failData, (state, error) => ({ ...state, error }))

  .on(checkAuthFx, (state) => ({ ...state, isAuthChecking: true }))
  .on(checkAuthFx.doneData, (state, user) => {
    if (user)
      return {
        ...state,
        user,
        error: null,
        isAuthChecking: false,
      };
    else {
      return {
        ...state,
        user: null,
        error: null,
        isAuthChecking: false,
      };
    }
  })
  .on(checkAuthFx.fail, (state) => ({ ...state, isAuthChecking: false }))

  .on(logoutFx.done, (state) => ({
    ...state,
    user: null,
    error: null,
  }));
