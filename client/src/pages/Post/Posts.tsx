import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers/rootReducer';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import { getPosts, IPost } from '../../redux/actions/post';
import PostForm from './PostForm';
import PostItem from './PostItem';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
const useStyles = makeStyles((theme: Theme) => ({
  postList: {
    width: '100%',
    maxWidth: '34.5rem',
    borderTop: '.78rem solid #253341',
    border: '.001rem solid #253341',
    borderBottom: 'none',
    listStyle: 'none',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '43ch',
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
    margin: '1rem',
  },
}));

interface PostsProps {
  post: {
    posts: IPost[];
    loading: boolean;
  };
  getPosts: Function;
}
const Posts: FC<PostsProps> = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const classes = useStyles();
  let object = [1, 2, 3, 4, 5];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={2}
    >
      <Typography className={classes.hero} variant="h4" component="h1">
        YourFeed
      </Typography>
      <span style={{ border: '.001rem solid #253341', borderBottom: 'none' }}>
        <PostForm />
        <Box my={5} className={classes.postList}>
          {loading ? (
            <>
              {object.map((index: number) => (
                <ListItem key={index}>
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
                        width="40%"
                        style={{ margin: '1rem 0 1rem 1rem' }}
                      />
                    }
                    secondary={
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ margin: '1rem 0 1rem 1rem' }}
                      />
                    }
                  />
                </ListItem>
              ))}
            </>
          ) : (
            posts.map((post) => (
              <PostItem showActions={true} key={post._id} post={post} />
            ))
          )}
        </Box>
      </span>
    </Box>
  );
};
const mapStateToProps = (state: StoreState) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
