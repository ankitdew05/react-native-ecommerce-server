const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/sendVerify/:id", async (req, res) => {
  var val = Math.floor(1000 + Math.random() * 9000);
  const phoneNumber = req.body.phoneNumber;
  console.log(phoneNumber, val)
  try {
    client.messages
    .create({
      body: `Your Klemo Verification Code is ${val} `,
      from: "+17174838826",
      to: phoneNumber,
    })
    .then((message) => {
      console.log(message);
    }).catch((err)=>{
        console.log(err)
    })
    const result  = await User.findByIdAndUpdate(req.params.id, {
        code: val,
      });
      console.log(result)
    res.send({ result: "Succesfully Sent" });
  } catch (err) {
    return res.status(400).json({
        success: false,
        message: "error",
        error: err,
      });
  }
  
});

router.post("/verifyUser/:id", async (req, res) => {
  const code = req.body.password;
  try {
    const user = await User.findOne({phone : req.params.id});
    console.log(user)
    if (user.code === code) {
      return res.status(200).json({
        success: true,
        message: "user Verified",
      });
    }
    res.send({success: false,  message: "Not Verified" });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "error",
      error: err,
    });
  }
});

module.exports = router;
