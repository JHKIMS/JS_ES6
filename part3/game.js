let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

/* ctx.fillStyle = 'dodgerblue';
ctx.fillRect(10, 10, 100, 100); */

let img2 = new Image();
img2.src='dinosaur.png';

let dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y);
  },
};

let img1 = new Image();
img1.src='cactus.png';

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y);
  }
}

let timer = 0;
let cactusMany = [];
let jumpTimer = 0;
let animation;
let switchBtn = false;


function move() {
  animation = requestAnimationFrame(move);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    let cactus = new Cactus();
    cactusMany.push(cactus);
    cactus.draw();
  }
  // dino.x++; //캐릭터 움직이기

  cactusMany.forEach((a, i, o) => {
    // x좌표가 0미만이면 제거
    if (a.x < 0) o.splice(i, 1);

    a.x--;

    conflict(dino, a);

    a.draw();
  })

  // 점프하기
  if(switchBtn == true) {
    dino.y--;
    jumpTimer++;
  }
  if(switchBtn == false){
    if(dino.y < 200){
        dino.y++;
    }
  }
  if(jumpTimer>100) {
    switchBtn=false;
    jumpTimer=0;
  }

  dino.draw();
}


move();

// 충돌 체크하기
function conflict(dino, cactus){
  let xWidth = cactus.x - (dino.x+dino.width);
  let yHeight = cactus.y - (dino.y+dino.height);
  if(xWidth<0 && yHeight<0){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animation)
  }
}

//  점프하기
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    switchBtn = true;
  }
});




