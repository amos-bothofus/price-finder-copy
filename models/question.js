const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  primaryTitle: {
    type: String,
  },
  secondaryTitle: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
  options: [
    {
      img: {
        type: String,
      },
      imageWidth: {
        type: String,
        default: 80
      },
      heading: {
        type: String

      },
      headingSize: {
        type: String,
        default: 25
      },
      price: {
        type: Number,
      },
    },
  ],
  multipleSelection: {
    type: Boolean,
    default: false,
  },
});

module.exports = Question = mongoose.model("Question", questionSchema);
