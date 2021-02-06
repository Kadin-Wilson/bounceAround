import {Vector} from './vector.js';

export class Ball {
    constructor(x, y, radius, growRate) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.radius = radius;
    }

    move() {
        this.position = this.position.add(this.velocity);
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
