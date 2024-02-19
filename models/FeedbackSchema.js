const mongoose = require("mongoose");

const FeedBackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  customerName: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  complete:{
    type: Boolean, 
    default: false, 
  }
});

const FeedBack = mongoose.model("FeedBack", FeedBackSchema);

module.exports = FeedBack;
