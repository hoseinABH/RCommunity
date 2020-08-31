import { IPost } from './../actions/post';
import { ActionTypes, PostActions } from '../actions/types';

export interface postState {
  posts: IPost[];
  post: any;
  loading: boolean;
  error: {};
}
const initialState: postState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action: PostActions) => {
  switch (action.type) {
    case ActionTypes.getPosts:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ActionTypes.getPost:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ActionTypes.postError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.addPost:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case ActionTypes.deletePost:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case ActionTypes.updateLikes:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case ActionTypes.addComment:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case ActionTypes.deleteComment:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment: any) => comment._id !== action.payload
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
};
