import { makeStyles } from '@material-ui/core'

import React from 'react'

const useStyles = makeStyles(() => {
  return {
    btn: {
      fontFamily: 'Lato, sans-serif !important',
      backgroundColor:' #2a1da1',
      borderRadius: '50px',
      padding: '12px 28px 12px 28px ',
      display: 'flex',
      alignItems: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      color: '#fff',
      border: 'none',
      "&:hover": {
        cursor: "pointer"
      }
    }
  };
});
const BothOfUsBtn = (props) => {
  const { text } = props;
  const classes = useStyles();
  return (
      <button {...props} className={classes.btn}>
        {text}
      </button>
  );
};

export default BothOfUsBtn;
