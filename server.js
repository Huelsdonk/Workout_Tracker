const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
// Couldn't get the models folder to work. I thought I had it setup just like
// the activities, but I kept getting undefined when using index.js and requiring
// the models folder. I'm sure it was something dumb, but this works...
const Workout = require("./Workout.js");
const Exercise = require("./Exercise.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


app.post("/submitworkout", ({ body }, res) => {
  const workout = new Workout(body);
  Workout.create(workout)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  Exercise.find({})
    .then(dbexercise => {
      res.json(dbexercise);
    })
    .catch(err => {
      res.json(err);
    });
});


app.post("/submitexercise", ({ body }, res) => {
  const exercise = new Exercise(body)
  
  Exercise.create(exercise)
    .then(({ _id }) => Workout.findOneAndUpdate({ name: body.currentname }, { $push: { exercises: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populatedexercises", ({body}, res) => {
  Workout.find({})
    .populate("exercises")
    .then(dbplan => {
      res.json(dbplan);
    })
    .catch(err => {
      res.json(err);
    });
});

// This should allow user to select workout, then exercise. But, time...
app.delete("/deleteexercise", function({body}, res) {
  Exercise.deleteOne({ name: body.name }).then(function(dbImage) {
    res.json(dbImage);
  });
});

app.post("/updateexercise", ({ body }, res) => {
  // Tried setOnInsert and a few other things here to allow the user to update just 
  // one column without many handlers. Some kind of worked, but I ultimately ran out
  // of time. 
  Exercise.updateOne({ name: body.currentname }, {
    $set:
    {
      name: body.name,
      exerciseType: body.exerciseType,
      weight: body.weight,
      sets: body.sets,
      reps: body.reps,
      duration: body.distance
    }
  })
    .then(exerUp => {
      res.json(exerUp);
    })
    .catch(err => {
      res.json(err);
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
