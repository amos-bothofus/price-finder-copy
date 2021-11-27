import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { BASEAPI } from "../../util/base-api-url";

const useStyles = makeStyles((theme) => {
  return {
    overlay: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      top: "0",
      backgroundColor: "#00000057",
    },
    formCon: {
      position: "absolute",
      backgroundColor: "white",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      padding: "20px",
      width: "50%",
      borderRadius: "2px",
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
    },
    textField: {
      margin: "5px !important",
      width: "100%",
    },
    multiSelectionCheckBoxCon: {
      marginLeft: "5px !important",
    },
  };
});
const HeadingUpdation = ({ questions, setQuestions, setEditHeadingForm }) => {
  const classes = useStyles();
  const [multiSelectionCheck, setMultiSelectionCheck] = useState(false);
  const [questionSelectionAsyn, setQuestionSelectionAsyn] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    primary: questions[questions.length - 1].primaryTitle,
    secondry: questions[questions.length - 1].secondryTitle,
  });
  const changeHan = (event) => {
    if (event.target.value.length > 150) return alert("Length is too long");
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const update = async () => {
    try {
      const { primary, secondry } = formData;
      if (primary === "" || secondry === "")
        return alert(`You can't put empty headings`);

      //updating the database
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        updatedPrimary: primary,
        updatedSecondry: secondry,
      });
      const questionId = questions[questions.length - 1]._id;
      setUpdating(true);
      await axios.post(
        `${BASEAPI}question/updatequestionheading/${questionId}`,
        body,
        config
      );
      setUpdating(false);

      const questionsCopy = [...questions];
      // console.log(questionsCopy);
      questionsCopy[questionsCopy.length - 1].primaryTitle = primary;
      questionsCopy[questionsCopy.length - 1].secondryTitle = secondry;
      setQuestions(questionsCopy);
      setEditHeadingForm(false);
      // updateTheHeading(formData);
    } catch (error) {
      setUpdating(false);

      console.log(error);
    }
  };
  const checkChange = async () => {
    const questionId = questions[questions.length - 1]._id;
    try {
      setQuestionSelectionAsyn(true);
      const res = await axios.post(
        `${BASEAPI}question/questionselectionstatustoggle/${questionId}`
      );
      setMultiSelectionCheck(res.data);
      setQuestionSelectionAsyn(false);
    } catch (error) {
      setQuestionSelectionAsyn(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const getQuestionSelectionStatus = async () => {
      const questionId = questions[questions.length - 1]._id;
      setQuestionSelectionAsyn(true);
      try {
        const res = await axios.get(
          `${BASEAPI}question/getquestionselectionstatus/${questionId}`
        );
        setMultiSelectionCheck(res.data);
        setQuestionSelectionAsyn(false);
      } catch (error) {
        setQuestionSelectionAsyn(false);
        console.log(error);
      }
    };
    getQuestionSelectionStatus();
  }, []);
  return (
    <Fragment>
      <div
        className={classes.overlay}
        onClick={() => setEditHeadingForm(false)}
      ></div>
      <div className={classes.formCon}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              onChange={changeHan}
              className={classes.textField}
              type="text"
              label="Primary"
              name="primary"
              value={formData.primary}
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={changeHan}
              className={classes.textField}
              type="text"
              label="Secondry"
              name="secondry"
              value={formData.secondry}
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.multiSelectionCheckBoxCon}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={multiSelectionCheck}
                    onChange={checkChange}
                    disabled={updating}
                  />
                }
                label="Multiselection"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={update} disabled={questionSelectionAsyn}>
              {!updating ? "Update" : "Updating..."}
            </Button>
            <Button onClick={() => setEditHeadingForm(false)}>Cancel</Button>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default HeadingUpdation;
