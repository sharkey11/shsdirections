//instruction button
$(".instructions").click(function(){
  $('.ui.basic.modal')
  .modal('show');
});

var stair;
var post;

function getDirections(room1,room2) {
  console.log(room1)
  // room1 = toString(room1)
  // room2 = toString(room2)
  //fix syntax error in this block
  if (parseInt(room1.substring(1)) > 70 || parseInt(room2.substring(1)) >70 || (parseInt(room2) > 12 && parseInt(room2) < 1000) || parseInt(room1) > 3070 || parseInt(room2) > 3070) {
    alert("Not a real room!")
  }  else if (parseInt(room1) <= 12) {
    alert("Not possible...yet. Ask someone!")
  } else {
    setInterval(function(){ pb.incrementProgress(); }, 30);
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
  return json
}

// });

(function() {
  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawStuff();
  }
  resizeCanvas();

  function drawStuff() {
    // do your drawing stuff here
  }
})();

//drawing for the inputs
function NumericInput(xi, yi) {
  this.x = xi;
  this.y = yi;
  this.r = 30;
  this.color = 'black';
  this.value = '';
  this.selected = false;

  this.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);

    var output = this.value;
    if (this.selected) {
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.font = '18px sans-serif';
      if (this.value.length < 4) {
        if (Math.floor((new Date()).getTime()/500) % 2 == 0) {
          output += '|';
        } else {
          output += ' ';
        }
      }
      ctx.fillStyle = 'black';
      ctx.fillStyle = 'white';
    } else {
      ctx.fillStyle = 'grey';
      ctx.fill();

      ctx.fillStyle = 'white';
    }
    ctx.fillText(output, this.x, this.y+4);
  }

  this.isMouseover = function(x, y) {
    if (distance(this.x, this.y, x, y) <= this.r) {
      $('canvas').css('cursor', 'pointer');
    } else {
      $('canvas').css('cursor', 'default');
    }
  }

  this.isClick = function(x, y) {
    if (distance(this.x, this.y, x, y) <= this.r) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  this.isSelected = function(key) {
    if (this.selected) {
      if (key === 8) {
        this.value = this.value.substr(0, this.value.length-1);
      } else if (key === 13) {
        this.selected = false;
      } else if (key >= 48 && key <= 57 && this.value.length < 4) {
        this.value += String.fromCharCode(key);
      }
    }
  }

  return this.value;

}

var myinput = new NumericInput(180, 100);
var myinput2 = new NumericInput(1149, 490);

$('canvas').mousemove(function(evt) {
  myinput.isMouseover(evt.clientX, evt.clientY);
  myinput2.isMouseover(evt.clientX, evt.clientY);
});

$('canvas').click(function(evt) {
  myinput.isClick(evt.clientX, evt.clientY);
  myinput2.isClick(evt.clientX, evt.clientY);
});

$(document).keydown(function(evt) {
  evt.preventDefault();
  myinput.isSelected(evt.which);
  myinput2.isSelected(evt.which);
});

function distance(x1, y1, x2, y2) {
  return(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function ProgressBar() {
  this.barCircleArray = [];
  this.barCircleProgress = 0;

  this.incrementProgress = function() {
    if (this.barCircleProgress < this.barCircleArray.length) {
      this.barCircleProgress += 1;
    } else {
      page.redirect('/directions');
    }
  }

  this.addBarCircle = function(x, y) {
    var bc = new BarCircle(x, y);
    this.barCircleArray.push(bc);
  }

  this.draw = function(ctx) {
    for(var i=0; i<this.barCircleArray.length; i++) {
      this.barCircleArray[i].draw(ctx, i < this.barCircleProgress);
    }
  }
}

function BarCircle(xi, yi) {
  this.x = xi;
  this.y = yi
  this.r = 15;

  this.draw = function (ctx, state) {

    if (state == false) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.strokeStyle="#FFFFFF";
      ctx.stroke();
      ctx.clearRect(0,0,0,0)
    }

    if (state == true) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fillstyle="#FFFFFF";
      ctx.fill();
    }
  }
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
  var newDirection = $("<div class= 'instruction'>" +
    "<div>" + instruction + "</div>" +
    "<div class='aligncenter'></div>"
    );

  $('#directions .text-container').append(newDirection);

}


var pb = new ProgressBar();


//start of horizontal start
pb.addBarCircle(225, 100);
pb.addBarCircle(255, 100);
pb.addBarCircle(285, 100);
pb.addBarCircle(315, 100);

//end of horizontal start
//start of downward slope
pb.addBarCircle(335, 123);
pb.addBarCircle(355, 146);
pb.addBarCircle(375, 169);
pb.addBarCircle(395, 192);
pb.addBarCircle(415, 215);
pb.addBarCircle(435, 238);
pb.addBarCircle(455, 261);
pb.addBarCircle(475, 284);
pb.addBarCircle(495, 307);
pb.addBarCircle(515, 330);
pb.addBarCircle(535, 353);
pb.addBarCircle(555, 376);
pb.addBarCircle(575, 399);
pb.addBarCircle(595, 422);
pb.addBarCircle(615, 445);
pb.addBarCircle(635, 468);
pb.addBarCircle(655, 491);
//end of downward slope
//start of horizontal ending
pb.addBarCircle(655, 491);
pb.addBarCircle(685, 491);
pb.addBarCircle(715, 491);
pb.addBarCircle(745, 491);
pb.addBarCircle(775, 491);
pb.addBarCircle(805, 491);
pb.addBarCircle(835, 491);
pb.addBarCircle(865, 491);
pb.addBarCircle(895, 491);
pb.addBarCircle(925, 491);
pb.addBarCircle(955, 491);
pb.addBarCircle(985, 491);
pb.addBarCircle(1015, 491);
pb.addBarCircle(1045, 491);
pb.addBarCircle(1075, 491);
pb.addBarCircle(1105, 491);
//end of horizontal ending

function drawLoop() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  myinput.draw(ctx);
  myinput2.draw(ctx);
  pb.draw(ctx);

  window.requestAnimationFrame(drawLoop);

}

drawLoop();

//Routes

function directions() {
  $('canvas').hide();
  $('.go').hide();
  $('.instructions').hide();
  $('section#directions').show();


}

function index() {
  $('section#directions').hide();
}

page('/', index);
page('/directions', directions)
page({
  hashbang: true
});
