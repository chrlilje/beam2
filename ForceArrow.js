class ForceArrow {
  /**
   * 
   * @param {*} initdata 
   */
  constructor(position, w, length, color, angle, draggable = false) {
    this.position = position;
    this.w = w;
    this.length = length;
    this.color = color;
    this.angle = angle;
    this.draggable = draggable;
    this.isBeingDragged = false;
    this.displayInList = true;
  }
  draw() {
    // Draw a triangle
    push();
    angleMode(DEGREES);
    fill(this.color);
    // Move to the actual position
    translate(this.position.x, this.position.y);
    stroke(0);
    strokeWeight(1);
    rotate(this.angle);
    // Rotate another 180 if negative l
    if (this.length < 0) {
      rotate(180);
    }
    translate(0, -12);
    rect(-this.w / 2, -10, this.w, -abs(this.length));
    triangle(0, 0, 15, -15, -15, -15);

    pop();
    if (this.draggable) {
      this.drag();
    }

  }

  drag() {
    // Drag-behaviour. 
    // Change to hand if over
    if (dist(mouseX, mouseY, this.position.x, this.position.y) < 20) {
      cursor(HAND);
    } else {
      //cursor(ARROW);
    }

    // If nothing is being dragged by the mouse
    if (mouseIsDragging == false && mouseIsPressed) {
      //line(mouseX, mouseY, this.position.x, this.position.y);
      // and the mouse is pressed
      // check if mouse is "close enough" to this arrow (compensate for global pos)
      if (dist(mouseX, mouseY, this.position.x, this.position.y) < 20) {
        mouseIsDragging = true;
        // set the property of this arrow to "being dragged"
        this.isBeingDragged = true;

      }
    }

    // If this.isBeingDragged == true
    if (this.isBeingDragged) {
      this.position.x = mouseX;
    }
    // Update the x-value of this to the x-value of the mouse (compensate for global position)

    // if the mouse is released (or up) 
    if (mouseIsPressed == false && this.isBeingDragged) {
      this.isBeingDragged = false;
      mouseIsDragging = false;

    }


  }
}