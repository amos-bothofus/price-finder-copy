import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core'
import BouLogo from '../commons/bou-logo'
import BackButton from '../../assets/images/backButton.png'

const useStyles = makeStyles((theme) => {
    return {
        infoCon: {
            padding: "10px",
        },
        infoBarLabels: {
            fontFamily: "Gotham Rounded",
            fontWeight: "700",
            fontSize: "1.5rem",
            [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
            },
        },
        previousBtn: {
            paddingLeft: 10,
            cursor: "pointer",
        },
        backIcon: {
            width: "60px !important",
            [theme.breakpoints.down("sm")]: {
                width: "40px !important",
            }
        },
        bouBtn: {
            backgroundColor: '#fff',
            border: 'none',
            "&:hover": {
                cursor: 'pointer',
            }
        }
    };
});
const InfoCont = ({previousQuestion, noOfQuestion, price, totalQuestions}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Grid
                style={{ width: '90vw'}}
                item
                className={classes.infoCon}
                container
                alignItems={'center'}
                justifyContent="space-between"
            >
                <Grid item
                      className={`${classes.infoBarLabels} ${classes.previousBtn}`}
                >
                    {
                        noOfQuestion !== 1 &&  <button  onClick={previousQuestion} className={classes.bouBtn}>
                            <img className={classes.backIcon} src={BackButton} alt="Go Back"/>
                        </button>
                    }
                </Grid>

                <Grid item className={classes.infoBarLabels}>
                    <BouLogo/>
                </Grid>

                <Grid item className={classes.infoBarLabels}>

                </Grid>
            </Grid>
        </Fragment>
    );
};

export default InfoCont;
