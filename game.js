
var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
// canvas.height = document.body.clientHeight;
// canvas.width = 1284;
canvas.height = window.innerHeight - 100;
// document.body.appendChild(canvas);


// var usrName = localStorage.getItem("myValue");
var usrURL = localStorage.getItem("myValue");

// document.getElementById("usrImg").src = "' + usrURL + '";
document.getElementById("usrImg").src = usrURL;
// document.getElementById("userName").innerHTML = usrName;



// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/f1.png";

// Alien image
var alienReady = false;
var alienImage = new Image();
alienImage.onload = function () {
  alienReady = true;
};
alienImage.src = "images/alien.png";


var touchInfo = {
  clicked: false,
  x: 0,
  y: 0
};

var mySound = new Audio("images/backgroundmusic.mp3");
var mybulletSound = new Audio("images/shootnew.wav");
var mute = false;
var accX = 0;
var accY = 0;
var accZ = 0;

// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final
// Author: @jrathod9
// Reason: To get the basic structure of the game. Code has been modified to work for my game
// Section:1 starts here...

var totalBullets = 0; 		//bullets on screen
var health = 100;			//health of player
var kills = 0;				//total aliens killed
var maxAliens = 5;			//Max aliens on the screen
var bulletSpeed = 7;		//Speed of the bullet
var alienSpeed = 0.2;		//Speed of the aliens
var level = 0;				//Difficulty Level
var maxStars = 150;			//Stars on screen
var starSpeed = 5;			//Star speed

var alive = 2;				//1 alive 0 dead

//Will be used to add a flickering effect to the bullets and spaceshuttle
var bulletColors = ["cyan", "aqua", "turquoise", "teal", "lightcyan", "mediumaquamarine", "blue", "black"];

/* THESE VARIABLES ARE FOR DRAWING THE SHUTTLE AND ALIENS */
//spaceshuttle props and dimensions
var cannonw = 10, cannonh = 20;
var midBottomw = 24, midBottomh = 20, midTopw = 16, midToph = 20;
var baseBottomw = 36, baseBottomh = 24, baseTopw = 28, baseToph = 24;
var ridgew = 16, ridgeh = 16;
var colorBack = "aqua", colorFront = "blue";
var shuttleSpeedh = 7;
var shuttleSpeedv = 4;
//alien props and dimanesions
var bunw = 20, bunh = 6;
var headw = 26, headh = 6;
var facew = 30, faceh = 18;
var layer1w = 5, layer1h = 5;
var layer2w = 4, layer2h = 4;
var midw = 3, midh = 3;

var keys = [];

//Shuttle object
var shuttle = function (x, y) {
  this.x = x;
  this.y = y;
}

//Alien object
var alien = function (x, y) {
  this.x = x;
  this.y = y;
}

//Bullet object
var bullet = function (x, y) {
  this.x = x;
  this.y = y;
}

//Star object
var star = function (x, y, rad) {
  this.x = x;
  this.y = y;
  this.rad = rad;
}

var Stars = new Array();
var Bullets = new Array();
var Aliens = new Array();

var alien1 = new alien(Math.random() * (window.innerWidth - 100), Math.random() * (window.innerHeight / 2 - 300));

for (a = 0; a < maxAliens; a++) {
  var temp = new alien(Math.random() * (window.innerWidth - 100), Math.random() * (window.innerHeight / 2 - 300));
  Aliens.push(temp);
}

//Fill the array of stars 
for (a = 0; a < maxStars; a++) {
  var temp = new star(Math.random() * (window.innerWidth - 20), Math.random() * (window.innerHeight - 20), Math.random() * 3);
  Stars.push(temp);
}

var posx = window.innerWidth / 2, posy = 650;
var player = new shuttle(posx, posy);

