const express = require('express');
const User = require("../models/user");
const router = express.Router();

router.get("/signup", (req,res) => {
    return res.render("signup");
})

// Signup route
router.post('/signup', async (req, res) => {
  const { username, phone_number, password } = req.body;
  // console.log(req.body);
  try {
    // console.log(req.body);
    // Check if the user with the provided phone number already exists
    const existingUser = await User.findOne({ phone_number: phone_number });
    if (existingUser) {
      return res.status(400).render("signup", { error: 'User with this username or phone number already exists.' });
    }

    // Create a new user and save
    await User.create({
      username,
      phone_number,
      password,
    });
    return res.status(201).redirect("/");
  } 
  
  catch (error) {
    return res.status(400).render("signup",{
      error: "Fill Correct Details",
    });
  }
});


router.get("/login", (req,res) => {
    return res.render("login");
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    // Find the user by phone number
    const token = await User.matchPasswordAndGenerateToken(phone_number, password);
    // if (!token) {
    //   return res.status(401).render("login",{ message: 'Invalid credentials.' });
    // }
    console.log(token);
    
    return res.cookie("token", token).status(201).redirect("/");//cookie name token
  }
  catch(error){
      return res.render("login",{
          error: "Incorrect credentials",
      });//passing error property if wrong password, error written in any views(nav)
  }
});

router.get("/logout", (req,res) => {
    res.clearCookie('token').redirect("/");
})


module.exports=router;
