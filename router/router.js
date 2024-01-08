const express = require("express");
const {
   hello,
   login,
   signup,
   addFeedback,
   getUserFeedback,
   deleteFeedbackById,
   updateFeedbackByUser,
   getAllFeedback
} = require("../controller/controller");
const isAuthenticated = require("../middleware/verify-token");


const router = express.Router();

router.get('/', hello);
router.post('/login',login);
router.post('/signup',signup);
router.post('/feedback' ,isAuthenticated ,addFeedback)
router.get('/get-my-feedback',isAuthenticated,getUserFeedback);
router.delete('/delete-feedback',isAuthenticated,deleteFeedbackById);
router.put('/update-my-feedback',isAuthenticated,updateFeedbackByUser);
router.get('/get-all-feedback',isAuthenticated,getAllFeedback);


module.exports = router;