let beams = [];

let beam = {};

let joint = {};

let force = {};

let mouseIsDragging = false;

function setup() {
  createCanvas(1100, 750);


  // Add joints to the joint-object
  joint.A = new Joint(100, 700, "A");
  joint.B = new Joint(400, 300, "B");
  joint.C = new Joint(400, 700, "C");
  joint.D = new Joint(100, 300, "D","rollerY", true);
  joint.E = new Joint(250, 500, "E");
  joint.F = new Joint(600, 700, "F");
  joint.G = new Joint(600, 300, "G");
  joint.H = new Joint(250, 300, "H","rollerY", true);
  updateJointMiddle(joint.H, joint.D, joint.G);


   // Add beams to the beam-object
   beam.AB = new Beam(joint.A, joint.B, 12, "goldenrod", "AB");
   beam.CD = new Beam(joint.C, joint.D, 12, "goldenrod", "CD");
   beam.AF = new Beam(joint.A, joint.F, 22, "Navy", "AF");
   beam.DG = new Beam(joint.D, joint.G, 22, "Navy", "DG");
//    beam.CB = new Beam(joint.C, joint.B, 2, "red", "CB");
  colorMode(HSB);

  // Add forces to the force-object
  force.H = new ForceArrow(joint.H, 10, 150, "green", "0", true);
  force.D = new ForceArrow(joint.D, 10, 150, "brown", "0");
  force.B = new ForceArrow(joint.B, 10, 150, "brown", "0");

  force.Ex = new ForceArrow(joint.E, 10, 150, "red", "90");
  force.Ey = new ForceArrow(joint.E, 10, 150, "red", "0");

  force.A = new ForceArrow(joint.A, 10, 150, "brown", "0");
  force.C = new ForceArrow(joint.C, 10, 150, "brown", "0");

  force.E2x = new ForceArrow(joint.E, 10, 150, "gray", "90");
  force.E2y = new ForceArrow(joint.E, 10, 150, "gray", "0");
  force.A.displayInList = false;
  force.C.displayInList = false;
  force.E2x.displayInList = false;
  force.E2y.displayInList = false;

}

function draw() {
  background("LightSteelBlue");
  cursor(ARROW); // Set the cursor to an arrow. 

  for(let key in beam){
    beam[key].draw();
  }

  for(let key in force){
    force[key].draw();
  }

  drawJoints();

  listForces();

  // Update the force arrows length based on the equations

//  f2.length = f1.length * (f3.x - f1.x) / (f2.x - f3.x);
//  f3.length = -f1.length - f2.length;
force.D.length = force.H.length * (joint.B.x - joint.H.x) / (joint.D.x - joint.B.x);
force.B.length = -force.H.length - force.D.length;

// = "lengthG" * ( "TXD2@Scheme2" / "TXD1@Scheme2" )
//= ( 2 * "TXD3@Scheme2" * "lengthG" ) / "TXD2@Scheme2" - "lengthG"
let L = joint.B.x - joint.D.x;
let h = joint.A.y - joint.D.y;
let x = joint.H.x - joint.D.x;
force.Ex.length = force.H.length *(L/h);
force.Ey.length = (2 * x * force.H.length) / L - force.H.length;

force.A.length = -force.D.length;
force.C.length = -force.B.length;
force.E2x.length = -force.Ex.length;
force.E2y.length = -force.Ey.length;

  // Update the position of joint C based on the position of joint D
  updateJoint(joint.D, joint.C, beam.CD);

  // Update the position of joint B based on the position of joint D
  // D-B and G are always horizontal
  joint.B.y = joint.D.y;
  joint.G.y = joint.D.y;
  updateJointX(joint.A, joint.B, beam.AB);

  // Set E to middle of A and B
  updateJointMiddle(joint.E, joint.A, joint.B);

  // Set H to same y as D
  joint.H.y = joint.D.y;

  // set D to vertically over A
  joint.D.x = joint.A.x;
}

function drawJoints(){
  for(let key in joint){
    joint[key].draw(key);
  }
}

// Function to move one joint and have the other follow. Constrained by the length of a beam
function updateJoint(j1, j2, b){
  let dx = j2.x - j1.x;
  let dy = j2.y - j1.y;
  let dx2 = sqrt(sq(b.length) - sq(dy));
  j2.x = j1.x + dx2;

}

// Update the joint x position of j2 based of the y value of j2 the position of j1 and the length of the beam
function updateJointX(j1, j2, b){
  let dx = j2.x - j1.x;
  let dy = j2.y - j1.y;
  let dx2 = sqrt(sq(b.length) - sq(dy));
  j2.x = j1.x + dx2;
}

// Set the position of joint 1 to the middle of joint 2 and joint 3
function updateJointMiddle(j1, j2, j3){
  j1.x = (j2.x + j3.x) / 2;
  j1.y = (j2.y + j3.y) / 2;
}

/** List forces from force Arrows
 * 
 */
function listForces(){

  push();
  translate(width-360,50)
  textSize(26);
  strokeWeight(1);
  textFont('Lucida Console, monospace');
  fill(0);
  // Set font to normal not bold
  textStyle(NORMAL);
  let y = 0;
  for(let key in force){
    if(force[key].displayInList == true){
      stroke(0);
      strokeWeight(1);
      textAlign(LEFT);
      fill("black")
      text(key , 0, y);
      text(":" , 40, y);
      textAlign(RIGHT);
      let forceValue = (force[key].length*3.33).toFixed(0)*10 + "  N"
      text(forceValue, 150, y);
  
      strokeWeight(3);
      stroke(force[key].color);
      line(160, y-10, 160+ abs(force[key].length), y-10);
  
      // IF the line is spilling of the side of the canvas, make a circle that grows with the length
      if(abs(force[key].length) > 200){
        strokeWeight(1);
        fill(force[key].color);
        let biggersize = map(abs(force[key].length)-200, 0, 1000, 5, 30);
        circle(360, y-10, biggersize);
      }
  
      y += 40;
      
  
    }
  }
  pop();
}