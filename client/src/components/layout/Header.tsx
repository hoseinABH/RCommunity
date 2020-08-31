import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List/List';
import { makeStyles, Theme } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { StoreState } from '../../redux/reducers/rootReducer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    backgroundImage: 'linear-gradient(90deg, #8338ec, #3a86ff)',
    backgroundSize: '100vw 10px',
    backgroundRepeat: ' no-repeat',
    paddingTop: '10px',
    boxShadow: ' 0 0 20px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    padding: '1rem 2rem',
    fontSize: '16px',
    display: 'block',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'all 0.5s ease',
    '&:hover ,&:focus': {
      color: '#fff',
    },
  },
  navbar: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    height: 'auto',
    paddingRight: '5rem',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  authNavbar: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    left: 'auto',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    paddingRight: '5rem',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0rem',
      display: 'none',
    },
  },
  navbarOverlay: {
    backgroundImage: 'linear-gradient(90deg, #8338ec, #3a86ff)',
    backgroundSize: '100vw 10px',
    backgroundRepeat: 'no-repeat',
    margin: 0,
    padding: 0,
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#15202B',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  navItem: {
    textDecoration: 'none',
    fontWeight: 700,
    display: 'block',
    padding: ' 0 1.5rem 0',
    color: '#eeee',
    transition: ' all 0.3s ease',
    '&:hover ,&:focus': {
      color: '#1DA1F2',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1rem',
    },
  },
  navButton: {
    WebkitAppearance: 'none',
    fontSize: '14px',
    fontWeight: 700,
    marginRight: '1.5rem',
    display: 'none',
    color: '#fff',
    borderRadius: '3px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    '&:hover': {
      color: '#fff',
      boxShadow: ' 0 8px 25px -8px #1DA1F2 !important',
    },
  },
  logout: {
    fontWeight: 700,
    color: '#E0245E',
    padding: '.4rem .8rem ',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoutSm: {
    textDecoration: 'none',
    fontWeight: 700,
    padding: ' 0 1.5rem 0',
    display: 'none',
    cursor: 'pointer',
    transition: ' all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1rem',
      display: 'block',
    },
  },
}));

interface HeaderProps {
  logout: typeof logout;
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
  };
}

const Header: FC<HeaderProps> = ({
  logout,
  auth: { isAuthenticated, loading },
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const authHeader = (
    <>
      <List className={open ? classes.navbarOverlay : classes.authNavbar}>
        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/members"
        >
          Members
        </Link>
        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/posts"
        >
          Posts
        </Link>
        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Typography
          color="secondary"
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className={classes.logoutSm}
        >
          Logout
        </Typography>
        <Button
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className={classes.logout}
          variant="outlined"
          color="secondary"
        >
          <ExitToAppIcon /> Logout
        </Button>
      </List>
      <Button
        onClick={() => setOpen(!open)}
        style={open ? openStyle : undefined}
        className={classes.navButton}
        variant="outlined"
        color="primary"
      >
        {open ? 'Close' : 'Menu'}
      </Button>
    </>
  );
  const guestHeader = (
    <>
      <List className={open ? classes.navbarOverlay : classes.navbar}>
        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/members"
        >
          Members
        </Link>
        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/register"
        >
          Register
        </Link>

        <Link
          onClick={() => setOpen(false)}
          className={classes.navItem}
          to="/login"
        >
          Login
        </Link>
      </List>

      <Button
        onClick={() => setOpen(!open)}
        style={open ? openStyle : undefined}
        className={classes.navButton}
        variant="outlined"
        color="primary"
      >
        {open ? 'Close' : 'Menu'}
      </Button>
    </>
  );
  return (
    <Box className={classes.header}>
      <Typography
        color="primary"
        to="/"
        component={Link}
        className={classes.logo}
      >
        ReactCommunity
      </Typography>
      {!loading && <>{isAuthenticated ? authHeader : guestHeader}</>}
    </Box>
  );
};
const openStyle = {
  position: 'fixed',
  display: 'block',
  zIndex: 1001,
  top: '1.5rem',
  right: 0,
  boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
} as React.CSSProperties;

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header);
