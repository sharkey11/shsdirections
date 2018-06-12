"use strict";

var express = require('express');
var app = express();
app.use(express.static('public'))
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var stair;
var post;

app.post('/get',function(req,res){
  console.log(req.body)
console.log(req.body.room1)
  var room1 = req.body.room1
  var room2 = req.body.room2

  res.send(getDirections(room1,room2))

})



function getDirections(room1,room2) {
  // room1 = toString(room1)
  // room2 = toString(room2)
  //fix syntax error in this block
  if (parseInt(room1.substring(1)) > 70 || parseInt(room2.substring(1)) >70 || (parseInt(room2) > 12 && parseInt(room2) < 1000) || parseInt(room1) > 3070 || parseInt(room2) > 3070) {
    alert("Not a real room!")
  }  else if (parseInt(room1) <= 12) {
    alert("Not possible...yet. Ask someone!")
  } 
  console.log(room1)
  if (parseInt(room2) <= 12) {
    stair = new Stairway(room1, room2);
    stair.checkFloor();
    stair.chooseStairway();
    post = new PostStairway(room1, room2);
    post.specialCase();
    if (stair.floorDifference > 0) {
      console.log("here")
      add("Take a " + stair.orientation + " and go to '" + stair.correctStaircase + "'.  Go to floor 1.");
    }
    add("Take a " + post.directionOrientation + " and walk until you reach the lobby.");

    if (parseInt(room2) === 1) {
      add("You have arrived at your destination.");
    }
    if (parseInt(room2) === 2) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Take a left and go straight. The fieldhouse will be on your right.");
    }
    if (parseInt(room2) === 3) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Take a left and go sraight. Keep going straight through the health hallway(past the fieldhouse). The swimming will be on your right.");
    }
    if (parseInt(room2) === 4) {
      add("Take a right(towards the secretary's desk). Go straight. The nurse's office will be on your left.");
    }
    if (parseInt(room2) === 5) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria.");
    }
    if (parseInt(room2) === 6) {
      add("Go straight, past the auditorium. The library will be at the end of the hallway on the right.")
    }
    if (parseInt(room2) === 7) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a right into the long hallway before the library.")
      add("Walk straight. Guidance will be roughly halfway down the hallway on the right.")
    }
    if (parseInt(room2) === 8) {
      add("Go straight. The auditorium will be on your left and up the stairs.");
    }
    if (parseInt(room2) === 9) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Once out of the cafeteria, go through the double doors straight ahead and down the stairs.")
      add("Go through the door and up the stairs, and walk down the hallway.")
      add("Once out of the hallway, take a right and a left. The boys locker room will be on the right.")
    }
    if (parseInt(room2) === 10) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Once out of the cafeteria, go through the double doors straight ahead and down the stairs.");
      add("Go through the door and up the stairs.");
      add("The girls locker room will be on the left.");
    }
    if (parseInt(room2) === 11) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Once out of the cafeteria, go through the double doors straight ahead and down the stairs.");
      add("Go through the door and up the stairs.");
      add("The trainer's office is the first door on the left.");
    }
    if (parseInt(room2) === 12) {
      add("Go straight, past the auditorium until you reach intersection of the ramp and the entrance to the library.");
      add("Take a left up the ramp followed by a right into the cafeteria. Go straight though the cafeteria.");
      add("Take a left and go straight. The smaller gym will be on your right, before the turn to the fieldhouse.");
    }
  }
  else {
    stair = new Stairway(room1, room2);
    stair.checkFloor();
    stair.chooseStairway();
    post = new PostStairway(room1, room2);
    post.nextDirection();
  }
  if (stair.floorChange > 0 && parseInt(room1) > 12 && parseInt(room2) > 12 && parseInt(room1) < 3070 && parseInt(room2) < 3070) {
    add("Take a " + stair.orientation + " and go to '" + stair.correctStaircase + "'.  Go to floor " + stair.secondFloor + ".");
    add("Once you're at floor " + stair.secondFloor + ", take a " + post.directionOrientation + " and walk until you reach room " + stair.second + ".");
    add("You have arrived at your destination.");
  } else if (parseInt(room1) > 12 && parseInt(room2) > 12 && stair.floorChange == 0) {
    add("Take a " + post.directionOrientation + " and walk until you reach room " + stair.second + ".");
    add("You have arrived at your destination.");
  }
  return JSON.stringify(json)
}

// });



//drawing for the inputs