function draw() {

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  //Draw Stars
  for (j = 0; j < maxStars; j++) {
    c.beginPath();
    c.fillStyle = 'rgba(255,255,255,0.7)';
    c.arc(Stars[j].x, Stars[j].y, Stars[j].rad, 0, Math.PI * 2, false);
    Stars[j].y += starSpeed;
    if (Stars[j].y >= window.innerHeight - 20) {
      Stars[j].y = 0;
    }
    c.closePath();
    c.fill();
  }

  if (alive == 1) {
    for (a = 0; a < Aliens.length; a++) {
      Aliens[a].y += alienSpeed;
      drawAlien(Aliens[a]);
    }

    //Check if alien touches shuttle or crosses screen to reduce health
    for (j = 0; j < Aliens.length; j++) {
      if (Math.abs(Aliens[j].y - player.y) <= 10 && Math.abs(Aliens[j].x - player.x) <= 10 || Aliens[j].y >= window.innerHeight - 100) {
        health -= 20;

        if (health == 0)			//If health goes to 0 state = dead
          alive = 0;

        var addAlien = new alien(Math.random() * (window.innerWidth - 100) + 60, Math.random() * (window.innerHeight / 2 - 300), Math.floor(Math.random() * 2));
        Aliens[j] = addAlien;
      }
    }

// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final
// Author: @jrathod9
// Reason: To get the basic structure of the game. Code has been modified to work for my game
// Section:1 ends here.


    //drawing score
    document.getElementById("Score").innerHTML = kills;



    //Drawing the health bar

    if (health == 80) {
      document.getElementById("healthbar").src = "images/health2.png";
    }
    else if (health == 60) {
      document.getElementById("healthbar").src = "images/health3.png";
    }
    else if (health == 40) {
      document.getElementById("healthbar").src = "images/health4.png";
    }
    else if (health == 20) {
      document.getElementById("healthbar").src = "images/health5.png";
    }
    else if (health == 0) {
      document.getElementById("healthbar").src = "images/health6.png";
    }

    //Check bullets that left the screen and remove them from array
    for (a = 0; a < Bullets.length; a++) {
      if (Bullets[a].y <= 0) {
        Bullets.splice(a, 1);
      }
    }

    //Update bullet coordinates to make it move and draw bullets
    for (a = 0; a < Bullets.length; a++) {
      Bullets[a].y -= bulletSpeed;
      drawBullet(Bullets[a]);
    }


// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final
// Author: @jrathod9
// Reason: To check the bullet kill and increase difficulty. Code has been modified to work for my game
// Section:2 starts here.

    //Checking for bullet kill
    for (i = 0; i < Bullets.length; i++) {
      for (j = 0; j < maxAliens; j++) {
        if (Math.abs(Bullets[i].x - Aliens[j].x) <= 35 && Bullets[i].y <= Aliens[j].y + 50 && Bullets[i].y >= Aliens[j].y - 20 && (player.y - Aliens[j].y) >= 38) {
          mybulletSound.play();
          kills++;
          Bullets[i].y = -10;
          var addAlien = new alien(Math.random() * (window.innerWidth - 100) + 60, Math.random() * (window.innerHeight / 2 - 300), Math.floor(Math.random() * 2));
          Aliens[j] = addAlien;

          //Increase difficulty with kills 
          if (kills % 10 == 0) {
            alienSpeed += 0.1;
          }
          if (kills % 20 == 0) {
            level++;
            var levelupAlien = new alien(Math.random() * (window.innerWidth - 100) + 60, Math.random() * (window.innerHeight / 2 - 300), Math.floor(Math.random() * 2));
            Aliens.push(levelupAlien);
            maxAliens++;
          }
        }
      }
    }

// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final
// Author: @jrathod9
// Reason: To check the bullet kill and increase difficulty. Code has been modified to work for my game
// Section:2 ends here.


    //Moving right if phone tileted right
    if (accX < 0) {
      temp = player.x + 4;
      if (temp > window.innerWidth - 50) {
        player.x = window.innerWidth - 50;
      }
      else {
        player.x += 4;
      }
    }

    //Moving left if phone tileted left
    if (accX > 0) {
      temp = player.x - 4;
      if (temp < 0) {
        player.x = 0;
      }
      else {
        player.x -= 4;
      }
    }

    drawShuttle(player);
  }
  else if (alive == 0) {								//DEAD STATE
    mySound.pause();
    c.beginPath();
    c.fillStyle = 'rgba(255,255,255,0.5)';
    c.font = "30px Calibri";
    c.fillText("GAME OVER!", (window.innerWidth - 100) / 2 - 55, (window.innerHeight - 200) / 2 - 30);
    c.fillText("Kills : " + kills, (window.innerWidth - 100) / 2 - 15, (window.innerHeight - 200) / 2);
    c.fillText("Accuracy : " + (kills * 100 / totalBullets).toFixed(2), (window.innerWidth - 100) / 2 - 55, (window.innerHeight - 200) / 2 + 30);
  }

  else if (alive == 2) {
    c.beginPath();
    c.fillStyle = 'rgba(255,255,255,0.5)';
    c.font = "25px Verdana";
    c.fillText("WELCOME TO THE MOON!", (window.innerWidth - 100) / 2 - 120, (window.innerHeight - 200) / 2 - 30);
    c.fillText("Press Play to start", (window.innerWidth - 100) / 2 - 70, (window.innerHeight - 150) / 2);
    // c.fillText("Accuracy : " + (kills*100/totalBullets).toFixed(2), (window.innerWidth-100)/2 - 55 , (window.innerHeight-100)/2 + 30);
  }

  requestAnimationFrame(draw);
}

