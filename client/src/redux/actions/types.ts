import {
  registerSuccessAction,
  registerFailAction,
  authErrorAction,
  loadUserAction,
  loginSuccessAction,
  loginFailAction,
  logoutAction,
  clearProfileAction,
} from './auth';
import {
  getCurrentProfileAction,
  getProfilesAction,
  getProfileByIdAction,
  profileErrorAction,
  deleteAccountAction,
} from './profile';
import {
  getPostsAction,
  getPostAction,
  postErrorAction,
  addPostAction,
  deletePostAction,
  updateLikeAction,
  addCommentAction,
  deleteCommentAction,
} from './post';
export enum ActionTypes {
  registerSuccess,
  registerFail,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
  logout,
  getCurrentProfile,
  getProfiles,
  getProfileById,
  clearProfile,
  profileError,
  accountDeleted,
  getPosts,
  getPost,
  addPost,
  deletePost,
  updateLikes,
  postError,
  addComment,
  deleteComment,
}
export type AuthActions =
  | registerSuccessAction
  | registerFailAction
  | authErrorAction
  | loadUserAction
  | loginSuccessAction
  | loginFailAction
  | logoutAction
  | deleteAccountAction;

export type ProfileActions =
  | getCurrentProfileAction
  | profileErrorAction
  | clearProfileAction
  | getProfilesAction
  | getProfileByIdAction;

export type PostActions =
  | getPostsAction
  | getPostAction
  | postErrorAction
  | addPostAction
  | deletePostAction
  | updateLikeAction
  | addCommentAction
  | deleteCommentAction;
