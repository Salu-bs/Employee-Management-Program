const express = require('express');
const { registerUser, verifyOTP ,renderLog,renderotp,renderHome,loginUser,regSuccess} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const  tokenValidate  = require('../middleware/tokenValidate');


const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyOTP);

router.post('/login',loginUser);

// Render registration page
router.get('/register', renderLog);

// Render OTP verification page
router.get('/verify-otp', renderotp);
router.get('/reg', regSuccess);


// Render home page
// router.get('/home',   renderHome);

// Default route to render registration page
router.route('/').get(renderLog);

router.get("/view",(req,res)=>{
    res.render("view")
})

router.get('/home',tokenValidate,  renderHome);


// router.get('/home', protect, (req, res) => {
//     res.json({ message: 'Welcome to the homepage', user: req.user });
//   });
// router.get('/home', protect, renderHome);

module.exports = router;
