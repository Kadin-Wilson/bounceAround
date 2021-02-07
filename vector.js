export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(v) {
        return Math.hypot(v.x - this.x, v.y - this.y);
    }

    add(v) {
        return new Vector(v.x + this.x, v.y + this.y);
    }

    minus(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(s) {
        return new Vector(this.x * s, this.y * s);
    }
}
