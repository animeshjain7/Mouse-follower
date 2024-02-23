const coords = { x: 0, y: 0 };
const wrapper = document.getElementById("wrapper");
const circles = document.querySelectorAll(".circle");
const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 10 + "px";
    circle.style.top = y - 10 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

window.addEventListener("mousemove", function xyz(e) {
  wrapper.style.left = e.clientX - 11 + "px";
  wrapper.style.top = e.clientY - 11 + "px";
});

let wrapperScaleValue = 1;
let scaling = false;
const logButtons = (e) => {
  if (e.buttons === 1) {
    console.log(e.buttons);
    scaling = true;
    animateScaleUp();
  } else if (e.buttons === 0) {
    console.log(e.buttons);
    scaling = false;
    animateScaleDown();
  }
};

function animateScaleUp() {
  if (scaling) wrapperScaleValue += 0.01; // Increase scale value
  wrapper.style.transform = `scale(${wrapperScaleValue})`; // Apply the scale transformation
  requestAnimationFrame(animateScaleUp); // Call animateScale recursively
}

function animateScaleDown() {
  if (!scaling && wrapperScaleValue > 1) {
    wrapperScaleValue -= 0.01; // Decrease scale value
    wrapper.style.transform = `scale(${wrapperScaleValue})`; // Apply the scale transformation
    requestAnimationFrame(animateScaleDown); // Call animateScale recursively
  }
}

wrapper.addEventListener("mousedown", logButtons, false);
wrapper.addEventListener("mouseup", logButtons, false);
