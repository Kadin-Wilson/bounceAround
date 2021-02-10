import {Vector} from './vector.js';

export class Ball {
    constructor(x, y, radius) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.radius = radius;
        this.waypoint = new Vector(x, y);
    }

    move(dt) {
        const distance = this.waypoint.distance(this.position);
        if (distance != 0) {
            const direction = this.waypoint.minus(this.position).mult(1/distance);
            this.acceleration = direction.mult(10);
        }

        this.velocity = this.velocity.add(this.acceleration.mult(dt));

        this.position = this.position.add(this.velocity);
    }

    setWaypoint(x, y) {
        this.waypoint = new Vector(x, y);
    }
}
