var canvas;
var ctx;
var w = 500;
var h = 700;


var gameOver = false;
var startGame = false;


var time = 30;
var second = 0;
var score = 0;
var moleTimer = 0;

var activeMoleRow = 0;
var activeMoleColumn = 0;
var img;

var imgMole;
var imgDead;

const cursor = document.querySelector('.cursor')

window.addEventListener('mousemove', e => {
  cursor.style.top = (e.pageY-50) + 'px'
  cursor.style.left = (e.pageX+20) + 'px'
})

window.addEventListener('mousedown', () => {
  cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
  cursor.classList.remove('active')
})


var boardCordinates = [
  [{ "x": 70, "y": 330 }, { "x": 250, "y": 330 }, { "x": 430, "y": 330 }],
  [{ "x": 70, "y": 480 }, { "x": 250, "y": 480 }, { "x": 430, "y": 480 }],
  [{ "x": 70, "y": 630 }, { "x": 250, "y": 630 }, { "x": 430, "y": 630 }]
]

document.addEventListener("keydown", function (evt) {

  if (evt.code==="Space") {
    startGame = true;
  }

  if (gameOver == true) {
    gameOver=false;
    time = 30;
    second = 0;
    score = 0;
    moleTimer = 0;
    img=imgMole;
  }
});


function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "40px Helvetica";
  ctx.fillStyle = "#0000F7";
  ctx.textAlign = "center";
  ctx.fillText("Score :" + score, w / 2, 160);
}

function drawTime() {
  ctx.fillStyle = "black";
  ctx.font = "25px Helvetica";
  ctx.fillStyle = "hsla(white,80%,70%,1)";
  ctx.textAlign = "center";
  ctx.fillText("Time :" + time, w / 2, 220);

  second = second + 1;

  if (second % 120 == 0) {
    time = time - 1;
  }

  if (time == 0) {
    gameOver = true;
  }
}

function drawBoard() {

  ctx.beginPath();
  ctx.fillStyle = "#dadada";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "50px Helvetica";
  ctx.fillStyle = "#FF0000";
  ctx.textAlign = "center";
  ctx.fillText("Whack The Mole", w / 2, 100);


  for (let row = 0; row < boardCordinates.length; row++) {
    for (let column = 0; column < boardCordinates[row].length; column++) {
      const element = boardCordinates[row][column];


      ctx.beginPath();
      ctx.arc(element.x, element.y, 60, 0, 2 * Math.PI);
      ctx.fillStyle = "#9B7653";
      ctx.fill();
      ctx.stroke();


    }
  }




}

function loadMoleCordinate()
{
  activeMoleRow = RandomIntInRange(0, 3);
  activeMoleColumn = RandomIntInRange(0, 3);
}

function drawMole() {

  moleTimer = moleTimer + 1;

  if (moleTimer % 120 == 0)
  {
    loadMoleCordinate();
    moleTimer = 0;
    img=imgMole;
  }

  if (activeMoleRow >= 3) 
  {
    activeMoleRow -= 1;
  }

  if (activeMoleColumn >= 3)
  {
    activeMoleColumn -= 1;
  }

  ctx.drawImage(img, boardCordinates[activeMoleRow][activeMoleColumn].x - 46, boardCordinates[activeMoleRow][activeMoleColumn].y - 55, 100, 100)

}

function RandomIntInRange(min, max)
{
  return Math.round(Math.random() * (max - min) + min);
}

function Start()
{
  activeMoleRow = RandomIntInRange(0, 3);
  activeMoleColumn = RandomIntInRange(0, 3);
  setUpCanvas();

  img = new Image();
  img.src = "Images/mole.svg"
  
  imgMole = new Image();
  imgMole.src = "Images/mole.svg"


  imgDead = new Image();
  imgDead.src = "Images/dead.png"

  requestAnimationFrame(Update);
}

function endingPage()
{

  ctx.beginPath();
  ctx.fillStyle = "#dadada";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "70px Helvetica";
  ctx.fillStyle = "hsla(black,80%,70%,1)";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", w / 2, h / 2 - 30);
  ctx.font = "30px Helvetica";
  ctx.fillText("Your score is " + score, w / 2, h / 2 + 30);
  ctx.font = "15px Helvetica";
  ctx.fillText("PRESS SPACE TO RESTART", w / 2, h - 100);

}

function startingPage()
{

  ctx.beginPath();
  ctx.fillStyle = "#dadada";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "50px Helvetica";
  ctx.fillStyle = "hsla(white,80%,70%,1)";
  ctx.textAlign = "center";
  ctx.fillText("Whack The Mole", w / 2, h / 2 - 30);
  ctx.font = "30px Helvetica";
  ctx.fillText("PRESS SPACE TO START", w / 2, h - 100);


}

function clearCanvas()
{

  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function ckickEvent(event)
{

  let rect=canvas.getBoundingClientRect();

  let x=event.clientX-rect.left;
  let y=event.clientY-rect.top;

      const element = boardCordinates[activeMoleRow][activeMoleColumn];
      const distance=Math.sqrt(((x-element.x)*(x-element.x))+((y-element.y)*(y-element.y)));

      if (distance<60) {
        
        img=imgDead;

        score=score+1;
        moleTimer=20;
        return true;
      }
}


function Update()
{

  requestAnimationFrame(Update);

  if (startGame == true && gameOver == false) {

    clearCanvas();
    drawBoard();
    drawMole();
    drawScore();
    drawTime();
  }
  else if (gameOver == true) {

    endingPage();

  }
  else {
    startingPage();
  }
}



Start();

function setUpCanvas() 
{
  canvas = document.querySelector("#myCanvas");
  canvas.addEventListener('click',(event)=>{ckickEvent(event)})
  ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  canvas.style.border = "2px solid white";
}