function distance(x1, y1, x2, y2) {
  return(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}






function Stairway(room1, room2) {
  this.first = room1;
  this.second = room2;
  this.secondFloor = this.second.charAt(0);
  this.floorDifference = this.first.charAt(0) - this.second.charAt(0);
  this.roomNumber = this.first.substring(2);
  this.floorChange = 0;
  this.orientation = "";
  this.correctStaircase = "";

  this.checkFloor = function() {
    if (this.floorDifference == 0) {
      this.floorChange = 0
    }
    if (this.floorDifference == 1) {
      this.floorChange = 1
    }
    if (this.floorDifference == 2) {
      this.floorChange = 2
    }
    if (this.floorDifference == -1) {
      this.floorChange = 1
    }
    if (this.floorDifference == -2) {
      this.floorChange = 2
    }
    if (this.floorDifference == -3) {
      this.floorChange = 3
    }
  }

  this.chooseStairway = function() {

    if (this.floorChange >= 1) {

      if (this.roomNumber <= 15) {
        this.correctStaircase = "staircase L"
        this.orientation = 'left'
      }
      if (this.roomNumber >= 15 && this.roomNumber <= 30) {
        this.correctStaircase = "Staircase M"
        this.orientation = 'right'
      }
      if (this.roomNumber >= 30 && this.roomNumber <= 40) {
        this.correctStaircase = "Staircase N"
        this.orientation = 'left'
      }
      if (this.roomNumber >= 40 && this.roomNumber <= 50) {
        this.correctStaircase = "Staircase O"
        this.orientation = 'right'
      }
      if (this.roomNumber >= 50 && this.roomNumber <= 60) {
        this.correctStaircase = "Staircase P"
        this.orientation = 'left'
      }
      if (this.roomNumber >= 60 && this.roomNumber <= 70) {
        this.correctStaircase = "Staircase Q"
        this.orientation = 'right'
      }
    }
  }
}

function PostStairway(room1, room2) {
  this.startingRoom = parseInt(stair.first.substring(2));
  this.destination = parseInt(stair.second.substring(2));
  this.staircase = (stair.correctStaircase.substring(10))

    this.nextDirection = function() {
      if (this.staircase == 'L') {
        this.directionOrientation = "left";
      }
      if (this.staircase == 'M') {
        this.roomAtStaircase = 19;
        if (this.destination < this.roomAtStaircase) {
          this.directionOrientation = 'left';
        } else {
          this.directionOrientation = 'right';
        }
      }
      if (this.staircase == 'N') {
        this.roomAtStaircase = 27;
        if (this.destination < this.roomAtStaircase) {
          this.directionOrientation = 'left';
        } else {
          this.directionOrientation = 'right';
        }
        console.log(this.directionOrientation)
      }
      if (this.staircase == 'O') {
        this.roomAtStaircase = 40
        if (this.destination < this.roomAtStaircase) {
          this.directionOrientation = 'left';
        } else {
          this.directionOrientation = 'right';
        }
      }
      if (this.staircase == 'P') {
        this.roomAtStaircase = 50
        if (this.destination < this.roomAtStaircase) {
          this.directionOrientation = 'left';
        } else {
          this.directionOrientation = 'right';
        }
        console.log(this.directionOrientation)
      }
      if (this.staircase == 'Q') {
        this.roomAtStaircase = 60
        if (this.destination < this.roomAtStaircase) {
          this.directionOrientation = 'left';
        } else {
          this.directionOrientation = 'right';
        }
        console.log(this.directionOrientation)
      }

      if (this.startingRoom%2 == 0) {
        if (this.startingRoom > this.destination ) {
          this.directionOrientation = 'left';
        } else if (this.startingRoom < this.destination) {
          this.directionOrientation = 'right'
        }
      }


      if (this.startingRoom%2 !== 0) {
        if (this.startingRoom > this.destination ) {
          this.directionOrientation = 'right';
        } else if (this.startingRoom < this.destination) {
          this.directionOrientation = 'left'
        }
      }
    
  }
  this.specialCase = function() {
    if (this.startingRoom > 20 && this.startingRoom%2 == 0 ) {
      this.directionOrientation = 'left'
    }
    if (this.startingRoom < 20 && this.startingRoom%2 == 0 ) {
      this.directionOrientation = 'right'
    }
    if (this.startingRoom > 20 && this.startingRoom%2 !== 0 ) {
      this.directionOrientation = 'right'
    }
    if (this.startingRoom < 20 && this.startingRoom%2 !== 0 ) {
      this.directionOrientation = 'left'
    }

  }

}

var json = []

function add(instruction) {
  json.push(instruction)

}


//end of horizontal ending



//Routes








app.listen(port, function() {
  console.log('Port:' + port);
});
