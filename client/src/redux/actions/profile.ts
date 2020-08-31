import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import api from '../../utils/api';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import history from '../../history';
import { clearProfileAction, IUser } from './auth';

toast.configure();

export interface IProfile {
  user: IUser;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubusername?: string;
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  date: Date;
}
export interface getCurrentProfileAction {
  type: typeof ActionTypes.getCurrentProfile;
  payload: IProfile;
}
export interface getProfilesAction {
  type: typeof ActionTypes.getProfiles;
  payload: IProfile[];
}
export interface getProfileByIdAction {
  type: typeof ActionTypes.getProfileById;
  payload: IProfile;
}
export interface profileErrorAction {
  type: typeof ActionTypes.profileError;
  payload: {};
}
export interface deleteAccountAction {
  type: typeof ActionTypes.accountDeleted;
}

export const getCurrentProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('/profile/me');
    dispatch<getCurrentProfileAction>({
      type: ActionTypes.getCurrentProfile,
      payload: res.data,
    });
  } catch (err) {
    dispatch<profileErrorAction>({
      type: ActionTypes.profileError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch: Dispatch) => {
  dispatch<clearProfileAction>({ type: ActionTypes.clearProfile });

  try {
    const res = await api.get('/profile');
    dispatch<getProfilesAction>({
      type: ActionTypes.getProfiles,
      payload: res.data,
    });
  } catch (err) {
    dispatch<profileErrorAction>({
      type: ActionTypes.profileError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfileById = (userId: number | string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    dispatch<getProfileByIdAction>({
      type: ActionTypes.getProfileById,
      payload: res.data,
    });
  } catch (err) {
    dispatch<profileErrorAction>({
      type: ActionTypes.profileError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData: any, edit = false) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await api.post('/profile', formData);
    dispatch<getCurrentProfileAction>({
      type: ActionTypes.getCurrentProfile,
      payload: res.data,
    });
    toast.dark(`🚀 ${edit ? 'Profile Updated ! ' : 'Profile Created !'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      transition: Slide,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      draggablePercent: 45,
    });

    history.push('/dashboard');
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

    dispatch<profileErrorAction>({
      type: ActionTypes.profileError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteAccount = () => async (dispatch: Dispatch) => {
  try {
    await api.delete('/profile');

    dispatch<clearProfileAction>({ type: ActionTypes.clearProfile });
    dispatch<deleteAccountAction>({ type: ActionTypes.accountDeleted });
    toast.dark('💔 Your account has been permanently deleted ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      transition: Slide,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      draggablePercent: 45,
    });
  } catch (err) {
    dispatch<profileErrorAction>({
      type: ActionTypes.profileError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
