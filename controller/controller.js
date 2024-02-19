const User = require("../models/UserSchema");
const Feedback = require("../models/FeedbackSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const hello = (req, res) => {
  res.json({ message: "Hello, World!" });
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
 
    const token = jwt.sign({ userId: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "Login Successful",userID: user._id, name: user.name, email: user.email, token: token ,role:user.role});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, role  } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      feedbackReportIDs: [],
    });

    await newUser.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addFeedback = async (req, res) => {
  
  try {
    if(req.user.role == "user"){ {
      const {
        customerName,
        feedback,
        date,
        complete
      } = req.body;
  
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newFeedbackReport = new Feedback({
        user_id: user._id,
        feedback,
        customerName,
        date,
        complete
      });
  
      await newFeedbackReport.save();
      user.feedbackReportIDs.push(newFeedbackReport._id);
      await user.save();
      return res.status(200).json({
        message: "Feddback  created successfully",
        id: newFeedbackReport._id,
      });
    }
  }
    else {
      return res.status(400).json({message:"you cannot acess"});

    }
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserFeedback = async (req, res) => {
  try {
    if(req.user.role == "user"){
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedbackReports = await Feedback.find({ user_id: user._id });
    return res.status(200).json(feedbackReports);
  }else {
    return res.status(400).json({message:"you cannot acess"});
  }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.body;
    
    const existingReport = await Feedback.findById(feedbackId);
    const user = await User.findOne({ feedbackReportIDs: feedbackId });

if (user) {
  user.feedbackReportIDs.pull(feedbackId);
  await user.save();
}
    if (!existingReport) {
      return res.status(404).json({ message: "Feedback report not found" });
    }
    await existingReport.deleteOne({ _id: feedbackId });

    return res
      .status(200)
      .json({ message: "Feedback report deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateFeedbackByUser = async (req, res) => {
  try {
    const { feedbackId } = req.body;
    const updateFields = {};

    const Fields = [
      "customerName",
      "feedback",
      "date"
    ];

    Fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const foundFeedback = await Feedback.findById(feedbackId);
    if (!foundFeedback) {
      return res.status(404).json({ message: "feedback report not found" });
    }

    Object.assign(foundFeedback, updateFields);

    await foundFeedback.save();

    return res
      .status(200)
      .json({ message: "feedback  updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//Admin

const getAllFeedback = async (req, res) => {
  try {
    if(req.user.role == "admin"){
      const FeedbackReport = await Feedback.find().populate('user_id', 'name');
      return res.status(200).json(FeedbackReport);
    }
    else {
      return res.status(400).json({message:"you cannot acess"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCheck  =async (req,res) => {
  try {
    const { feedbackId, completionStatus } = req.body;
    const updatedFeedback = await Feedback.updateCheckStatus(feedbackId, completionStatus);
    res.status(200).json({ message: 'Check status updated successfully', data: updatedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}


module.exports = {   
  hello,
login,
signup,
addFeedback,
getUserFeedback,
deleteFeedbackById,
updateFeedbackByUser,
getAllFeedback,
updateCheck
};
