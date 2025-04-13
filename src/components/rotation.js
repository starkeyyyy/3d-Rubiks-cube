//to make rotation in 2d interface for automation

const rotateFaceClockwise = (faceMatrix) => {
  return [
    [faceMatrix[2][0], faceMatrix[1][0], faceMatrix[0][0]],
    [faceMatrix[2][1], faceMatrix[1][1], faceMatrix[0][1]],
    [faceMatrix[2][2], faceMatrix[1][2], faceMatrix[0][2]]
  ];
};

const rotateFaceCounterclockwise = (faceMatrix) => {
  return [
    [faceMatrix[0][2], faceMatrix[1][2], faceMatrix[2][2]],
    [faceMatrix[0][1], faceMatrix[1][1], faceMatrix[2][1]],
    [faceMatrix[0][0], faceMatrix[1][0], faceMatrix[2][0]]
  ];
};

const rotateFullCubeClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));
  

  // Rotate Right (2) clockwise and Left (4) counterclockwise
  newCube[2] = rotateFaceClockwise(cube[2]);
  newCube[4] = rotateFaceCounterclockwise(cube[4]);

  // Swap Front, Up, Back, and Down faces
 
  newCube[1][0] = cube[5][0]; // Front takes Down
  newCube[1][1] = cube[5][1]; // Front takes Down
  newCube[1][2] = cube[5][2]; // Front takes Down

  newCube[5][0] = cube[3][2]; // Down takes Back
  newCube[5][1] = cube[3][1]; // Down takes Back
  newCube[5][2] = cube[3][0]; // Down takes Back


  newCube[3][0] = cube[0][2]; // back takes up 
  newCube[3][1] = cube[0][1]; // back takes up 
  newCube[3][2] = cube[0][0]; // back takes up 

  newCube[0][0] = cube[1][0]; // Up takes Front
  newCube[0][1] = cube[1][1]; // Up takes Front
  newCube[0][2] = cube[1][2]; // Up takes Front


  console.log(newCube);
  return newCube;
};

const rotateFullCubeCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // Rotate Right (2) counterclockwise and Left (4) clockwise
  newCube[2] = rotateFaceCounterclockwise(cube[2]);
  newCube[4] = rotateFaceClockwise(cube[4]);

  // Swap Front, Up, Back, and Down faces in reverse order
  newCube[1][0] = cube[0][0]; // Front takes Up
  newCube[1][1] = cube[0][1]; // Front takes Up
  newCube[1][2] = cube[0][2]; // Front takes Up 

  newCube[5][0] = cube[1][0]; // Down takes Front
  newCube[5][1] = cube[1][1]; // Down takes Front
  newCube[5][2] = cube[1][2]; // Down takes Front

  newCube[3][0] = cube[5][0]; // Back takes Down
  newCube[3][1] = cube[5][1]; // Back takes Down
  newCube[3][2] = cube[5][2]; // Back takes Down

  newCube[0][0] = cube[3][2]; // Up takes Back
  newCube[0][1] = cube[3][1]; // Up takes Back
  newCube[0][2] = cube[3][0]; // Up takes Back

  

  return newCube;
};


const rotateFrontClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // Rotate the Front face clockwise
  newCube[1] = rotateFaceClockwise(cube[1]);

  // Up bottom row takes Left right column (reversed)
  newCube[0][2][0] = cube[4][2][2];
  newCube[0][2][1] = cube[4][1][2];
  newCube[0][2][2] = cube[4][0][2];
  
  // Left right column takes Down top row
  newCube[4][0][2] = cube[5][0][0];
  newCube[4][1][2] = cube[5][0][1];
  newCube[4][2][2] = cube[5][0][2];

  // Down top row takes Right left column (reversed)
  newCube[5][0][2] = cube[2][0][0];
  newCube[5][0][1] = cube[2][1][0];
  newCube[5][0][0] = cube[2][2][0];

  // Right left column takes Up bottom row
  newCube[2][0][0] = cube[0][2][0];
  newCube[2][1][0] = cube[0][2][1];
  newCube[2][2][0] = cube[0][2][2];

  return newCube;
};

const rotateFrontCounterclockwise = (cube) => {

  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[1] = rotateFaceCounterclockwise(cube[1]);

  // Up bottom row takes Right left column
  newCube[0][2][0] = cube[2][0][0];
  newCube[0][2][1] = cube[2][1][0];
  newCube[0][2][2] = cube[2][2][0];

  // Right left column takes Down top row
  newCube[2][0][0] = cube[5][0][2];
  newCube[2][1][0] = cube[5][0][1];
  newCube[2][2][0] = cube[5][0][0];

  // Down top row takes Left right column
  newCube[5][0][0] = cube[4][0][2];
  newCube[5][0][1] = cube[4][1][2];
  newCube[5][0][2] = cube[4][2][2];

  // Left right column takes Up bottom row
  newCube[4][0][2] = cube[0][2][2];
  newCube[4][1][2] = cube[0][2][1];
  newCube[4][2][2] = cube[0][2][0];


  return newCube;
};

