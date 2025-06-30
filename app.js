const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let tool = "pencil";
let color = "#000000";
let size = 3;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseleave", () => (drawing = false));

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  drawing = true;
});
canvas.addEventListener("touchend", () => (drawing = false));
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  draw({ offsetX: x, offsetY: y });
});

function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = tool === "eraser" ? "white" : color;
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, tool === "eraser" ? 10 : size, 0, Math.PI * 2);
  ctx.fill();
}

function setTool(t) {
  tool = t;
}

function changeColor(c) {
  color = c;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
