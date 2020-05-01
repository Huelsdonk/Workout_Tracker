const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  exerciseType: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },
  weight: {
    type: String,
    trim: true,     
  },
  sets: {
    type: String,
    trim: true
  },
  reps: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  distance: {
    type: String,
    trim: true,
    // tried a few things here too. I can make it required based on a boolean, but 
    // that doesn't really accomplish anything. I 
    // thought about hiding the form row in jQuery if type isn't "cardio", but
    // there's probably a better way to do it that I'm not aware of...
    },
  exerciseCreated: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  // cardioboo: Boolean
});




// ExerciseSchema.methods.distanceNeeded = function() {
//   if (this.exerciseType === "cardio") {
//     this.cardioboo = true;
//     return this.cardioboo
//   }
// };

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