const rotateRightClockwise = (cube) => {
  
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[2] = rotateFaceClockwise(cube[2]);

  // Up right column takes Front right column
  newCube[0][0][2] = cube[1][0][2];
  newCube[0][1][2] = cube[1][1][2];
  newCube[0][2][2] = cube[1][2][2];

  // Front right column takes Down right column
  newCube[1][0][2] = cube[5][0][2];
  newCube[1][1][2] = cube[5][1][2];
  newCube[1][2][2] = cube[5][2][2];

  // Down right column takes Back left column (reversed)
  newCube[5][0][2] = cube[3][2][0];
  newCube[5][1][2] = cube[3][1][0];
  newCube[5][2][2] = cube[3][0][0];

  // Back left column takes Up right column (reversed)
  newCube[3][0][0] = cube[0][2][2];
  newCube[3][1][0] = cube[0][1][2];
  newCube[3][2][0] = cube[0][0][2];
  

  return newCube;
};

const rotateRightCounterclockwise = (cube) => {
  
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[2] = rotateFaceCounterclockwise(cube[2]);

  // Up right column takes Back left column (reversed)
  newCube[0][0][2] = cube[3][2][0];
  newCube[0][1][2] = cube[3][1][0];
  newCube[0][2][2] = cube[3][0][0];

  // Back left column takes Down right column (reversed)
  newCube[3][0][0] = cube[5][2][2];
  newCube[3][1][0] = cube[5][1][2];
  newCube[3][2][0] = cube[5][0][2];

  // Down right column takes Front right column
  newCube[5][0][2] = cube[1][0][2];
  newCube[5][1][2] = cube[1][1][2];
  newCube[5][2][2] = cube[1][2][2];

  // Front right column takes Up right column
  newCube[1][0][2] = cube[0][0][2];
  newCube[1][1][2] = cube[0][1][2];
  newCube[1][2][2] = cube[0][2][2];
  

  return newCube;
};

const rotateLeftClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[4] = rotateFaceClockwise(cube[4]);

  // Up left column takes Back right column (reversed)
  newCube[0][0][0] = cube[3][2][2];
  newCube[0][1][0] = cube[3][1][2];
  newCube[0][2][0] = cube[3][0][2];

  // Back right column takes Down left column (reversed)
  newCube[3][0][2] = cube[5][2][0];
  newCube[3][1][2] = cube[5][1][0];
  newCube[3][2][2] = cube[5][0][0];

  // Down left column takes Front left column
  newCube[5][0][0] = cube[1][0][0];
  newCube[5][1][0] = cube[1][1][0];
  newCube[5][2][0] = cube[1][2][0];

  // Front left column takes Up left column
  newCube[1][0][0] = cube[0][0][0];
  newCube[1][1][0] = cube[0][1][0];
  newCube[1][2][0] = cube[0][2][0];
  

  return newCube;
};

const rotateLeftCounterclockwise = (cube) => {
  
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[4] = rotateFaceCounterclockwise(cube[4]);

  // Up left column takes Front left column
  newCube[0][0][0] = cube[1][0][0];
  newCube[0][1][0] = cube[1][1][0];
  newCube[0][2][0] = cube[1][2][0];

  // Front left column takes Down left column
  newCube[1][0][0] = cube[5][0][0];
  newCube[1][1][0] = cube[5][1][0];
  newCube[1][2][0] = cube[5][2][0];

  // Down left column takes Back right column (reversed)
  newCube[5][0][0] = cube[3][2][2];
  newCube[5][1][0] = cube[3][1][2];
  newCube[5][2][0] = cube[3][0][2];

  // Back right column takes Up left column (reversed)
  newCube[3][0][2] = cube[0][2][0];
  newCube[3][1][2] = cube[0][1][0];
  newCube[3][2][2] = cube[0][0][0];
  

  return newCube;
};

const rotateUpClockwise = (cube) => {
  
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[0] = rotateFaceClockwise(cube[0]);

  // Save original top rows
  const frontTopRow = [...cube[1][0]];
  const rightTopRow = [...cube[2][0]];
  const backTopRow = [...cube[3][0]];
  const leftTopRow = [...cube[4][0]];

  // Front top row takes Right top row
  newCube[1][0] = rightTopRow;
  // Right top row takes Back top row
  newCube[2][0] = backTopRow;
  // Back top row takes Left top row
  newCube[3][0] = leftTopRow;
  // Left top row takes Front top row
  newCube[4][0] = frontTopRow;
  

  return newCube;
};

