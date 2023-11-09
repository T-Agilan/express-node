const express = require("express");
const app = express();
const cors = require('cors')


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Agilan:3cQMZtVhRzaGBdb7@cluster0.mqvjmje.mongodb.net/learning");
  

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: false,
  },
  number: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  contactName:{
    type: String,
  
  },
  contactPhone:{
    type: String,
  },
  contactMail:{
    type: String,
  },
  notes:{
    type: String,
  },
  type:{
    type: String,
  },
  category:{
    type: String,
  },
  percentage:{
    type: Number,
  },
  activeFrom:{
    type: String,
  },
  criticalAccount:{
    type: String,
  },
  paymentOptions:{
    type: String,
  },
});
const users = mongoose.model("user", userSchema);

app.get("/", function (_req, res) {
  users.find().then((data) => {
    res.json(data); // Send the data as JSON response
  });
});

// Define a route for handling POST requests
app.post("/", function (req, res) {
  const userData = new users({
    fname: req.body.fname,
    mail: req.body.mail,
    number: req.body.number,
    website: req.body.website,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    contactMail: req.body.contactMail,
    notes: req.body.notes,
    type: req.body.type,
    category: req.body.category,
    percentage: req.body.percentage,
    activeFrom: req.body.activeFrom,
    criticalAccount: req.body.criticalAccount,
    paymentOptions: req.body.paymentOptions,
  });
  userData.save()
  .then(() => {
    res.json({ message: "User data saved" }); // Send a response indicating success
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Error saving user data" });
  });
});
app.put("/:id", function (req, res) {
  const id = req.params.id;
  const updatedData = {
    fname: req.body.fname,
    mail: req.body.mail,
    number: req.body.number,
    website: req.body.website,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    contactMail: req.body.contactMail,
    notes: req.body.notes,
    type: req.body.type,
    category: req.body.category,
    percentage: req.body.percentage,
    activeFrom: req.body.activeFrom,
    criticalAccount: req.body.criticalAccount,
    paymentOptions: req.body.paymentOptions,
  };
  users.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error updating user data" });
    });
});

 app.listen(3002);






