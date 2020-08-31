import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profile';
import { StoreState } from '../../redux/reducers/rootReducer';
import Spinner from '../../components/Spinner/Spinner';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { makeStyles, Theme } from '@material-ui/core';
import histoty from '../../history';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { profileState } from '../../redux/reducers/profile';
import { IUser } from '../../redux/actions/auth';

interface DashboardProps {
  getCurrentProfile: Function;
  deleteAccount: Function;
  profile: profileState;
  auth: {
    user: IUser;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    fontWeight: 700,
    background: 'linear-gradient(90deg, #8338ec, #3a86ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '.5rem 1rem',
  },
  avatar: {
    margin: '1rem auto',
    height: 125,
    width: 125,
    [theme.breakpoints.down('sm')]: {},
  },
}));

const Dashboard: FC<DashboardProps> = ({
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading },
  auth: { user },
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      my={10}
    >
      <Typography className={classes.hero} variant="h5" component="h1">
        Dashboard
      </Typography>

      <Avatar
        className={classes.avatar}
        alt={user && user.name}
        src={user && user.avatar}
      />

      <Box display="flex">
        <Typography variant="h6">Welcome </Typography>
        <Typography
          style={{ fontWeight: 700, padding: '0 .5rem' }}
          variant="h6"
          color="primary"
        >
          {' '}
          {user && user.name}
        </Typography>
      </Box>
      {profile !== null ? (
        <Box display="flex" flexDirection="column">
          <Button
            onClick={() => histoty.push('/edit-profile')}
            color="primary"
            variant="outlined"
            style={{ margin: '1rem auto' }}
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => setConfirmOpen(true)}
            color="secondary"
            variant="outlined"
            style={{ margin: 'auto', color: '#E0245E' }}
          >
            Delete my account
          </Button>
          <ConfirmDialog
            title="Delete Account"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => deleteAccount()}
          >
            Are you sure you want to delete your account?
          </ConfirmDialog>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography
            style={{ margin: '1.5rem auto' }}
            variant="body2"
            component="p"
          >
            You have not yet setup a profile, please add some info.
          </Typography>
          <Button
            onClick={() => histoty.push('/create-profile')}
            color="primary"
            variant="contained"
            style={{ color: 'white' }}
          >
            Create Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};
const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
