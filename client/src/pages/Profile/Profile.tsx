import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../redux/actions/profile';
import { StoreState } from '../../redux/reducers/rootReducer';
import Button from '@material-ui/core/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import histoty from '../../history';
import Box from '@material-ui/core/Box/Box';
import ProfileHero from './ProfileHero';
import ProfileTabs from './ProfileTabs';
import { IUser } from '../../redux/actions/auth';
interface ProfileProps {
  getProfileById: Function;
  profile: {
    profile: any;
  };
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
    user: IUser;
  };
}

const Profile: FC<ProfileProps> = ({
  getProfileById,
  profile: { profile },
  auth: { isAuthenticated, loading, user },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={10}
    >
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <ProfileHero profile={profile} />
          {isAuthenticated &&
            loading === false &&
            user._id === profile.user._id && (
              <Button
                color="primary"
                variant="outlined"
                onClick={() => histoty.push('/edit-profile')}
              >
                Edit profile
              </Button>
            )}
          <ProfileTabs id={id} profile={profile} />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state: StoreState) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
