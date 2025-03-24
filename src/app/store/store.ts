import { createStore, fork } from "effector";

export const $user = createStore<{ name: string } | null>(null);

export const $chatList = createStore<any[]>([]);

export const scope = fork({
  values: [
    [$user, null],
    [$chatList, []],
  ],
});
