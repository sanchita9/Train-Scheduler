$(document).ready(function() {
		// console.log(Page Loaded);
	
	var trainName = "";
	var trainDestination = "";
	var trainTime = "";
	var trainFrequency = "";
	var nextTrainArrival = "";
	var minutesAway = "";

	//initialize Firebase 
	var config = {
    	apiKey: "AIzaSyC-vbi-v3VGc2bFt_4oztdOLv4vg6O_Wi4",
    	authDomain: "sanchita-mohite.firebaseapp.com",
    	databaseURL: "https://sanchita-mohite.firebaseio.com",
    	projectId: "sanchita-mohite",
    	storageBucket: "sanchita-mohite.appspot.com",
    	messagingSenderId: "14314761031"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainButton").on("click", function(event) {
  		event.preventDefault();

  	var trainName = $("#trainNameInput").val().trim();
  	var destination = $("#destinationInput").val().trim();
  	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
  	var frequency = $("#frequencyInput").val().trim();

  	// Creates local "temporary"object for holding trains data

  	var newTrainInfo = {
  		trainName : trainName,
  		destination : destination,
  		firstTrainTime : firstTrainTime,
  		frequency : frequency

  	}
  	// Uploads train date to the database
  	database.ref().push(newTrainInfo);

  	// Logs everything to console
  	console.log(newTrainInfo.trainName);
  	console.log(newTrainInfo.destination);
  	console.log(newTrainInfo.firstTrainTime);
  	console.log(newTrainInfo.frequency);

  	// Alert
  	alert("Train Information successfully added");

  	// Clears all of the text boxes
  	$("#trainNameInput").val("");
  	$("#destinationInput").val("");
  	$("#firstTrainTimeInput").val("");
  	$("#frequencyInput").val("");
   });

  // Create Firebase event for adding train information to the database and a row in the html when an user adds an entry
  database.ref().on("child_added", function(childSnapShot) {

  	console.log(childSnapShot.val());

  		var trainName = childSnapShot.val().trainName;
  		var destination = childSnapShot.val().destination;
  		var firstTrainTime = childSnapShot.val().firstTrainTime;
  		var frequency = childSnapShot.val().frequency;

  	console.log(childSnapShot.val());
  	
  	// Train Information
  	console.log(trainName);
  	console.log(destination);
  	console.log(firstTrainTime);
  	console.log(frequency);

  		var firstTrainMoment = moment(firstTrainTime, "HH:mm");
  		console.log(firstTrainMoment);
  		var currentTime = moment().format("HH:mm");
  		console.log("Current Time: "+currentTime);

  		// store difference between currentTime and first train converted in variable

  		var minutesSinceFirstArrival = moment().diff(moment(firstTrainMoment, "minutes"));
  			console.log(firstTrainMoment);
  			console.log("Difference: " + minutesSinceFirstArrival);
  		var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  		var minutesAway = frequency - minutesSinceLastArrival;

  		var nextArrival = moment().add(minutesAway, "minutes");
  		var formatNextArrival = nextArrival.format("HH:mm");

  	$("#trainTable > tbody").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+firstTrainTime+"</td><td>"+frequency+"</td><td>"+formatNextArrival+"</td></tr>")

  	});  

});