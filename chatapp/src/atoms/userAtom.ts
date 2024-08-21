import { atom } from 'recoil';

interface UserState {
  userId: string | null;
  username: string | null;
  token: string | null;
}

export const userState = atom<UserState>({
  key: 'userState', // Unique ID (with respect to other atoms/selectors)
  default: {
    userId: null,
    username: null,
    token: null,
  }, // Default value (aka initial value)
});