import React, { useEffect, FC } from 'react';
import MemberItem from './MemberItem';
import { getProfiles, IProfile } from '../../redux/actions/profile';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers/rootReducer';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';

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
}));
interface membersProps {
  profile: {
    profiles: IProfile[];
  };
  getProfiles: Function;
}
const Members: FC<membersProps> = ({ profile: { profiles }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  let object = [1, 2, 3, 4, 5];

  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography className={classes.hero} variant="h4" component="h1">
        Members
      </Typography>
      <>
        {profiles.length > 0 ? (
          profiles.map((profile: any) => (
            <MemberItem key={profile._id} profile={profile} />
          ))
        ) : (
          <List className={classes.root}>
            {object.map((index: number) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={56}
                    height={56}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ margin: '1rem 0 1rem 1rem' }}
                    />
                  }
                  secondary={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="40%"
                      style={{ margin: '1rem 0 1rem 1rem' }}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </>
    </Box>
  );
};

const mapStateToProps = (state: StoreState) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Members);
