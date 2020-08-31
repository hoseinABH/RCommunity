import React, { FC, useState, MouseEvent } from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Button from '@material-ui/core/Button/Button';
import BaseInput from '../../components/Input/BaseInput';
import { IUser } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core';
import { StoreState } from '../../redux/reducers/rootReducer';
import { addPost } from '../../redux/actions/post';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginBottom: '1rem',
    height: 50,
    width: 50,
    [theme.breakpoints.down('sm')]: {},
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  submit: {
    display: 'flex',
    alignSelf: 'flex-end',
    maxWidth: '100px',
    color: 'white',
    fontWeight: 700,
    padding: '.6rem 1rem',
    marginRight: '1rem',
  },
}));
interface PostFormProps {
  auth: {
    user: IUser;
  };
  addPost: Function;
}
const PostForm: FC<PostFormProps> = ({ auth: { user }, addPost }) => {
  const [text, setText] = useState<string>('');

  const onSubmitHandler = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length > 0) {
      addPost({ text });
      setText('');
    } else {
    }
  };
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <BaseInput
        name="text"
        onChange={(e) => setText(e.target.value)}
        type="text"
        variant="filled"
        value={text}
        placeholder="What's happening"
        multiline
        rows={2}
        rowsMax={6}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar
                className={classes.avatar}
                alt={user && user.name}
                src={user && user.avatar}
              />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={classes.submit}
        type="submit"
        color="primary"
        variant="contained"
        disabled={text.length > 0 ? false : true}
      >
        Submit
      </Button>
    </form>
  );
};
const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
