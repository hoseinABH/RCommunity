import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      top: '50%',
      left: '50%',
      marginLeft: 'auto',
      marginTop: 'auto',
      position: 'absolute',
    },
    bottom: {
      color: '#173A53',
    },
    top: {
      animationDuration: '1200ms',
      position: 'absolute',
    },
    circle: {
      strokeLinecap: 'round',
    },
  })
);

function FacebookCircularProgress(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={25}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        color="primary"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={25}
        thickness={5}
        value={25}
        {...props}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FacebookCircularProgress />
    </div>
  );
}
