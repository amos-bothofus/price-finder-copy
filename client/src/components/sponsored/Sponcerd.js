import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => {
  return {
    sponceredBy: {
      width: "maxContent",
      position: "fixed",
      right: "15px",
      bottom: "15px",
    },
    sponceredContentCon: {
      marginRight: "20px",
    },
    sponcerdImage: {
      height: "1.5rem",
    },
  };
});
const Sponcerd = () => {
  const classes = useStyles();
  return (
    <div className={classes.sponceredBy}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <img
          className={classes.sponcerdImage}
          src="https://usercontent.one/wp/bothofus.se/wp-content/uploads/2019/06/cropped-bou-logo-3.png"
          alt="sponcerd by BothOfUs"
        />
      </Grid>
    </div>
  );
};

export default Sponcerd;
