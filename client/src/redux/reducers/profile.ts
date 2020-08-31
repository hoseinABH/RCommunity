import { ProfileActions } from './../actions/types';
import { ActionTypes } from '../actions/types';
import { IProfile } from '../actions/profile';

export interface profileState {
  profile: IProfile | null;
  profiles: IProfile[];
  loading: boolean;
  error: {};
}
const initialState: profileState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};
export default (state = initialState, action: ProfileActions) => {
  switch (action.type) {
    case ActionTypes.getCurrentProfile:
    case ActionTypes.getProfileById:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case ActionTypes.getProfiles:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case ActionTypes.profileError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.clearProfile:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
};
