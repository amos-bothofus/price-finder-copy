import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import SingleOptionData from "./SingleOptionData";

const SingleOption = ({
  currentQuestion,
  fetchNextQuestion,
  auth,
  questions,
  setQuestions,
}) => {
  return (
    <Fragment>
      <Grid container direction="column">
        {/* contains options data  */}
        <Grid item>
          <SingleOptionData
            auth={auth}
            fetchNextQuestion={fetchNextQuestion}
            currentQuestion={currentQuestion}
            questions={questions}
            setQuestions={setQuestions}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SingleOption;
