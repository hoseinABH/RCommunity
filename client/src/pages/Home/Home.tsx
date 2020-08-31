import React, { FC } from 'react';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import histoty from '../../history';
import BaseButton from '../../components/Button/BaseButton';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '90vh',
    [theme.breakpoints.down('md')]: {
      height: '60vh',
    },
  },
  hero: {
    fontWeight: 700,
    fontSize: '2.25rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem',
    },
  },

  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: ' 100%',
  },
  landingInner: {
    height: '100%',
    width: ' 80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  Buttons: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface HomeProps {
  isAuthenticated: boolean;
}

const Home: FC<HomeProps> = ({ isAuthenticated }) => {
  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }
  return (
    <Box component="section" className={classes.root}>
      <Box className={classes.darkOverlay}>
        <Box className={classes.landingInner}>
          <Typography className={classes.hero} variant="h4" component="h1">
            See what’s happening in the world right now
          </Typography>
          <Typography variant="body2" component="p">
            Create a profile, share posts and get help from other developers
          </Typography>
          <Box my={5} className={classes.Buttons}>
            <BaseButton
              size="large"
              variant="contained"
              onClick={() => histoty.push('/register')}
            >
              Sign up
            </BaseButton>
            <BaseButton
              size="large"
              variant="outlined"
              onClick={() => histoty.push('/login')}
            >
              Log in
            </BaseButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
