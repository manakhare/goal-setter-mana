const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  //gets the object id of the user who is accesssing the goals
    required: true,
    ref: 'User' // ref takes the reference mongoose model that the type object considers... that is whose id we are considering here?
  },
  text: {
    type: String,
    required: [true, "Please add a text value"],
  },
},
{
    timestamps: true,  //automatically adds 'updated at' and 'created at' fields
});

module.exports = mongoose.model("Goal", goalSchema); //(modelName, modelSchema)
