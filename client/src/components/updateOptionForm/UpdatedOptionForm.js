import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useState } from "react";

import { BASEAPI } from "../../util/base-api-url";

const useStyles = makeStyles((theme) => {
  return {
    formConModel: {
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
    btnCon: {
      marginTop: "5px !important",
      textAlign: 'right'
    },
    selectFile: {
      marginLeft: "5px ",
    },
  };
});
const UpdatedOptionForm = ({
                             questions,
                             setQuestions,
                             indexOfOption,
                             setOpenUpdateOptionForm,
                             selectedOptionData,
                           }) => {
  const { img, heading, price,imageWidth, headingSize } = selectedOptionData;

  const classes = useStyles();
  const [formData, setFormData] = useState({
    heading: heading,
    img: img,
    price: price,
    imageWidth: imageWidth,
    headingSize: headingSize,
  });
  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState("");
  const saveOption = async () => {
    const { heading, img, price, imageWidth,headingSize } = formData;
    if (heading === "" || img === "") return alert(`why?`);
    try {
      const CopyOfQuestions = [...questions];
      const lastQuestionIndex = questions.length - 1;
      const questionId = CopyOfQuestions[lastQuestionIndex]._id;
      const optionId =
          CopyOfQuestions[lastQuestionIndex].options[indexOfOption]._id;
      //first saving image
      let imageRes;
      if (file !== "") {
        const configMultiFormData = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        formData.append("file", file);
        imageRes = await axios.post(
            `${BASEAPI}question/${questionId}/upload/${indexOfOption}`,
            formData,
            configMultiFormData
        );
      }

      // updating the data in database
      let imageUrl = file !== "" ? imageRes.data : img;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        updatedHeading: heading,
        updatedImg: imageUrl,
        updatedPrice: Number(price),
        imageWidth: imageWidth,
        headingSize: headingSize,
      });
      setUpdating(true);
      const res = await axios.post(
          `${BASEAPI}question/update-question-option/${questionId}/${optionId}`,
          body,
          config
      );
      setUpdating(false);

      setOpenUpdateOptionForm(false);

      //updating the data in database
      CopyOfQuestions[lastQuestionIndex].options[indexOfOption].heading =
          heading;
      CopyOfQuestions[lastQuestionIndex].options[indexOfOption].img = imageUrl;
      setQuestions(CopyOfQuestions);
    } catch (error) {
      setUpdating(false);

      console.log(error);
    }
  };
  // console.log(questions[questions.length - 1].options);
  const changeHan = (event) => {
    setFormData((pre) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };
  const fileSelectHan = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  return (
      <Fragment>
        <div className={classes.formConModel} onClick={() => setOpenUpdateOptionForm(false)}/>
        <div className={classes.formCon}>
          <Grid container spacing={2}>
            <Grid item xs={'auto'} sm={12}>
              <TextField
                  className={classes.textField}
                  value={formData.heading}
                  onChange={changeHan}
                  name="heading"
                  label="Heading"
                  variant="outlined"
                  type="text"
              />
            </Grid>
            <Grid item xs={'auto'} sm={4}>
              <TextField
                  value={formData.price}
                  onChange={changeHan}
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
              />
            </Grid>
            <Grid item xs={'auto'} sm={4}>
              <TextField
                  value={formData.imageWidth}
                  onChange={changeHan}
                  name="imageWidth"
                  label="Image Width"
                  variant="outlined"
                  type="text"
                  className={classes.textField}
              />
            </Grid>
            <Grid item xs={'auto'} sm={4}>
              <TextField
                  value={formData.headingSize}
                  onChange={changeHan}
                  name="headingSize"
                  label="Heading Size"
                  variant="outlined"
                  type="text"
                  className={classes.textField}
              />
            </Grid>
            <Grid item xs={'auto'} sm={12}>
              <input
                  className={classes.selectFile}
                  accept="image/*"
                  onChange={fileSelectHan}
                  type="file"
              />
            </Grid>
            <Grid xs={12} item className={classes.btnCon}>
              <Button variant="outlined" color="success" onClick={saveOption}>
                {updating ? "Updating..." : "Save"}
              </Button>
              &nbsp;
              <Button variant="outlined" color="error" onClick={() => setOpenUpdateOptionForm(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
  );
};

export default UpdatedOptionForm;
