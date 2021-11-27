import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import parseHtml from 'html-react-parser'
import { Button, Grid } from '@mui/material'


const useStyles = makeStyles((theme) => {
    return {
        nextBtnCon: {
            justifyContent: "flex-end",
            marginRight: "2rem",
            [theme.breakpoints.down("sm")]: {
                fontSize: "1rem !important",
                marginRight: "0.3rem !important",
            },
        },
        nextBtn: {
            outline: "none",
            border: "none",
            cursor: "pointer",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
            fontFamily: "Gotham Rounded",
            fontWeight: "700",
            [theme.breakpoints.down("sm")]: {
                fontSize: "1rem !important",
            },
        }
    };
});

const NextButton = ({nextOptionHan}) => {
    const classes = useStyles(useStyles)

    return (
        <Grid container className={classes.nextBtnCon}>
            <Button variant={'outlined'} onClick={nextOptionHan} className={classes.nextBtn}>
                Next
            </Button>
        </Grid>
    );
};

export default NextButton;
