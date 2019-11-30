var express = require('express')
var router = express.Router();
const User = require('../models/User')

// Register
router.post("/register", async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        res.status(200).json({status:true,user})
    } catch(error) {
        console.log(error)
        res.status(400).json({status: false,error})
    } 
  });
// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users)
        res.json({users, status:true})
    } catch (error) {
        res.status(400).json({status:false,error})
    }

});

// Update User
router.put("/:username", async(req,res)=> {
    console.log(req.params)
    const {username} = req.params
    try {
        const user = await User.findOneAndUpdate({name:username}, req.body, {
            new:true
        }) 
        res.json({user, status:true})
    } catch(error) {
        res.status(400)
    }
})

// Delete User

router.delete("/:username", async(req,res)=> {
    const {username} = req.params;
    try {
        const user = await User.findOneAndDelete({name:username});
        res.json({message:"User Deleted", status:true})
    } catch(error) {
        res.status(400)
    }
})

module.exports = router;