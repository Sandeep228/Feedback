const mongoose = require('mongoose');
const FeedBackSchema = require('./FeedbackSchema')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
    default:"user"
  },
  feedbackReportIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedBack'
      }
    ],
    complete:{
      type: Boolean, 
      default: false, 
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
