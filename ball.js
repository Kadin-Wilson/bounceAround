import {Vector} from './vector.js';

export class Ball {
    constructor(x, y, radius, vx = 0, vy = 0) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(vx, vy);
        this.radius = radius;
    }

    move(dt) {
        this.position = this.position.add(this.velocity.mult(dt));
    }

    impulse(x, y, intensity, decay) {
        const impulse = new Vector(x, y);
        const distance = impulse.distance(this.position);

        const direction = impulse.minus(this.position).mult(1/distance);
        let magnitude = intensity * (decay / distance);
        magnitude = magnitude > intensity ? intensity : magnitude;

        this.velocity = this.velocity.add(direction.mult(magnitude));
    }

    getPosition() {
        return this.position;
    }

    getRadius() {
        return this.radius;
    }
}
