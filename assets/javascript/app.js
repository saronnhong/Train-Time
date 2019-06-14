var firebaseConfig = {
    apiKey: "AIzaSyApDdCPN56VbI5okIK2q7FFTNG0kb45rhw",
    authDomain: "optimum-octane-160404.firebaseapp.com",
    databaseURL: "https://optimum-octane-160404.firebaseio.com",
    projectId: "optimum-octane-160404",
    storageBucket: "optimum-octane-160404.appspot.com",
    messagingSenderId: "851843120819",
    appId: "1:851843120819:web:9f061d233efb70e9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submitId").on("click", function (event) {
    event.preventDefault();
    var myName = $("#trainName").val();
    var myDestination = $("#trainDestination").val();
    var myFirstTrain = $("#firstTrain").val();
    var myFrequency = $("#trainFrequency").val();

    database.ref().push({
        name: myName,
        destination: myDestination,
        firstTrain: myFirstTrain,
        frequency: myFrequency
    });
});

database.ref().on("child_added", function (snapshot) {
    var myName = snapshot.val().name;
    var myDestination = snapshot.val().destination;
    var myFirstTrain = snapshot.val().firstTrain;
    var myTrainFrequency = snapshot.val().frequency;

    var firstTrainNow = moment().format(myFirstTrain, "HH:mm");
    var currentTime = moment(new Date());
    var timeDiff = Math.abs(moment(firstTrainNow, 'HH:mm').diff(currentTime, 'minutes'));
    var minsAway = minsAwayCalc(myTrainFrequency, timeDiff);
    //var currentTimeMoment = moment(currentTime).format("HH:mm");
    
    var arrivalTimeLongForm = moment(currentTime).add(minsAway, "m");
    var arrivalTime = moment(arrivalTimeLongForm).format('HH:mm');
    

    var trNode = $("<tr>");
    trNode.append($("<td>").text(myName));
    trNode.append($("<td>").text(myDestination));
    trNode.append($("<td>").text(myFirstTrain));
    trNode.append($("<td>").text(myTrainFrequency));
    trNode.append($("<td>").text(arrivalTime));
    trNode.append($("<td>").text(minsAway));
    $("tbody").append(trNode);

    
});

function minsAwayCalc(frequency, timeDiff) {
    var minsAway = frequency - (timeDiff % frequency);
    return minsAway;
}


console.log(5/2);
