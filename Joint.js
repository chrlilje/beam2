class Joint {
    /**
     * 
     * @param {*} x - x-coordinate of the joint
     * @param {*} y - y-coordinate of the joint
     * @param {*} name - name of the joint
     * @param {*} constraint - type of constraint for the joint (fixed,  rollerX, rollerY, free)
     */
    constructor(x, y, name, constraint = "free", draggable = false) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.constraint = constraint;
        this.draggable = draggable;
        this.isBeingDragged = false;

    }
    draw() {
        fill(0);
        stroke(0);
        strokeWeight(1);
        ellipse(this.x, this.y, 25, 25);
        fill("white");
        text(this.name, this.x-4, this.y+4);
        if (this.draggable) {
            this.drag();
        }
    }

    updatePosition(newX, newY) {
        switch (this.constraint) {
            case 'fixed':
                // Do nothing, position is fixed
                break;
            case 'pinnedX':
            case 'rollerY':
                this.y = newY;
                break;
            case 'pinnedY':
            case 'rollerX':
                this.x = newX;
                break;
            case 'free':
                this.x = newX;
                this.y = newY;
                break;
        }
    }

    // drag-behaviour. - like forcearrow.js
    drag() {
        // Change to hand if over
        if (dist(mouseX, mouseY, this.x, this.y) < 20) {
            cursor(HAND);
        } else {
            //cursor(ARROW);
        }

        // If nothing is being dragged by the mouse
        if (mouseIsDragging == false && mouseIsPressed) {
            //line(mouseX, mouseY, this.x, this.y);
            // and the mouse is pressed
            // check if mouse is "close enough" to this arrow (compensate for global pos)
            if (dist(mouseX, mouseY, this.x, this.y) < 20) {
                mouseIsDragging = true;
                // set the property of this arrow to "being dragged"
                this.isBeingDragged = true;

            }
        }

        // If this.isBeingDragged == true
        if (this.isBeingDragged) {
            // Only drag if not constrained
            if (this.constraint == 'free') {              
            this.x = mouseX;
            this.y = mouseY;
            }
            if (this.constraint == 'rollerY') {
                this.y = mouseY;
            }
            if (this.constraint == 'rollerX') {
                this.x = mouseX;
            }
        }
        // Update the x-value of this to the x-value of the mouse (compensate for global position)

        // if the mouse is released (or up) 
        if (mouseIsPressed == false && this.isBeingDragged) {
            this.isBeingDragged = false;
            mouseIsDragging = false;
        }
    }
}