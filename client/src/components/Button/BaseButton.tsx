import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  BaseButton: {
    marginBottom: '1rem',
    width: '35rem',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '20.5rem',
    },
  },
}));

const BaseButton: FC<ButtonProps> = ({ size, variant, onClick, children }) => {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      color="primary"
      size={size}
      onClick={onClick}
      className={classes.BaseButton}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
