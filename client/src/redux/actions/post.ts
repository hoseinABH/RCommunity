import { Dispatch } from 'redux';
import api from '../../utils/api';
import { ActionTypes } from './types';
import { IUser } from './auth';
import { toast, Slide } from 'react-toastify';

toast.configure();

export interface IComment {
  _id: any;
  user?: IUser;
  text: string;
  name?: string;
  avatar?: string;
  date?: Date;
}
export interface IPost {
  _id: any;
  user: IUser;
  text: string;
  name?: string;
  avatar?: string;
  likes?: any;
  comments?: IComment[] | any;
  date?: Date;
}
export interface getPostsAction {
  type: typeof ActionTypes.getPosts;
  payload: IPost[];
}
export interface getPostAction {
  type: typeof ActionTypes.getPost;
  payload: IPost;
}
export interface postErrorAction {
  type: typeof ActionTypes.postError;
  payload: {};
}
export interface deletePostAction {
  type: typeof ActionTypes.deletePost;
  payload: any;
}
export interface addPostAction {
  type: typeof ActionTypes.addPost;
  payload: IPost;
}
export interface updateLikeAction {
  type: typeof ActionTypes.updateLikes;
  payload: any;
}
export interface addCommentAction {
  type: typeof ActionTypes.addComment;
  payload: IComment;
}
export interface deleteCommentAction {
  type: typeof ActionTypes.deleteComment;
  payload: any;
}
export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('/posts');
    dispatch<getPostsAction>({
      type: ActionTypes.getPosts,
      payload: res.data,
    });
  } catch (err) {
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getPost = (id: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch<getPostAction>({
      type: ActionTypes.getPost,
      payload: res.data,
    });
  } catch (err) {
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post('/posts', formData);
    dispatch<addPostAction>({
      type: ActionTypes.addPost,
      payload: res.data,
    });
    toast.dark('🎉 Post Published', {
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
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/posts/${id}`);
    dispatch<deletePostAction>({
      type: ActionTypes.deletePost,
      payload: id,
    });
    toast.dark('⭕ Post Deleted', {
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
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);
    dispatch<updateLikeAction>({
      type: ActionTypes.updateLikes,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const removeLike = (id: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);
    dispatch<updateLikeAction>({
      type: ActionTypes.updateLikes,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postId: any, formData: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);
    dispatch<addCommentAction>({
      type: ActionTypes.addComment,
      payload: res.data,
    });
    toast.dark('🗨 Comment added', {
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
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteComment = (postId: any, commentId: any) => async (
  dispatch: Dispatch
) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch<deleteCommentAction>({
      type: ActionTypes.deleteComment,
      payload: commentId,
    });
    toast.dark('❌💬 Comment deleted', {
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
    dispatch<postErrorAction>({
      type: ActionTypes.postError,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
