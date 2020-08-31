import { combineReducers } from 'redux';
import auth, { authState } from './auth';
import profile, { profileState } from './profile';
import post, { postState } from './post';
export interface StoreState {
  auth: authState | any;
  profile: profileState;
  post: postState;
}

export const rootReducer = combineReducers<StoreState>({
  auth,
  profile,
  post,
});