const rotateUpCounterclockwise = (cube) => {
  
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[0] = rotateFaceCounterclockwise(cube[0]);

  // Save original top rows
  const frontTopRow = [...cube[1][0]];
  const rightTopRow = [...cube[2][0]];
  const backTopRow = [...cube[3][0]];
  const leftTopRow = [...cube[4][0]];

  // Front top row takes Left top row
  newCube[1][0] = leftTopRow;
  // Left top row takes Back top row
  newCube[4][0] = backTopRow;
  // Back top row takes Right top row
  newCube[3][0] = rightTopRow;
  // Right top row takes Front top row
  newCube[2][0] = frontTopRow;
  

  return newCube;
};

const rotateDownClockwise = (cube) => {

  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[5] = rotateFaceClockwise(cube[5]);

  // Save original bottom rows
  const frontBottomRow = [...cube[1][2]];
  const rightBottomRow = [...cube[2][2]];
  const backBottomRow = [...cube[3][2]];
  const leftBottomRow = [...cube[4][2]];

  // Front bottom row takes Left bottom row
  newCube[1][2] = leftBottomRow;
  // Left bottom row takes Back bottom row
  newCube[4][2] = backBottomRow;
  // Back bottom row takes Right bottom row
  newCube[3][2] = rightBottomRow;
  // Right bottom row takes Front bottom row
  newCube[2][2] = frontBottomRow;
  

  return newCube;
};

const rotateDownCounterclockwise = (cube) => {

  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[5] = rotateFaceCounterclockwise(cube[5]);

  // Save original bottom rows
  const frontBottomRow = [...cube[1][2]];
  const rightBottomRow = [...cube[2][2]];
  const backBottomRow = [...cube[3][2]];
  const leftBottomRow = [...cube[4][2]];

  // Front bottom row takes Right bottom row
  newCube[1][2] = rightBottomRow;
  // Right bottom row takes Back bottom row
  newCube[2][2] = backBottomRow;
  // Back bottom row takes Left bottom row
  newCube[3][2] = leftBottomRow;
  // Left bottom row takes Front bottom row
  newCube[4][2] = frontBottomRow;
  

  return newCube;
};

const rotateBackClockwise = (cube) => {

  let newCube = JSON.parse(JSON.stringify(cube));

  // For the Back face, rotating clockwise in the cube's frame is 
  // actually counterclockwise from the solver's perspective
  newCube[3] = rotateFaceCounterclockwise(cube[3]);

  // Up top row takes Left left column (reversed)
  newCube[0][0][0] = cube[4][2][0];
  newCube[0][0][1] = cube[4][1][0];
  newCube[0][0][2] = cube[4][0][0];

  // Left left column takes Down bottom row (reversed)
  newCube[4][0][0] = cube[5][2][0];
  newCube[4][1][0] = cube[5][2][1];
  newCube[4][2][0] = cube[5][2][2];

  // Down bottom row takes Right right column
  newCube[5][2][0] = cube[2][2][2];
  newCube[5][2][1] = cube[2][1][2];
  newCube[5][2][2] = cube[2][0][2];

  // Right right column takes Up top row (reversed)
  newCube[2][0][2] = cube[0][0][0];
  newCube[2][1][2] = cube[0][0][1];
  newCube[2][2][2] = cube[0][0][2];
  

  return newCube;
};

const rotateBackCounterclockwise =  (cube) => {

  let newCube =  JSON.parse(JSON.stringify(cube));

  // For the Back face, rotating counterclockwise in the cube's frame
  // is actually clockwise from the solver's perspective
  newCube[3] = rotateFaceClockwise(cube[3]);

  // Up top row takes Right right column
  newCube[0][0][0] = cube[2][0][2];
  newCube[0][0][1] = cube[2][1][2];
  newCube[0][0][2] = cube[2][2][2];

  // Right right column takes Down bottom row (reversed)
  newCube[2][0][2] = cube[5][2][2];
  newCube[2][1][2] = cube[5][2][1];
  newCube[2][2][2] = cube[5][2][0];

  // Down bottom row takes Left left column
  newCube[5][2][0] = cube[4][0][0];
  newCube[5][2][1] = cube[4][1][0];
  newCube[5][2][2] = cube[4][2][0];

  // Left left column takes Up top row (reversed)
  newCube[4][0][0] = cube[0][0][2];
  newCube[4][1][0] = cube[0][0][1];
  newCube[4][2][0] = cube[0][0][0];
  

  return newCube;
};

export {
  rotateFrontClockwise,
  rotateFrontCounterclockwise,
  rotateRightClockwise,
  rotateRightCounterclockwise,
  rotateLeftClockwise,
  rotateLeftCounterclockwise,
  rotateUpClockwise,
  rotateUpCounterclockwise,
  rotateDownClockwise,
  rotateDownCounterclockwise,
  rotateBackClockwise,
  rotateBackCounterclockwise,
  rotateFullCubeClockwise,
  rotateFullCubeCounterclockwise
};