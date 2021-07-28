// import Database
require('../config/db');
// import User Model
require('../Model/User');
// import Component Model
require('../Model/Content');
// import Category Model
require('../Model/Category');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Content = mongoose.model('Content');
const Category = mongoose.model('Category');
const cloudinary = require('cloudinary').v2;
//const multer  = require('multer')


//Import Middleware Authentication
const {auth} = require('../middleware-Authentication');

// Multer single file parser
// const upload = multer({limits:{fileSize:4000000}}).single('upload-photo')


//Test route to test the authrorization
router.get('/UserData', auth, (req, res) => {
    if (req.authData==null) {
      res.sendStatus(403|| "authorization invalid");
    } else {
      res.json(req.authData);
    }
});

// Add New Component with specific category
router.post("/addContent",auth, async (req, res) => {
  const category= await Category.findOne({CategoryName:req.body.CategoryName});
  try{

    if(!category){
      return res.status(404).send("Category not Found !!");
    }
  
    //With Image content working with postman
    if(req.files){
      //console.log("file exist");
      const file = req.files.profile;
      //console.log(file);
      cloudinary.uploader.upload(file.tempFilePath,{"max-width":100,"max-height":200,"format":"jpg","folder":"Knowlede-Base-app-Images"},async (err,result)=> { 
            if (err){
              res.send({
                        "status":"failed",
                        "message":"Image couldn't be updated !!"
                        });
                    };
            //console.log(result);
            if(result){
                    const content = new Content();
                    content.CategoryName = category.CategoryName; 
                    content.ProfileImage = result.secure_url; 
                    content.ContentDetails = req.body.ContentDetails;
                    await content.save();       
                    //Associate User collection with posts
                    category.contents.push(content._id)
                    await category.save();
                    res.status(200).send(content);
                }
        });
    }
    
    //Without Image content working with both
    if(req.files==undefined){
      console.log("without file");
      try {
        const content = new Content();
        content.CategoryName = category.CategoryName; 
        content.ProfileImage = req.body.ProfileImage; 
        content.ContentDetails = req.body.ContentDetails;
        await content.save();       
        //Associate User collection with posts
        category.contents.push(content._id)
        await category.save();
        res.status(200).send(content);
      } catch (error) {
        res.status(404).send("There is some error");
      }
    }

  }
  catch(error){
    console.log("some error is there");
  }
});

// Add New Category
router.post("/addCategory", auth,async (req, res) => {
  const category = new Category({
    CategoryName: req.body.CategoryName
  });
  try {
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (error) {
    res.status(400).json("some error to add the category:" + error);
  }
});

// Get All Component
router.get("/allCategory", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json("some error to find the categories:" + error);
  }
});

// Get All Content
router.get("/allContents", auth, async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (error) {
    res.status(400).json("some error to find the components:" + error);
  }
});

// Search contents
router.get('/search/:query',auth,(req,res)=>{
  var query=req.params.query;
  Content.find({"ContentDetails":{
      $regex:".*" + query + ".*",
      $options:"i"
  }},(err,data)=>{
      if(err) throw err;
      res.json({
          "status":"success",
          "message":"Content has been fetched",
          "data":data
      });
  });
}); 

module.exports = router;