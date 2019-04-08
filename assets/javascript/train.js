  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6r0hvoenNpem42uYBdIwirTJZoZH1E7I",
    authDomain: "train-tracker-670e8.firebaseapp.com",
    databaseURL: "https://train-tracker-670e8.firebaseio.com",
    projectId: "train-tracker-670e8",
    storageBucket: "train-tracker-670e8.appspot.com",
    messagingSenderId: "98828616478"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

$("#addTrain-btn").on("click", function(event) {
    event.preventDefault();

    var train = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    console.log(firstTrain);
    var frequency = $("#frequency-input").val().trim();
    console.log(frequency);

    var newTrain ={
        name: train,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    }
    console.log(newTrain);

    database.ref().push(newTrain);

    $("#trainName-input").val("Polar Express");
    $("#destination-input").val("North Pole");
    $("#firstTrain-input").val("00:00");
    $("#frequency-input").val("10");
    });

    database.ref().on("child_added", function(snapshot) {

        var train = snapshot.val().name;
        console.log(train);

        var destination = snapshot.val().destination;
        console.log(destination);

        var firstTrain = snapshot.val().first;
        console.log(firstTrain);
        var frequency = snapshot.val().frequency;
        console.log(frequency);
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var minAway = frequency - tRemainder;
        var nextArrival = moment().add(minAway, "minutes");

        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway)
        );

        $("#trainTable > tbody").append(newRow);
    });