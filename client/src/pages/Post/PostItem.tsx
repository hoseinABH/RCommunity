import React, { FC, useState } from 'react';
import { IPost } from '../../redux/actions/post';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { StoreState } from '../../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { deletePost, addLike, removeLike } from '../../redux/actions/post';
import history from '../../history';
import CommentModal from '../../components/CommentModal/CommentModal';
const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'flex',
    borderBottom: '.001rem solid #253341',
    transition: ' 0.5s',

    '&:hover': {
      cursor: 'pointer',
      background: '#1f2f40',
    },
  },
  name: {
    display: 'inline',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: '#1DA1F2',
    },
  },

  inline: {
    display: 'inline',
  },
  avatar: {
    marginTop: '.4rem',
    height: 38,
    width: 38,
  },
  arrowDown: {
    color: '#8899A6',
    '&:hover': {
      color: '#1DA1F2',
    },
  },
  postContent: {
    overflow: 'hidden',
  },
  like: {
    color: '#E0245E !important',
    '&:hover': {
      color: '#E0245E !important',
    },
  },
  bookmark: {
    color: '#17BF63 !important',
    '&:hover': {
      color: '#17BF63 !important',
    },
  },
}));
interface PostItemProps {
  post: IPost;
  auth: any;
  deletePost: Function;
  addLike: Function;
  removeLike: Function;
  showActions: boolean;
}
const PostItem: FC<PostItemProps> = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  deletePost,
  addLike,
  removeLike,
  showActions,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const usersLike = likes.map((like: any) => like.user);
  const targetUser = usersLike.find((user: any) => user === auth.user._id);
  return (
    <ListItem className={classes.item}>
      <ListItemAvatar style={{ alignSelf: 'flex-start' }}>
        <Avatar
          onClick={() => history.push(`/posts/${_id}`)}
          className={classes.avatar}
          alt={name}
          src={avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography
                component={Link}
                variant="body2"
                to={`/profile/${user}`}
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
                . <Moment format="MMM DD">{date}</Moment>
              </Typography>
            </Box>
            {showActions && (
              <Box>
                {!auth.loading && user === auth.user._id && (
                  <>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      className={classes.arrowDown}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={() => setAnchorEl(null)}
                      PaperProps={{
                        style: {
                          width: '20ch',
                          backgroundColor: '#15202B',
                        },
                      }}
                    >
                      <MenuItem
                        style={{ color: '#E0245E' }}
                        onClick={() => {
                          setAnchorEl(null);
                          setConfirmOpen(true);
                        }}
                      >
                        <DeleteOutlineIcon style={{ marginRight: '.4rem' }} />{' '}
                        delete post
                      </MenuItem>
                    </Menu>
                    <ConfirmDialog
                      title="Delete Account"
                      open={confirmOpen}
                      setOpen={setConfirmOpen}
                      onConfirm={() => deletePost(_id)}
                    >
                      Are you sure you want to delete your post?
                    </ConfirmDialog>
                  </>
                )}
              </Box>
            )}
          </Box>
        }
        secondary={
          <Box display="flex" flexDirection="column">
            <Typography
              component="p"
              variant="body2"
              onClick={() => history.push(`/posts/${_id}`)}
              className={classes.postContent}
            >
              {text}
            </Typography>
            <Box
              mt={2}
              display="flex"
              justifyContent="space-around"
              alignItems="flex-start"
              textAlign="left"
              style={
                !showActions
                  ? { borderTop: '.001rem solid #253341' }
                  : { borderTop: 'none' }
              }
            >
              <span>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  className={classes.arrowDown}
                  disabled={!showActions}
                  onClick={() => setModalOpen(true)}
                >
                  <ChatBubbleOutlineIcon fontSize="small" color="primary" />
                </IconButton>
                <Typography
                  color="textSecondary"
                  component="span"
                  variant="body2"
                >
                  {comments.length > 0 && comments.length}
                </Typography>
                <CommentModal
                  _id={_id}
                  PostText={text}
                  name={name}
                  avatar={avatar}
                  date={date}
                  ModalOpen={ModalOpen}
                  setModalOpen={setModalOpen}
                />
              </span>

              <IconButton
                aria-label="bookmark"
                aria-controls="bookmark"
                aria-haspopup="true"
                onClick={() => setBookmark(!bookmark)}
                className={classes.bookmark}
                disabled={!showActions}
              >
                {bookmark ? (
                  <BookmarkOutlinedIcon fontSize="small" />
                ) : (
                  <BookmarkBorderOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <span>
                <IconButton
                  aria-label="like"
                  aria-controls="like"
                  aria-haspopup="true"
                  className={classes.like}
                  disabled={!showActions}
                >
                  {targetUser ? (
                    <FavoriteIcon
                      onClick={() => removeLike(_id)}
                      fontSize="small"
                      color="secondary"
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      onClick={() => addLike(_id)}
                      fontSize="small"
                      color="secondary"
                    />
                  )}{' '}
                </IconButton>
                <Typography
                  color="textSecondary"
                  component="span"
                  variant="body2"
                >
                  {likes?.length > 0 && likes?.length}
                </Typography>
              </span>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
