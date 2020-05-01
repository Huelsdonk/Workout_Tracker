

function getWorkouts() {
  $.getJSON("/populatedexercises", function (data) {
    // console.log(data[0].exercises[0].name)
    for (let i = 0; i < data.length; i++) {
      $("#workoutspot").append(
        `<div class="jumbotron jumbotron-fluid shadow"><div class="container"><h3>${data[i].name}</h3><hr class="my-4 shadow"><table id=${data[i]._id} class="col-sm-12"><tr><th>Exercise Name</th><th>Type</th><th>Weight</th><th>Sets</th><th>Reps</th><th>Duration</th><th>Distance</th></tr>`
      );
      $("#exerciseSelect").append(`<option>${data[i].name}</option>`)
      $("#updateSelect").append(`<option>${data[i].name}</option>`)
      data[i].exercises.forEach((element) => {
        $(`#${data[i]._id}`).append(
          `<tr><td>${element.name}</td><td>${element.exerciseType}</td><td>${element.weight}</td><td>${element.sets}</td><td>${element.reps}</td><td>${element.duration}</td><td>${element.distance}</td></tr>`
        );
        $(`#${data[i]._id}`).append(`</table></div>`);
        $(`#delete`).append(`<option>${element.name}`)
      });


    }
  });
}


$("#createWorkout").on("submit", function (event) {
  event.preventDefault();
  const workoutObj = {
    currentname: event.target.exerciseSelect.value,
    name: event.target.name.value,
    exerciseType: event.target.exerciseType.value,
    weight: event.target.weight.value,
    sets: event.target.sets.value,
    reps: event.target.reps.value,
    duration: event.target.duration.value,
    distance: event.target.distance.value,
  };

  $.ajax("/submitexercise", {
    type: "POST",
    data: workoutObj,
  }).then(function () {
    location.reload();
  });
});

$("#updateWorkout").on("submit", function (event) {
  event.preventDefault();
  const updateObj = {
    currentname: event.target.updateCurrent.value,
    name: event.target.updateName.value,
    exerciseType: event.target.updateType.value,
    weight: event.target.updateWeight.value,
    sets: event.target.updateSets.value,
    reps: event.target.updateReps.value,
    duration: event.target.updateDuration.value,
    distance: event.target.updateDistance.value,
  };
  console.log(updateObj);

  $.ajax("/updateexercise", {
    type: "POST",
    data: updateObj,
  }).then(function () {
    location.reload();
  });
});

$("#createWorkPlan").on("submit", function (event) {
  event.preventDefault();
  const workPlanObj = {
    name: event.target.planName.value,

  };
  $.ajax("/submitworkout", {
    type: "POST",
    data: workPlanObj,
  }).then(function () {
    location.reload();
  });
});

$("#deleteExercise").on("submit", function (event) {
  event.preventDefault();
  const deleteObj = {
    name: event.target.delete.value,

  };

  $.ajax("/deleteexercise", {
    type: "DELETE",
    data: deleteObj,
  }).then(function () {
    location.reload();
  });
});

getWorkouts();