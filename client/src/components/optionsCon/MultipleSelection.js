import { Grid } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { BASEAPI } from '../../util/base-api-url'
import AnswerImage from '../commons/answer-image'
import NextButton from '../commons/next-button'

const useStyle = makeStyles((theme) => {
  return {
    optionDataCon: {
      width: 255.3,
      height: 264,
      textAlign: "center",
      padding: "30px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "unset",
      },
    },
    selected: {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    imgAndHeadCon: {
      padding: "5px",
      borderRadius: 26,
      backgroundColor: '#f2f2f2',
      boxShadow: '0 0 2.8px 0 rgba(48, 48, 48, 0.2)',
      height: 264,
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
      width: "70px",
      height: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100px",
        height: "auto",
      },
    },
    heading: {
      fontSize: '25.6px',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.2',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#ff6011',
      [theme.breakpoints.down("sm")]: {
        fontSize: '20px',
      },
    }
  };
});
const MultipleSelection = ({ options, fetchNextQuestion }) => {
  const classes = useStyle();
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [price, setPrice] = useState(0);
  const selectHan = (index, price) => {
    const indexLocation = selectedIndex.indexOf(index);
    if (indexLocation !== -1) {
      const selectedIndexCopy = [...selectedIndex];
      selectedIndexCopy.splice(indexLocation, 1);
      setSelectedIndex(selectedIndexCopy);
      setPrice((pre) => pre - price);

      return;
    }
    setSelectedIndex((pre) => [index, ...pre]);
    setPrice((pre) => pre + price);
    fetchNextQuestion(price);
  };
  const nextOptionHan = () => {
    fetchNextQuestion(price);
  };
  return (
      <Fragment>
        {options.map((singleOpData, index) => {
          return (
              <Grid
                  item
                  sm={3}
                  xs={12}
                  key={singleOpData._id}
                  className={classes.optionDataCon}
                  onClick={() => selectHan(index, singleOpData.price)}
              >
                <Grid
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction="column"
                    container
                    className={`${
                        selectedIndex.indexOf(index) !== -1 ? classes.selected : null
                    } ${classes.imgAndHeadCon}`}
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
        {selectedIndex.length > 0 && (
            <NextButton nextOptionHan={nextOptionHan}/>
        )}
      {/*  TODO: add next button*/}
      </Fragment>
  );
};

export default MultipleSelection;
