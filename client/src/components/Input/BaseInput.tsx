import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import TextField, {
  FilledTextFieldProps,
} from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '34.5rem',
    WebkitTextFillColor: '#8899A6',
    background: '#192734',
    marginBottom: '1rem !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '43ch',
    },
  },
}));
const BaseInput: FC<FilledTextFieldProps> = ({
  label,
  variant,
  type,
  onChange,
  value,
  name,
  placeholder,
  InputProps,
  multiline,
  rows,
  rowsMax,
}) => {
  const classes = useStyles();
  return (
    <TextField
      name={name}
      autoComplete="off"
      className={classes.input}
      label={label}
      variant={variant}
      type={type}
      onChange={onChange}
      value={value}
      InputProps={InputProps}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
    />
  );
};

export default BaseInput;
