import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Pattern from '../../assets/images/pattern.svg'
import { makeStyles } from '@material-ui/core'
import '../../assets/css/totalCal.css'
import OptionsCon from '../optionsCon/OptionsCon'

const useStyles = makeStyles((theme) => {
  return {
    totalPricePage: {
      backgroundImage: `url(${Pattern})`,
      backgroundSize:  'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
    },
    meetingBtn: {
      fontFamily: "Lato, sans-serif",
      fontWeight: 700,
      padding: "1em 3em",
      border: 0,
      borderRadius: "5px",
      backgroundImage: "linear-gradient(to left,#27139d,#fc6226)",
      boxShadow: " 0 1px 5px 0 rgb(0 0 0 / 20%)",
      color: "white",
      lineHeight: "1.42857143",
      textAlign: "center",
      whiteSpace: "nowrap",
      fontSize: "20px",
      cursor: "pointer",
      userSelect: "none",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px !important",
      },
    },
    estimated: {
      fontFamily: 'Lato, sans-serif !important',
      fontSize: '22px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle:'normal',
      lineHeight: 1.2,
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#333',
      marginBottom: '0 !important',
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem !important",
      },
    },
    totalPrice: {
      fontFamily: 'Lato,sans-serif !important',
      fontSize: '147px',
      fontWeight: 'bold',
      marginBottom: "1rem !important",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.5rem !important",
      },
    },
    btnCon: {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "nowrap !important",
      },
    },
  };
});
const TotalCalAndMeeting = ({ price }) => {
  const [startOver, setStartOver] = useState(false)
  const classes = useStyles();
  return (
      startOver === true ? <OptionsCon auth={true}/> :
          <Grid container className={classes.totalPricePage} justifyContent="center">
            <Grid
                style={{ height: '80vh'}}
                xs={12}
                sm={8}
                item
                alignItems={'center'}
                justifyContent={'flex-end'}
                container
                direction="column"
            >
              <Grid item >
                <Typography className={classes.estimated}>
                  The estimated cost of your app is
                </Typography>
              </Grid>
              <Grid item  className={classes.totalPrice}>
                £{price.length > 0 && price.reduce((pre, cu) => pre + cu)}
              </Grid>
              <Grid item >
                <div align={'center'}>
                  <a style={{textDecoration: 'none'}} href="https://calendly.com/kay_bothofus/intro" target='_blank'>
                    <Button className={'btn-schedule'}>
                      Schedule a meeting
                    </Button>
                  </a>
                  <Button
                      variant="text"
                      disableRipple
                      onClick={() => {setStartOver(true)}}
                      className={'btn-start-over'}
                  >
                    Start Over
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
  );
};
export default TotalCalAndMeeting;
