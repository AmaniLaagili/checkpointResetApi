const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    phone: Number,
});
module.exports = mongoose.model("User", userSchema);
