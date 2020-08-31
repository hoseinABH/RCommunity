import { ActionTypes, AuthActions } from '../actions/types';
import { IUser } from '../actions/auth';

export interface authState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: IUser | null;
}
const initialState: authState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action: AuthActions) {
  switch (action.type) {
    case ActionTypes.userLoaded:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case ActionTypes.registerSuccess:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ActionTypes.loginSuccess:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ActionTypes.accountDeleted:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case ActionTypes.authError:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case ActionTypes.logout:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
