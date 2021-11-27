const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleWare = require("../middleware/middleware");
const Question = require("../models/question");
/*const tempOptionStaticData = require("../tempdata");
router.post("/save", async (req, res) => {
  try {
    for (const question of tempOptionStaticData) {
      await new Question(question).save();
    }
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});*/

// storage variable for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const { questionId, optionIndex } = req.params;
    cb(null, `${questionId}-${optionIndex}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("file");


router.get("/totalquestions", async (req, res) => {
  try {
    const totalNumbers = await Question.count();
    res.json({ total: totalNumbers });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/next", async (req, res) => {
  const { id } = req.query;
  try {
    const question = id
      ? await Question.find({ _id: { $gt: id } }).limit(1)
      : await Question.find().sort({ timeStamp: 1 }).limit(1);
    res.json(question);
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

router.post("/updatequestionheading/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params;
  const { updatedPrimary, updatedSecondry } = req.body;

  try {
    const question = await Question.findById(id);
    question.primaryTitle = updatedPrimary;
    question.secondryTitle = updatedSecondry;
    const result = await question.save();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/questionselectionstatustoggle/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const question = await Question.findById(id);
    question.multipaleSelection = !question.multipaleSelection;
    const result = await question.save();
    res.json(result.multipaleSelection);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getquestionselectionstatus/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const question = await Question.findById(id);

    res.json(question.multipaleSelection);
  } catch (error) {
    console.log(error);
  }
});

router.post("/update-question-option/:questionId/:optionId",
  authMiddleWare,
  async (req, res) => {
    const { questionId, optionId } = req.params;
    const { updatedImg, updatedHeading, updatedPrice,imageWidth, headingSize } = req.body;
    try {
      await Question.findOneAndUpdate({
          _id: questionId,
          "options._id": optionId,
        },
        {
          $set: {
            "options.$.heading": updatedHeading,
            "options.$.img": updatedImg,
            "options.$.price": updatedPrice,
            "options.$.imageWidth": imageWidth,
            "options.$.headingSize": headingSize,
          },
        }
      );
      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  }
);

//uploading image
router.post("/:questionId/upload/:optionIndex", authMiddleWare, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file.filename);
  });
});

module.exports = router;
