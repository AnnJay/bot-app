import { createStore, fork } from "effector";

import { $userState, initialUserState } from "./userStore";

export const $chatList = createStore<any[]>([]);

export const scope = fork({
  values: [
    [$userState, initialUserState],
    [$chatList, []],
  ],
});
