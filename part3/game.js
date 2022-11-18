let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

/* ctx.fillStyle = 'dodgerblue';
ctx.fillRect(10, 10, 100, 100); */

let dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
let cactusMany = [];

function move() {
  requestAnimationFrame(move);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 120 === 0) {
    let cactus = new Cactus();
    cactusMany.push(cactus);
    cactus.draw();
  }
  // dino.x++; //캐릭터 움직이기

  cactusMany.forEach((a, i, o) => {
    // x좌표가 0미만이면 제거
    if (a.x < 0) o.splice(i, 1);

    a.x--;
    a.draw();
  })

  // 점프하기
  if(switchBtn == true) {
    dino.y--;
    timer++;
  }
  if(timer>100) switchBtn=false;
  

  dino.draw();
}

//  점프하기
let switchBtn = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    switchBtn = true;
  }
});

move();
