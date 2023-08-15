let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let header = document.querySelector("header");
function adjustCanvasSize() {
  canvas.height = window.innerHeight - header.clientHeight;
  canvas.width = window.innerWidth;
}
adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let clearBtn = document.querySelector(".tools .clear");
clearBtn.addEventListener("click", clearCanvas);

//start draw
let isMouseDown;
ctx.lineCap = "round";
function draw(e) {
  if (!isMouseDown) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // to make drawing line smooth
  // ctx.beginPath();
  // ctx.moveTo(e.offsetX, e.offsetY);
}
canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  draw(e);
});
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
  ctx.beginPath();
});
canvas.addEventListener("mouseout", () => {
  isMouseDown = false;
});
canvas.addEventListener("mousemove", draw);
// touche
function drawTouche(e) {
  if (!isMouseDown) return;
  ctx.lineTo(e.clientX, e.clientY - 50);
  ctx.moveTo(e.clientX, e.clientY - 50);
  ctx.stroke();
}
canvas.addEventListener("touchstart", (e) => {
  isMouseDown = true;
  drawTouche(e.changedTouches[0]);
});
canvas.addEventListener("touchend", () => {
  isMouseDown = false;
  ctx.beginPath();
});
canvas.addEventListener("touchmove", (e) => {
  drawTouche(e.changedTouches[0]);
});

let color = document.querySelector("#color");
let size = document.querySelector("#size");
color.addEventListener("change", () => {
  ctx.strokeStyle = color.value;
});

size.addEventListener("change", () => {
  ctx.lineWidth = size.value;
});

savebtn = document.querySelector(".save");
savebtn.addEventListener("click", () => {
  let img = canvas.toDataURL("image/jpg");
  savebtn.href = img;
});
