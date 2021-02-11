import {Vector} from './vector.js';

const BULLET_TIME = 3; // time bullet is on screen

export class Bullet {
    constructor(position, velocity, radius) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.time = BULLET_TIME;
    }

    move(dt) {
        if (this.time < 0)
            return false;

        this.position = this.position.add(this.velocity.mult(dt));
        this.time -= dt;

        return true;
    }
}
