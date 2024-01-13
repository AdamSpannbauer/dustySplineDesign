/* eslint-disable no-console */
import { genNoisySpline } from './genSplines.js';
import { positionCanvas } from './utils.js';

// Set two of these three and leave other null
// if canvasH and canvasW both non-null then aspectRatio is ignored
// resulting w and h are rounded to nearest int
const aspectRatio = 12 / 9; // assumed to be w / h
let canvasW = 512;
let canvasH = null;
let cnv;

// Display mode (either "animate", "top", or "side")
// Use keys 1, 2, 3 while sketch is running to toggle between modes
const displayModes = ['side', 'animate', 'top'];
let displayMode = displayModes[1];

// Use in case of repeatability (null otherwise)
// const randSeed = 42;
const randSeed = null;

// Spline params
const nSplines = 64;
const nControlPoints = 5;
const nSplinePts = 128;

let nSclX = 0.01;
let nSclY = 0.2;
let nSize = 200;

// Spline storage
const allSplinePtsXYZ = [];

window.setup = () => {
  const params = getURLParams();

  if (canvasW === null) {
    canvasW = round(aspectRatio * canvasH);
  } else if (canvasH === null) {
    canvasH = round(canvasW / aspectRatio);
  }

  if (params.D === '3') {
    cnv = createCanvas(canvasW, canvasH, WEBGL);
  } else {
    cnv = createCanvas(canvasW, canvasH);
    pixelDensity(1);
  }
  positionCanvas(cnv);

  // Repeatability
  if (randSeed !== null) {
    noiseSeed(randSeed);
    randomSeed(randSeed);
  } else if (params.randSeed !== undefined) {
    noiseSeed(params.randSeed);
    randomSeed(params.randSeed);
  }

  // Make some splines
  console.log(`Generating ${nSplines} splines (${nSplinePts} vertices per)`);
  if (params.nSclX !== undefined) nSclX = parseFloat(params.nSclX);
  if (params.nSclY !== undefined) nSclY = parseFloat(params.nSclY);
  if (params.nSize !== undefined) nSize = parseFloat(params.nSize);

  for (let i = 0; i < nSplines; i += 1) {
    const splinePtsXYZ = genNoisySpline(i, nControlPoints, nSplinePts, nSclX, nSclY, nSize);
    allSplinePtsXYZ.push(splinePtsXYZ);
  }
};

window.draw = () => {
  clear();
  stroke(0);
  noFill();

  const params = getURLParams();
  if (params.D === '3') {
    scale(0.7, 0.7);
    translate(-width / 2, -height / 2);
    allSplinePtsXYZ.forEach((splinePtsXYZ) => {
      splinePtsXYZ.forEach(([x, y, z]) => {
        translate(x * 10, y, z);
        sphere(3, 3);
        translate(-x * 10, -y, -z);
      });
    });
    orbitControl(5);
  } else if (displayMode === 'side') {
    translate(width / 2, height / 2);
    scale(0.8, 0.8);
    translate(-width / 2, -height / 2);

    translate(0, nSize * 1.05);

    allSplinePtsXYZ.forEach((splinePtsXYZ) => {
      beginShape();
      // eslint-disable-next-line no-unused-vars
      splinePtsXYZ.forEach(([x, y, z]) => {
        vertex(y, z);
      });
      endShape();
    });
  } else if (displayMode === 'animate') {
    translate(width / 2, height / 2);
    scale(0.8, 0.8);
    translate(-width / 2, -height / 2);

    translate(0, nSize * 1.05);

    const splineI = frameCount % allSplinePtsXYZ.length;
    beginShape();
    // eslint-disable-next-line no-unused-vars
    const splinePts = allSplinePtsXYZ[splineI];
    splinePts.forEach(([x, y, z], i) => {
      if (i === 0) vertex(y, 0);
      vertex(y, z);
      if (i === splinePts.length - 1) vertex(y, 0);
    });
    endShape(CLOSE);
  } else if (displayMode === 'top') {
    loadPixels();
    for (let x = 0; x < width; x += 1) {
      const splineI = round(map(x, 0, width, 0, nSplines - 1));
      const splinePtsXYZ = allSplinePtsXYZ[splineI];
      for (let y = 0; y < height; y += 1) {
        const splinePtI = round(map(y, 0, height, 0, splinePtsXYZ.length - 1));
        const z = splinePtsXYZ[splinePtI][2];
        const grayVal = map(abs(z), nSize * 0.1, nSize * 0.9, 0, 255, true);

        const pixelI = 4 * (y * width + x);
        pixels[pixelI] = grayVal;
        pixels[pixelI + 1] = grayVal;
        pixels[pixelI + 2] = grayVal;
        pixels[pixelI + 3] = 255;
      }
    }
    updatePixels();
  } else {
    fill(0);
    textSize(15);
    text("invalid display mode; valid are: 'side', 'animate', and 'top'", 10, 50);
    noLoop();
  }
};

window.keyTyped = () => {
  if (key === '1') {
    displayMode = 'side';
  } else if (key === '2') {
    displayMode = 'animate';
  } else if (key === '3') {
    displayMode = 'top';
  }
};
