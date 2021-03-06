const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require("./message");


const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  coordinates: [Number, Number], //lat and lng

  role: {
    type: String,
    enum: ['User','Business'],
    default: 'User'
  },
  messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
  messagesVoted:[{type: Schema.Types.ObjectId, ref: "Message"}],
});



const User = mongoose.model("User", userSchema);
module.exports = User;