draw();

function drawAlien(alien) {
  if (alienReady) {
    c.drawImage(alienImage, alien.x, alien.y);
  }
}

function drawShuttle(testShuttle) {
  if (heroReady) {
    c.drawImage(heroImage, testShuttle.x, testShuttle.y);
  }
}

// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final 
// Author: @jrathod9
// reason: draw bullets
// Section:3 starts here.

function drawBullet(thisBullet) {
  c.fillStyle = bulletColors[Math.floor(Math.random() * 6)];
  c.beginPath();
  c.arc(thisBullet.x, thisBullet.y + 10, 2.5, 0, Math.PI * 2, false);
  c.fillRect(thisBullet.x - 2.5, thisBullet.y + 10, 5, 5);
  c.closePath();
  c.fill();
}

// Collected from https://github.com/jrathod9/Making-of-Space-X-/tree/master/Phase%204/Final 
// Author: @jrathod9
// Section ends here.

// touch event is detected and if alive shoot bullet
window.addEventListener("touchstart", function (e) {
  touchInfo.x = e.touches[0].clientX;
  touchInfo.y = e.touches[0].clientY;
  touchInfo.clicked = true;

  if (alive == 1) {
    var temp = new bullet(player.x + 15, player.y);
    totalBullets++;
    Bullets.push(temp);
  }

});

//accelerometer coordinates
function processDeviceMotionEvent(acceleration) {
  accX = Math.round(acceleration.x);
  accY = Math.round(acceleration.y);
  accZ = Math.round(acceleration.z);
}

function onError() {
  alert('onError!');
}

var options = { frequency: 100 };  // Update every 3 seconds

var watchID;


function muteVolume() {
  if (mute) {
    mySound.play();
    mute = false;
  }
  else {
    mySound.pause();
    mute = true;
  }
}

function reset() {
  document.getElementById("healthbar").src = "images/health1.png";
  alive = 1
  totalBullets = 0; 		//bullets on screen
  health = 100;			//health of player
  kills = 0;				//total aliens killed
  maxAliens = 5;			//Max aliens on the screen
  bulletSpeed = 7;		//Speed of the bullet
  alienSpeed = 0.2;		//Speed of the aliens
  level = 0;				//Difficulty Level
  maxStars = 150;			//Stars on screen
  starSpeed = 5;			//Star speed
  Aliens = new Array();
  for (a = 0; a < maxAliens; a++) {
    var temp = new alien(Math.random() * (window.innerWidth - 100), Math.random() * (window.innerHeight / 2 - 300));
    Aliens.push(temp);
  }
  Bullets = new Array();
}

function StartGame() {
  console.debug('Add devicemotion listener ');
  watchID = navigator.accelerometer.watchAcceleration(processDeviceMotionEvent, onError, options);
  reset();
  mySound.play();
}

function StopGame() {
  console.debug('Remove devicemotion listener ');
  navigator.accelerometer.clearWatch(watchID);
  alive = 0;
  mySound.pause();
}