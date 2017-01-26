// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var green = new Howl({
  src:['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3']
});

var yellow = new Howl({
  src:['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3']
});

var red = new Howl({
  src:['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3']
});

var blue = new Howl({
  src:['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']
});

var sequence = [0];
var curr = 0;
var score = 0;
var active = true;
var hard = false;

$("#green").on('mousedown', function(){
  if(active){
    $("#green").css("background-color", "#2BCB77");
    green.play();
  }
});

$("#green").on('mouseup', function(){
  $("#green").css("background-color", "#16894C");
  checkPress(1);
});

$('#yellow').on("mousedown", function(){
  if(active){
    $("#yellow").css("background-color", "#FED93F");
    yellow.play();
  }
});

$("#yellow").on('mouseup', function(){
  $("#yellow").css("background-color", "#BDA004");
  checkPress(2);
});

$('#red').on("mousedown", function(){
  if(active){
    $("#red").css("background-color", "#E4694A");
    red.play();
  }
});

$("#red").on('mouseup', function(){
  $("#red").css("background-color", "#92301F");
  checkPress(3);
});

$('#blue').on("mousedown", function(){
  if(active){
    $("#blue").css("background-color", "#2F7FFE");
    blue.play();
  }
});

$("#blue").on('mouseup', function(){
  $("#blue").css("background-color", "#1C4A96");
  checkPress(4);
});

$("#innerSwitch").on("click", function(){
  $("#innerSwitch").toggleClass("hardSwitch");
  hard = !hard;
})

$("#start").on("click", function(){
  sequence.length = 0;
  sequence.push(pickColor());
  console.log(sequence);
  score = 0;
  $("#display").text(score);
  run();
})

function addColor(){
  sequence.push(pickColor());
  console.log(sequence);
  score++;
  $("#display").text(score);
  run();
}

function pickColor(){
  return Math.floor(Math.random()*4)+1;
}

function run(){
  active = false;
  updateTicker("WAIT...")
  sequence.forEach(function(e, i){
    setTimeout(function(){
      if(e == 1){
        green.play();
        $("#green").css("background-color", "#2BCB77");
        setTimeout(function(){
          $("#green").css("background-color", "#16894C");
        }, 500)
      }
      else if(e == 2){
        yellow.play();
        $("#yellow").css("background-color", "#FED93F");
        setTimeout(function(){
          $("#yellow").css("background-color", "#BDA004");
        }, 500)
      }
      else if(e == 3){
        $("#red").css("background-color", "#E4694A");
        setTimeout(function(){
          $("#red").css("background-color", "#92301F");
        }, 500)
        red.play();
      }
      else if(e == 4){
        $("#blue").css("background-color", "#2F7FFE");
        setTimeout(function(){
          $("#blue").css("background-color", "#1C4A96");
        }, 500)
        blue.play();
      }
    }, 600*i+500);
  })
  setTimeout(function(){
    active = true;
    updateTicker("GO")
  }, 600*sequence.length + 700)
}

function checkPress(color){
  if(active){
    if(sequence[0] != 0){
      if(sequence[curr] == color){
        if(curr == sequence.length - 1){
          curr = 0;
          addColor();
        }
        else{
          curr++;
        }
      }
      else{
        if(hard){
          sequence.length = 0;
          updateTicker("GAME OVER");
        }
        else{
          curr = 0;
          updateTicker("TRY AGAIN")
          setTimeout(function(){
            run();
          }, 500);
        }
      }
    }
  }
}

function updateTicker(text){
  $("#tickerText").text(text);
}