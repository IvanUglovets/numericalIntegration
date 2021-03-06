"use strict";
const radioSinus = document.querySelector(".radio__sin");
const radioExp = document.querySelector(".radio__exp");
const radioX = document.querySelector(".radio__x");
const radioAll = document.querySelectorAll("input");

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const unitX = Math.PI / 2;
const unitY = 1;

function func(x) {
  if (radioSinus.checked) {
    return Math.sin(x);
  }
  if (radioExp.checked) {
    return Math.exp(-x);
  }
  if (radioX.checked) {
    return -x;
  }
}

function reloadScript(url) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}

reloadScript("js/trapDemo.js");

const slider = {};
const buff = {};

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background("#eee");
  function initializationSlider() {
    slider.zoom = createSlider(1, 150, 100);
    slider.a = createSlider(-100, 100, -15);
    slider.b = createSlider(-100, 100, 20);
    slider.n = createSlider(1, 30, 4);

    slider.zoom.position(20, 20);
    slider.a.position(20, 50);
    slider.b.position(20, 80);
    slider.n.position(20, 110);
  }
  initializationSlider();
}

function draw() {
  const zoom = slider.zoom.value();
  const a = slider.a.value() / 10;
  const b = slider.b.value() / 10;
  const n = slider.n.value();

  if (zoom !== buff.zoom || a !== buff.a || b !== buff.b || n !== buff.n) {
    buff.zoom = zoom;
    buff.a = a;
    buff.b = b;
    buff.n = n;

    printGraph(zoom, a, b, n);
  }

  // fill("#fff");
  // rect(WIDTH - 65, HEIGHT - 15, 65, -20);
  // fill("blue");
  // text(Math.round(frameRate()) + " FPS", WIDTH - 60, HEIGHT - 20);
}

function printGraph(zoom, a, b, n) {
  background("#fff");

  translate(WIDTH / 2, HEIGHT / 2);

  function drawUnitXY() {
    stroke("#e5d5d5");
    for (let k = 1; k < Math.ceil(WIDTH / (unitX * zoom) / 2); k++) {
      line(k * unitX * zoom, HEIGHT / 2, k * unitX * zoom, -HEIGHT / 2);

      line(-k * unitX * zoom, HEIGHT / 2, -k * unitX * zoom, -HEIGHT / 2);
    }

    // unitY
    for (let k = 1; k < Math.ceil(HEIGHT / (unitY * zoom) / 2); k++) {
      line(-WIDTH / 2, k * unitY * zoom, WIDTH / 2, k * unitY * zoom);

      line(-WIDTH / 2, -k * unitY * zoom, WIDTH / 2, -k * unitY * zoom);
    }
  }
  function drawXY() {
    // X
    stroke("red");
    strokeWeight(1.5);
    line(-WIDTH / 2, 0, WIDTH / 2, 0);
    textSize(20);
    text("0", 0, 17);
    endShape();

    // Y
    line(0, -HEIGHT / 2, 0, HEIGHT / 2);
  }
  function borderXY() {
    // X = a
    beginShape();
    stroke(0);
    fill(0, 0, 0);
    textSize(14);
    text(`a = ${a}`, a * zoom, 20);
    stroke("#00f");
    line(a * zoom, -HEIGHT / 2, a * zoom, HEIGHT / 2);
    endShape();
    // X = b
    beginShape();
    stroke(0);
    fill(0, 0, 0);
    textSize(14);
    text(`b = ${b}`, b * zoom, 20);
    stroke("#00f");
    line(b * zoom, -HEIGHT / 2, b * zoom, HEIGHT / 2);
    endShape();
  }
  function drawPlot() {
    // plot function
    stroke(0);
    for (let x = -WIDTH / 2; x < (WIDTH / 2) * zoom; x++) {
      point(x, zoom * -func(x / zoom));
    }
  }

  drawUnitXY();
  drawXY();
  borderXY();
  drawPlot();

  // integral
  const dx = (b - a) / n;

  // intervals
  noFill();
  stroke(0, 0, 0, 127);
  for (let i = 1; i < n; i++) {
    let x0 = a + i * dx;

    line(x0 * zoom, 0, x0 * zoom, -func(x0) * zoom);
    beginShape();
    fill(255, 0, 0);
    circle(x0 * zoom, -func(x0) * zoom, 3.5);
    endShape();
    text(`x${i}`, x0 * zoom, 10);
  }

  let area = 0;

  for (let i = 0; i < n; i++) {
    let x0 = a + i * dx;
    let x1 = a + (i + 1) * dx;
    noStroke();
    fill(255, 127, 0, 127);
    beginShape();
    vertex(x0 * zoom, 0);
    vertex(x1 * zoom, 0);
    vertex(x1 * zoom, -func(x1) * zoom);
    vertex(x0 * zoom, -func(x0) * zoom);
    endShape();

    area += ((func(x0) + func(x1)) * dx) / 2;
  }
  // slider text
  translate(-WIDTH / 2, -HEIGHT / 2);
  stroke("transparent");
  fill(0);
  text("zoom:" + zoom + "%", slider.zoom.x * 2 + slider.zoom.width, 30);
  text("a: " + a, slider.a.x * 2 + slider.a.width, 60);
  text("b: " + b, slider.b.x * 2 + slider.b.width, 90);
  text("n: " + n, slider.n.x * 2 + slider.n.width, 120);
  beginShape();
  textSize(18);
  text("???y(x)dx = " + area.toPrecision(8), 22, 150);
  endShape();
}
