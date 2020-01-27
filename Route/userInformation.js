const express = require('express')
const userInformation = express.Router()
var cors = require('cors')
userInformation.use(cors())

userInformation.use(express.json())
const postuserInformation = require('../Model/userInformationDb')

userInformation.post('/postuserInformation',(req,res)=>{
    var userDetails = {
        Name:req.body.Name,
        Mobile:req.body.Mobile,
        Gender:req.body.Gender,
        location:req.body.location,
        education:req.body.education,
        experience:req.body.experience,
    }
    let response = postuserInformation.insertDetails(userDetails)
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
});

module.exports = userInformation