import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import Avatar from '@material-ui/core/Avatar/Avatar';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import history from '../../history';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '80ch',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '50ch',
    },
  },
  viewProfileSm: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  viewProfileMd: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  inline: {
    display: 'inline',
  },
  hero: {
    fontWeight: 700,
    background: 'linear-gradient(90deg, #8338ec, #3a86ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '3rem auto 1rem',
  },
  avatar: {
    margin: 'auto 1rem',
    height: 56,
    width: 56,
  },
}));

const MemberItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
  },
}: any) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar} alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {status} at {company && company}
              </Typography>

              <Typography
                className={classes.viewProfileSm}
                component={Link}
                to={`/profile/${_id}`}
                style={{
                  textDecoration: 'none',
                }}
                color="primary"
              >
                view profile
              </Typography>
              <ListItemSecondaryAction className={classes.viewProfileMd}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => history.push(`/profile/${_id}`)}
                >
                  view profile
                </Button>
              </ListItemSecondaryAction>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default MemberItem;
