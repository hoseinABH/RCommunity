import React, { FC, useEffect } from 'react';
import PostItem from './PostItem';
import { StoreState } from '../../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/post';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import CommentItem from '../../components/CommentItem/CommentItem';

const useStyles = makeStyles((theme: Theme) => ({
  postContainer: {
    width: '100%',
    maxWidth: '34.5rem',
    borderTop: '.78rem solid #253341',
    border: '.001rem solid #253341',
    borderBottom: 'none',
    listStyle: 'none',
    marginTop: '2rem',

    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
  commentsContainer: {
    width: '100%',
    maxWidth: '34.5rem',
    textAlign: 'center',
  },
}));
interface PostProps {
  getPost: Function;
  post: any;
}
const SinglePost: FC<PostProps> = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  const classes = useStyles();
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box className={classes.postContainer}>
        <PostItem post={post} showActions={false} />
      </Box>
      <Box className={classes.commentsContainer} mt={3}>
        {post.comments.length > 0 ? (
          post.comments.map((comment: any) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))
        ) : (
          <Typography variant="body2" component="p">
            No Comment
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: StoreState) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(SinglePost);
