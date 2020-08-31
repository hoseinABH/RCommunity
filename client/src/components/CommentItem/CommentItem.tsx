import React, { FC, useState } from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { connect } from 'react-redux';
import { IComment, deleteComment } from '../../redux/actions/post';
import { StoreState } from '../../redux/reducers/rootReducer';
import { makeStyles, Theme } from '@material-ui/core';
import history from '../../history';
import Moment from 'react-moment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
    width: '100%',
    overflow: 'hidden',
  },
}));

interface CommentItemProps {
  postId: any;
  comment: IComment;
  auth: any;
  deleteComment: Function;
}
const CommentItem: FC<CommentItemProps> = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ListItem className={classes.item}>
      <ListItemAvatar style={{ alignSelf: 'flex-start' }}>
        <Avatar
          onClick={() => history.push(`/profile/${auth.user}`)}
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
                    delete
                  </MenuItem>
                </Menu>
                <ConfirmDialog
                  title="Delete Account"
                  open={confirmOpen}
                  setOpen={setConfirmOpen}
                  onConfirm={() => deleteComment(postId, _id)}
                >
                  Are you sure you want to delete your comment?
                </ConfirmDialog>
              </>
            )}
          </Box>
        }
        secondary={
          <Typography
            component="p"
            variant="body2"
            className={classes.postContent}
          >
            {text}
          </Typography>
        }
      />
    </ListItem>
  );
};

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
