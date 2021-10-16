let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let xoff = 0.50;
let xincrement = 0.01;
let sf = 1; // scaleFactor
let x = 0; // pan X
let y = 0; // pan Y
let mx, my; // mouse coords;


const pane = new Tweakpane.Pane({
    container: document.getElementById('container1'),
});


const PARAMS = {
  strokeWeight: 2,
  motion: 0.01,
  colorHours: '#7f7e7e44',
  colorSeconds: '#7f7e7e44',
}

   pane.addInput(PARAMS, 'strokeWeight', { label: 'Stroke Weight',min: 2, max: 10, step: 1 })
   pane.addInput(PARAMS, 'motion',{ label: 'Speed',options: {
    fast: 0.03,
    medium: 0.01,
    slow: 0.001,
  },
    
})

const colors = pane.addFolder({
  title: 'Colors',
})
colors.addInput(PARAMS, 'colorHours', { label: 'Hours' })
colors.addInput(PARAMS, 'colorSeconds', { label: 'Seconds' })




function setup() {
  createCanvas(windowWidth, windowHeight);
 
  
  stroke(255);

  let radius = min(width, height)/4;
  secondsRadius = radius * 1.0;
  minutesRadius = radius * 0.75;
  hoursRadius = radius * 0.4;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;

}
function draw() {
    

   for (let j = 0; j < 5; j++) {
    background(frameCount % 655);
  }
    textSize(32);
    fill(50);
    stroke(0,0,0,0);
    textFont('Open Sans');
    text('What Time Is It?', width/10, height/2);
    
    //let a = createA('http://p5js.org/', 'About this project','_blank');
    // a.position(width/10, (height/4)*1.8);
     
    

//zoom in & Out https://editor.p5js.org/pbay/sketches/ryMUDIVZN
     
  mx = mouseX;
  my = mouseY;

  translate(mx, my);
  scale(sf);
  translate(-mx, -my);
  translate();
  

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  

  // Draw the sec circle 
  fill(PARAMS.colorSeconds)
  stroke(255, 50);
  ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius,30,30);
  
// min change color on hover
  
  if (mouseX > 1500) {
  fill(0, 50);
  stroke(255, 50);
ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius,40, 40);
      
  //if mouseX is greater than 250, draw a rectangle
  } else if (mouseX > 1200) {
    fill(50, 100, 200);
ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius,40, 40);
    
    //if mouseX is greater than 150, draw a circle
  } else if (mouseX > 1000) {
    fill(0, 120, 100);
ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius,40, 40);
      
  } else if (mouseX > 800) {
    fill(255, 0, 0);
ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius,40, 40);
      
  //otherwise, draw a point
	} else {
    fill(0, 50);
  stroke(255, 50);
ellipse(cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius,40, 40);
  	}
  
  
  // 3 Circles for hour
  for (let i = 0; i < 4; i++) {
    stroke(255, 50);
    fill(PARAMS.colorHours);
    ellipse(
      (cx + cos(h) * hoursRadius) +(i*5),
      (cy + sin(h) * hoursRadius)+(sin(frameCount/(i+10))*(i+20)),
      30,
      30);
   }
  
  
  // Draw the minute ticks
  stroke('red');
  strokeWeight(PARAMS.strokeWeight);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

     
    
	var ang1 = TWO_PI * noise(PARAMS.motion*frameCount + 500);		
	var tx = width/10 * noise(PARAMS.motion*frameCount + 700);
	var size1 = width/10 * noise(PARAMS.motion*frameCount + 500);
	var size2 = width/10 * noise(PARAMS.motion*frameCount + 700);

	translate(width/2, height/2);
	for (var t = 0; t < 12; t++) {
		push();
		rotate(ang1 + TWO_PI * t / 12);
		translate(tx, 0);
     	fill(0, 50);
	    stroke(255, 50);
		ellipse(0, 0, size1, size1);
	
		translate()
		pop();
	}
	
//zoom

  if (mouseIsPressed) {
    x -= pmouseX - mouseX;
    y -= pmouseY - mouseY;
  }
  


}
//zoom function

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.05;
  else
    sf *= 0.95;
});



