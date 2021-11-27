import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import HeadingUpdation from '../headingUpdationForm/HeadingUpdation'
import MultipleSelection from './MultipleSelection'
import SingleSelection from './SingleSelection'
import NextButton from '../commons/next-button'

const useStyle = makeStyles((theme) => {
  return {
    primaryHed: {
      fontFamily: 'Lato, sans-serif',
      fontSize: '30.2 !important',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.2,
      letterSpacing: 'normal',
      textAlign: 'center !important',
      color: '#333',
      marginBottom: '0px',
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.4rem !important",
        fontWeight: 'bold !important',
        padding: "5px",
      },
    },
    secondaryHeading: {
      fontFamily: 'Lato, sans-serif !important',
      fontSize: '22px !important',
      fontStretch: 'normal !important',
      fontStyle:'normal !important',
      lineHeight: 1.2,
      letterSpacing: 'normal !important',
      color: '#333',
      marginTop: 3,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem !important"
      },
    },
    nextBtn: {
      marginRight: "2rem",
      border: "none",
      cursor: "pointer",
      outline: "none",
      fontSize: "1.5rem",
      fontFamily: "Gotham Rounded",
      fontWeight: "700",
      backgroundColor: "transparent",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        marginRight: "0.3rem",
      },
    },
  };
});
const SingleOptionData = ({
                            currentQuestion: { primaryTitle, secondaryTitle, options, multipaleSelection },
                            fetchNextQuestion,
                            auth,
                            questions,
                            setQuestions,
                          }) => {
  const classes = useStyle();
  const [editHeadingForm, setEditHeadingForm] = useState(false);
  const openEditHeadingFormHan = () => {
    if (!auth.auth) return;
    setEditHeadingForm(true);
  };
  return (
      <Fragment>
        {auth.auth && (
            <NextButton nextOptionHan={() => fetchNextQuestion(0)}/>
        )}
        <Grid container direction="column">
          <Grid item onClick={openEditHeadingFormHan}>
            <div align={'center'}>
              <h1 className={classes.primaryHed}>
                {primaryTitle}
              </h1>
              <p className={`${classes.secondaryHeading}`}>
                {secondaryTitle}
              </p>
            </div>
          </Grid>
          <Grid item container justifyContent="center">
            {multipaleSelection && !auth.auth ? (
                <MultipleSelection
                    options={options}
                    fetchNextQuestion={fetchNextQuestion}
                />
            ) : (
                <SingleSelection
                    options={options}
                    fetchNextQuestion={fetchNextQuestion}
                    auth={auth}
                    questions={questions}
                    setQuestions={setQuestions}
                />
            )}
          </Grid>
        </Grid>
        {editHeadingForm && (
            <HeadingUpdation
                editHeadingForm={editHeadingForm}
                setEditHeadingForm={setEditHeadingForm}
                questions={questions}
                setQuestions={setQuestions}
                auth={auth}
            />
        )}
      </Fragment>
  );
};

export default SingleOptionData;
