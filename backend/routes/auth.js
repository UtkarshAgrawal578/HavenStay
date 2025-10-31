const express=require("express");
const Student=require('../Models/Student')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
var jwt = require('jsonwebtoken');
const Admin = require("../Models/Admin");
const JWT_SECRET='utkarshisagoodb$oy';


router.post('/Createuser',[
    body('fullName','Enter a valid fullName').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({ min: 5 }),
    body('studentId','ID must be in at least 6 characters').isLength({min: 6}),
    body('phone','phone must be at least of 10 characters').isLength({min: 10})
   
    
],async (req, res) => {
//  const user=User(req.body)
//  user.save()
//  res.send(req.body)   
//  console.log(req.body)
//If threre are errors return errors and bad request
const errors = validationResult(req);
let success=false;
 if (!errors.isEmpty()) {
  
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the email already exists
    try{
    let user=await Student.findOne({email:req.body.email});
     if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"});
     }
     //create a new user and copy it to datbase
     const salt= await bcrypt.genSalt(10);

     const secPass= await bcrypt.hash(req.body.password,salt);
    user=await Student.create({
      fullName: req.body.fullName,
      password: secPass,
      email:req.body.email,
      studentId:req.body.studentId,
      hostel:req.body.hostel,
      phone:req.body.phone,
      roomNumber:req.body.roomNumber,
      course:req.body.course,
      year:req.body.year,
      branch:req.body.branch
    })
    
    // .then(user => res.json(user)).catch(err=>{console.log(err)
    //  res.json({error:'Enter a unique value'})});
   const data = { user: { studentId: user.studentId,role:"student" } };
   const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user))
    success=true;
    res.json({success,authToken,role:"student"})
  }
catch(error){
  console.log(error.message);
  res.status(500).json({ error: "An error has occurred" }); // ✅ valid JSON
}
})

router.post(
  "/slogin",
  [
    body("studentId", "Enter a valid Student ID").isLength({ min: 6 }),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { studentId, password } = req.body;

    try {
      // Check if student exists
      let student = await Student.findOne({ studentId });
      if (!student) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Student ID or password" });
      }

      // Compare password
      const passwordCompare = await bcrypt.compare(password, student.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Student ID or password" });
      }

      // Generate JWT token
      const data = {
        user: { studentId: student.studentId,role:"student" },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken ,role:"student"});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post('/CreateuserA',[
    body('fullName','Enter a valid fullName').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({ min: 5 }),
    body('adminId','ID must be in at least 6 characters').isLength({min: 6}),
    body('phone','phone must be at least of 10 characters').isLength({min: 10})
   
    
],async (req, res) => {
//  const user=User(req.body)
//  user.save()
//  res.send(req.body)   
//  console.log(req.body)
//If threre are errors return errors and bad request
const errors = validationResult(req);
let success=false;
 if (!errors.isEmpty()) {
  
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the email already exists
    try{
    let admin=await Admin.findOne({email:req.body.email});
     if(admin){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"});
     }
     //create a new user and copy it to datbase
     const salt= await bcrypt.genSalt(10);

     const secPass= await bcrypt.hash(req.body.password,salt);
      admin=await Admin.create({
      fullName: req.body.fullName,
      password: secPass,
      email:req.body.email,
      adminId:req.body.adminId,
      hostel:req.body.hostel,
      phone:req.body.phone,
      Designation:req.body.Designation,
      
    })
    
    // .then(user => res.json(user)).catch(err=>{console.log(err)
    //  res.json({error:'Enter a unique value'})});
   const data = { admin: { adminId: admin.adminId ,role:"admin"} };
   const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user))
    success=true;
    res.json({success,authToken,role:"admin"})
  }
catch(error){
  console.log(error.message);
  res.status(500).json({ error: "An error has occurred" }); // ✅ valid JSON
}
});
router.post(
  "/alogin",
  [
    body("adminId", "Enter a valid Admin ID").isLength({ min: 6 }),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { adminId, password } = req.body;

    try {
      // Check if student exists
      let admin = await Admin.findOne({ adminId });
      if (!admin) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Admin ID or password" });
      }

      // Compare password
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Admin ID or password" });
      }

      // Generate JWT token
      const data = {
        admin: { adminId: admin.adminId ,role:"admin"},
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken,role:"admin" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;

