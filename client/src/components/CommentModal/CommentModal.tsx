import React, { FC, useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { TransitionProps } from '@material-ui/core/transitions';
import { StoreState } from '../../redux/reducers/rootReducer';
import BaseInput from '../Input/BaseInput';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import Moment from 'react-moment';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { addComment, getPost } from '../../redux/actions/post';
const useStyles = makeStyles((theme: Theme) => ({
  Commentavatar: {
    marginTop: '1rem',
    height: 50,
    width: 50,
  },
  Postavatar: {
    marginTop: '1rem',
    height: 50,
    width: 50,
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
    padding: '.5rem 1rem',
    margin: '0rem .8rem .5rem 0',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  submitSm: {
    alignSelf: 'flex-end',
    maxWidth: '100px',
    color: 'white',
    fontWeight: 700,
    padding: '.5rem 1rem',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  input: {
    width: '36rem',
    maxWidth: '42ch',
    paddingBottom: '5rem',
  },
  item: {
    display: 'flex',
    '&:hover': {
      cursor: 'auto',
    },
  },

  name: {
    display: 'inline',
    color: 'white',
  },

  inline: {
    display: 'inline',
  },

  postContent: {
    overflow: 'hidden',
    color: 'white',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BaseModalProps {
  ModalOpen: boolean;
  setModalOpen: Function;
  addComment: Function;
  auth: any;
  _id: any;
  PostText: any;
  name: any;
  avatar: any;
  date: any;
}

const CommentModal: FC<BaseModalProps> = ({
  ModalOpen,
  setModalOpen,
  auth,
  _id,
  PostText,
  name,
  avatar,
  date,
  addComment,
}) => {
  const classes = useStyles();
  const [text, setText] = useState<string>('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onClickHandler = () => {
    addComment(_id, { text });
    setText('');
    setModalOpen(false);
    console.log(_id);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      open={ModalOpen}
      PaperProps={{
        style: {
          backgroundColor: '#15202B',
        },
      }}
      onClose={() => setModalOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={() => setModalOpen(false)}
          >
            <CloseIcon color="primary" />
          </IconButton>
          <Button
            className={classes.submitSm}
            type="submit"
            color="primary"
            variant="contained"
            disabled={text.length > 0 ? false : true}
            onClick={onClickHandler}
          >
            Reply
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <ListItem className={classes.item}>
            <ListItemAvatar style={{ alignSelf: 'flex-start' }}>
              <Avatar className={classes.Postavatar} alt={name} src={avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography
                      variant="body2"
                      className={classes.name}
                      style={{ fontWeight: 650, paddingRight: '.25rem' }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      @{name} . <Moment format="MMM DD">{date}</Moment>
                    </Typography>
                  </Box>
                </Box>
              }
              secondary={
                <Box display="flex" flexDirection="column">
                  <Typography
                    component="p"
                    variant="body2"
                    className={classes.postContent}
                  >
                    {PostText}
                  </Typography>
                  <Box mt={1} display="flex">
                    <Typography component="p" variant="body2">
                      Replying to
                    </Typography>
                    <Typography
                      component={Link}
                      variant="body2"
                      color="primary"
                      style={{ textDecoration: 'none', marginLeft: '.5rem' }}
                      to={`/profile/${auth.user}`}
                    >
                      @{name}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </DialogContentText>
        <BaseInput
          name="text"
          onChange={(e) => setText(e.target.value)}
          type="text"
          variant="filled"
          value={text}
          placeholder="Put your comment ..."
          multiline
          rows={6}
          rowsMax={10}
          InputProps={{
            startAdornment: (
              <InputAdornment
                style={{ alignSelf: 'flex-start' }}
                position="start"
              >
                <Avatar
                  className={classes.Commentavatar}
                  alt={auth.user && auth.user.name}
                  src={auth.user && auth.user.avatar}
                />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.submit}
          type="submit"
          color="primary"
          variant="contained"
          disabled={text.length > 0 ? false : true}
          onClick={onClickHandler}
        >
          Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addComment, getPost })(CommentModal);
