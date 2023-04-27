const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    branch: String,
    college: String,
    email: String,
    password: String,
    hobby: String,
    passoutYear: Number

}, { timestamps: true }); // this track timing details of document

const usermodel = mongoose.model("studentdata", userSchema);
module.exports = usermodel;