import React, { Fragment, useEffect, useState } from 'react'
import SingleOption from './SingleOption'
import axios from 'axios'
import InfoCont from './InfoCont'
import { BASEAPI } from '../../util/base-api-url'
import Loader from '../loader/Loader'
import TotalCalAndMeeting from '../totalCalAndMeeting/TotalCalAndMeeting'
import { BsDashLg } from 'react-icons/all'
import { Grid, makeStyles } from '@material-ui/core'

const OptionsCon = ({ auth }) => {
  const [current, setCurrent] = useState(0)
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([]);

  const useStyle = makeStyles((theme) => {
    return {
      processNav: {
        width: 87.5,
        height: 8,
        background: '#b3b3b3',
        color: '#b3b3b3',
        margin: '0 5px 0 5px',
        borderRadius: 5,
        [theme.breakpoints.down("sm")]: {
          width: 30,
          height: 8,
          background: '#b3b3b3',
          color: '#b3b3b3',
          margin: '0 5px 0 5px'
        }
      },

      processNavActive:{
        background: '#2a1da1',
        color: '#2a1da1',
      },
      stepPrice: {
        textAlign: 'center',
        fontSize: '20px',
        color:  '#2a1da1',
        fontWeight: 'bold',
        borderRadius: 5
      }
    };
  });
  const classes = useStyle();
  const nav = (total, price) => {
    let rows = [];
    for (let i = 0; i < total+1; i++) {
      rows.push( <span key={i} >
        <BsDashLg className={`${classes.processNav} ${i === current && classes.processNavActive}`}/>
        <div className={classes.stepPrice}>
          {i === current ? (price.length > 0 ? "€" +price.reduce((pre, cu) => pre + cu) : "€0") : <BsDashLg style={{ color: '#fff'}}/>}
          </div>
      </span>);
    }
    return <div align={'left'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {rows}
    </div>;
  }
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASEAPI}question/next`);
        const totalQues = await axios.get(`${BASEAPI}question/totalquestions`);
        setTotalQuestions(totalQues.data.total);
        setLoading(false);
        setCurrentQuestion(res.data[0]);
        setQuestions([res.data[0]]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const fetchNextQuestion = async (optionPrice) => {
    // if (checkMultipleSelection) return;
    setPrice((pre) => [...pre, optionPrice]);
    try {
      setLoading(true);
      const res = await axios.get(
          `${BASEAPI}question/next?id=${currentQuestion._id}`
      );
      if (res.data.length === 0) setProceed(true);
      setLoading(false);
      setCurrentQuestion(res.data[0]);
      setQuestions((prevState) => [...prevState, res.data[0]]);
      setCurrent(current === totalQuestions ? 0 : current + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const previousQuestion = () => {
    if (questions.length === 0) return;
    const updatedQuestions = questions.slice(0, questions.length - 1);
    const updatedPrice = price.slice(0, price.length - 1);
    setPrice(() => updatedPrice);
    setCurrentQuestion(questions[questions.length - 1 - 1]);
    setQuestions(() => updatedQuestions);
    setCurrent(current - 1);
  };
  return (
      <Fragment>
        {currentQuestion && loading === false && (
            <Grid container
                  style={{ height: '100vh'}}
                  alignItems={'center'}
                  justifyContent={'space-around'}
            >
              <Grid item>
                <div style={{ paddingTop: 25, paddingBottom: 25}}>
                  <InfoCont
                      previousQuestion={previousQuestion}
                      noOfQuestion={questions.length}
                      totalQuestions={totalQuestions}
                      price={price}/>
                </div>
                <div align={'center'} style={{ paddingTop: 25, paddingBottom: 25}}>
                  {nav(totalQuestions, price)}
                </div>
                <SingleOption
                    auth={auth}
                    fetchNextQuestion={fetchNextQuestion}
                    currentQuestion={currentQuestion}
                    questions={questions}
                    setQuestions={setQuestions}
                />
              </Grid>
            </Grid>
        )}
        {loading && <Loader />}

        {proceed && <TotalCalAndMeeting price={price} />}
      </Fragment>
  );
};

export default OptionsCon;
