import React, { FC, useState, ChangeEvent, MouseEvent } from 'react';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import BaseButton from '../../components/Button/BaseButton';
import BaseInput from '../../components/Input/BaseInput';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { StoreState } from '../../redux/reducers/rootReducer';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '60vh',
    position: 'relative',
  },
  landingInner: {
    height: '100%',
    width: ' 80%',
    margin: '4rem auto 0',
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
  toast: {
    margin: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 2rem',
    },
  },
}));

interface formDataState {
  name: string;
  email: string;
  password: string;
  confirmedPassowrd: string;
}
interface RegisterProps {
  setAlert: Function;
  register: Function;
  isAuthenticated: boolean;
}
const Register: FC<RegisterProps> = ({ register, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<formDataState>({
    name: '',
    email: '',
    password: '',
    confirmedPassowrd: '',
  });
  const { name, email, password, confirmedPassowrd } = formData;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmedPassowrd) {
      toast.dark("💩 Password does'nt match", {
        position: 'top-right',
        transition: Slide,
        autoClose: 5000,
        className: classes.toast,
        bodyStyle: toastStyle,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        draggablePercent: 45,
      });
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.landingInner}>
        <Typography className={classes.hero} variant="h4" component="h4">
          Create your account
        </Typography>

        <BaseInput
          type="text"
          onChange={onChangeHandler}
          name="name"
          value={name}
          label="Name"
          variant="filled"
        />
        <BaseInput
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={email}
          label="Email"
          variant="filled"
        />
        <BaseInput
          type="password"
          onChange={onChangeHandler}
          name="password"
          value={password}
          label="Passowrd"
          variant="filled"
        />
        <BaseInput
          type="password"
          onChange={onChangeHandler}
          name="confirmedPassowrd"
          value={confirmedPassowrd}
          label="ConfirmPassowrd"
          variant="filled"
        />
        <BaseButton size="large" variant="contained" onClick={onSubmitHandler}>
          Sign up
        </BaseButton>

        <Typography
          variant="body2"
          component={Link}
          color="primary"
          to="/login"
          style={{
            textDecoration: 'none',
            borderBottom: ' 1px dashed currentColor',
          }}
        >
          Already have an account ?
        </Typography>
      </Box>
    </Box>
  );
};
export const toastStyle = {
  margin: '1rem',
} as React.CSSProperties;

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
