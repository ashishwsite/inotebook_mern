const express = require('express');
const User = require('../models/User');
const Notes=require('../models/Note')
const router = express.Router();// router ka used karna hai route banake liye 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';
// anb router.get() likna padega 
router.get('/',(req,res)=>{
  // to get data from req body 
  var bodyData=req.body;
  console.log("req body data",bodyData)
  console.log("this is data on get request")
 return  res.json({"mess ON GEt":"this is send from url hit localhodt:5000/api/auth ,from router/auth.js"})
})
router.get('/check',(req,res)=>{
  res.json({"mess":"this is response for checking auth file is working" })
})
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
var success=true
router.post('/createuser', [
  
  // this is validation array to varify data coming is as per describe
  // validation required in post req
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 3 characters').isLength({ min: 3 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already in the User object/modal/collection
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user in ewxisting databse using create()
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    // yaha se create user ke authtoken create kar rah hua (id ko used karke)
    // Authorization : it is combination  of userId and jwt_screate
    const Authorization = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    // response me new user ki authkon send kar raha hua 
    res.json({ "mess":"new user create","name":user.name,Authorization,success })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
// to login we required 1: email  2: password
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
 
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);// validdate kar ke result ko rakh raha hai
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // database ke User_Collection me se {req.body ke email ko used }karke user ko find kar rah ahua
   // login ho gaya tab authtoken ko send akr raha hau
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email" });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
          }

          // Continue with login if password matches
          const data = {
            user: {
                id: user.id
            }
          };
          const Authorization = jwt.sign(data, JWT_SECRET);
          res.json({ success: true, "UserName":user.name, Authorization });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
router.get('/fetchallNotes',async (req,res)=>{
  const notes=await Notes.find();
  console.log(notes)
  res.json({"total note is":notes.length,"All Note":notes})
})
module.exports = router