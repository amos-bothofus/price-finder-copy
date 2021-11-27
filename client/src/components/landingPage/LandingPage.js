import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { ImBehance2, ImLinkedin } from 'react-icons/im'
import { BsInstagram } from 'react-icons/bs'
import Logo from '../../assets/images/logo.svg'
import LandingBg from '../../assets/images/landing-bg.jpg'
import BothOfUsBtn from '../button/BothOfUsBtn'

const useStyles = makeStyles((theme) => {
  return {
    leftColumn: {
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        '& > .MuiGrid-item': {
          padding: 0,
          margin: 0,
        },
      },
    },
    main:{

      backgroundImage: `url(${LandingBg})`,
      backgroundSize:  'cover'
    },
    landingIcon: {
      width: 30.9,
      height: 30.9,
      opacity: 0.5,
      color: '#808080',
      marginRight: 20,
      marginLeft: 20
    },
    heading: {
      color: '#333 !important',
      textAlign: "center",
      marginTop: "0.25em !important",
      marginBottom: "0.25em !important",
      fontSize: 32.3,
      lineHeight: 1,
      fontFamily: "Lato, sans-serif !important",
      fontWeight: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem !important",
      },
    },
    spanInHeading: {
      margin: "0",
      fontSize: 59.3,
      fontWeight: 900,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.2,
      letterSpacing: 'normal',
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem !important",
      }
    },
    subHeading: {
      fontFamily: "Lato, sans-serif !important",
      color: '#4d4d4d !important',
      fontSize: '22px !important',
      fontStyle: 'normal !important',
      letterSpacing: 'normal !important',
      textAlign: 'center !important',
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem !important",
      }
    },
    imgCon: {
      width: "100px",
      height: 'auto',
    }
  };
});

const LandingPage = ({ startAppHan }) => {
  const classes = useStyles();
  return (
      <div className={classes.main}>
        <Grid
            style={{ height: '100vh', padding: 0}}
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
        >

          <Grid  item >
            <img
                className={classes.imgCon}
                src={Logo}
                alt="app cost calculation"
            />
          </Grid>
          <Grid item >
            <Typography className={classes.heading} variant="h1">
              How much does it cost <br/>
              <span className={classes.spanInHeading}> to make an app?</span>
            </Typography>
            <p className={classes.subHeading}>
              Quickly calculate the cost of creating your app by<br/>responding to
              these simple questions.
            </p>
          </Grid>
          <Grid item  >
            <BothOfUsBtn onClick={startAppHan} text="Get a quote" />
          </Grid>
          <Grid item >
            <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
              <Grid item>
                <a target={'_blank'} href="https://www.linkedin.com/company/bothofus/mycompany/">
                  <ImLinkedin className={classes.landingIcon}/>
                </a>
              </Grid>
              <Grid item>
                <a target={'_blank'} href="https://www.instagram.com/wearebothofus/">
                  <BsInstagram className={classes.landingIcon}/>
                </a>
              </Grid>
              <Grid item>
                <a target={'_blank'} href="https://www.behance.net/bothofus">
                  <ImBehance2 className={classes.landingIcon} style={{ borderRadius: 8 }}/>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
};

export default LandingPage;
