import { Grid } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { BASEAPI } from '../../util/base-api-url'
import parseHtml from 'html-react-parser'
import UpdatedOptionForm from '../updateOptionForm/UpdatedOptionForm'
import AnswerImage from '../commons/answer-image'

const useStyles = makeStyles((theme) => {
  return {
    optionDataCon: {
      width: '255.3 !important',
      height: '264 !important',
      textAlign: "center",
      padding: "30px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "unset",
      },
    },
    imgAndHeadCon: {
      width: '255.3px !important',
      padding: "5px",
      borderRadius: 26,
      backgroundColor: '#f2f2f2',
      boxShadow: '0 0 2.8px 0 rgba(48, 48, 48, 0.2)',
      height: '264px  !important',
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row !important",
        flexWrap: "nowrap !important",
        alignItems: "center",
        border: "1px solid #00000030",
        padding: "0",
      },
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.2)",
        transition: "0.2s",
        cursor: 'pointer'
      },
    },
    optionImage: {
      height: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100px",
        height: "auto",
      },
    }
  };
});
const SingleSelection = ({options, fetchNextQuestion, auth, questions, setQuestions}) => {
  const [imgWidth, setImageWidth] = useState({})

  const classes = useStyles();
  const [openUpdateOptionForm, setOpenUpdateOptionForm] = useState(false);
  const [indexOfOption, setIndexOfOption] = useState(null);
  const [selectedOptionData, setselectedOptionData] = useState(null);
  const fetchNextQuestionHan = (singleOpData, index) => {
    if (auth.auth) {
      setselectedOptionData(singleOpData);
      setOpenUpdateOptionForm(true);
      setIndexOfOption(index);
    } else {
      fetchNextQuestion(singleOpData.price);
    }
  };

  return (
      <Fragment>
        {options.map((singleOpData, index) => {
          return (
              <Grid
                  spacing={2}
                  item
                  sm={3}
                  xs={12}
                  key={singleOpData._id}
                  className={classes.optionDataCon}
              >
                <Grid
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction="column"
                    container
                    className={classes.imgAndHeadCon}
                    onClick={() => fetchNextQuestionHan(singleOpData, index)}
                >
                  <Grid item xs={'auto'}>
                    <AnswerImage
                        src={`${BASEAPI}${singleOpData.img}`}
                        width={singleOpData.imageWidth}
                        alt={singleOpData.heading}
                        heading={singleOpData.heading}
                    />
                  </Grid>
                </Grid>
              </Grid>
          );
        })}

        {openUpdateOptionForm && (
            <UpdatedOptionForm
                setQuestions={setQuestions}
                questions={questions}
                indexOfOption={indexOfOption}
                setOpenUpdateOptionForm={setOpenUpdateOptionForm}
                selectedOptionData={selectedOptionData}
            />
        )}
      </Fragment>
  );
};

export default SingleSelection;
