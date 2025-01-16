class Beam {
    /**
     * 
     * @param {*} point1 - object for first point of beam
     * @param {*} point2 - object for second point of beam
     * @param {*} width - width of the line in pixel
     * @param {*} color - p5 color format
     */
    constructor(point1, point2,width, color, name) {
        this.point1 = point1;
        this.point2 = point2;
        this.width = width;
        this.color = color;
        this.name = name;
        this.length = dist(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    }

    draw() {
        // Update positions if needed

        // output to screen
        strokeWeight(this.width);
        stroke(this.color);
        line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
        fill("white");
        //text(this.name, (this.point1.x + this.point2.x) / 2, (this.point1.y + this.point2.y) / 2);
    }
}