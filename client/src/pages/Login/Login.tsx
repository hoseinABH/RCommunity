import React, { FC, useState, ChangeEvent, MouseEvent } from 'react';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import BaseButton from '../../components/Button/BaseButton';
import BaseInput from '../../components/Input/BaseInput';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { StoreState } from '../../redux/reducers/rootReducer';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '80vh',
    position: 'relative',
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

  hero: {
    fontWeight: 700,
    fontSize: '2.2rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem',
    },
  },
  input: {
    width: '34.5rem',
    WebkitTextFillColor: '#8899A6',
    background: '#192734',
    [theme.breakpoints.down('sm')]: {
      width: '20rem',
    },
  },
}));
interface loginProps {
  login: Function;
  isAuthenticated: boolean;
}

const Login: FC<loginProps> = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFormdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.landingInner}>
        <Typography className={classes.hero} variant="h4" component="h4">
          Log in to ReactCommunity
        </Typography>
        <BaseInput
          onChange={onChangeHandler}
          name="email"
          type="email"
          label="Email"
          variant="filled"
          value={email}
        />
        <BaseInput
          name="password"
          onChange={onChangeHandler}
          type="password"
          label="Password"
          variant="filled"
          value={password}
        />
        <BaseButton
          type="submit"
          size="large"
          variant="contained"
          onClick={onSubmitHandler}
        >
          Log in
        </BaseButton>
        <Typography
          variant="body2"
          component={Link}
          color="primary"
          to="/register"
          style={{
            textDecoration: 'none',
            borderBottom: ' 1px dashed currentColor',
          }}
        >
          Sign up for ReactCommunity
        </Typography>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
