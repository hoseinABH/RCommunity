import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import api from '../../utils/api';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  date?: Date;
}
export interface registerSuccessAction {
  type: typeof ActionTypes.registerSuccess;
  payload: {
    token: string;
  };
}
export interface registerFailAction {
  type: typeof ActionTypes.registerFail;
}
export interface authErrorAction {
  type: typeof ActionTypes.authError;
}
export interface loadUserAction {
  type: typeof ActionTypes.userLoaded;
  payload: {
    token: string;
  };
}
export interface loginSuccessAction {
  type: typeof ActionTypes.loginSuccess;
  payload: {
    token: string;
  };
}
export interface loginFailAction {
  type: typeof ActionTypes.loginFail;
}
export interface logoutAction {
  type: typeof ActionTypes.logout;
}
export interface clearProfileAction {
  type: typeof ActionTypes.clearProfile;
}

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch<loadUserAction>({
      type: ActionTypes.userLoaded,
      payload: res.data,
    });
  } catch (err) {
    dispatch<authErrorAction>({
      type: ActionTypes.authError,
    });
  }
};

export const register = (formData: string[]) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch<registerSuccessAction>({
      type: ActionTypes.registerSuccess,
      payload: res.data,
    });
    dispatch<any>(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) =>
        toast.dark(`💩 ${error.msg}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          transition: Slide,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          draggablePercent: 45,
        })
      );
    }

    dispatch({
      type: ActionTypes.registerFail,
    });
  }
};

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch<loginSuccessAction>({
      type: ActionTypes.loginSuccess,
      payload: res.data,
    });

    dispatch<any>(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) =>
        toast.dark(`💩 ${error.msg}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          transition: Slide,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          draggablePercent: 45,
        })
      );
    }

    dispatch<loginFailAction>({
      type: ActionTypes.loginFail,
    });
  }
};

export const logout = () => ({ type: ActionTypes.logout });
export const clearProfile = () => ({ type: ActionTypes.clearProfile });
