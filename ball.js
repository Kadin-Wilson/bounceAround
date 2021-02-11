import {Vector} from './vector.js';
import {Bullet} from './bullet.js';

const WAYPOINT_ACCELERATION = 7;

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
            this.acceleration = direction.mult(WAYPOINT_ACCELERATION);
        }

        this.velocity = this.velocity.add(this.acceleration.mult(dt));

        this.position = this.position.add(this.velocity);
    }

    setWaypoint(x, y) {
        this.waypoint = new Vector(x, y);
    }

    setVelocity(x, y) {
        this.velocity = new Vector(x, y);
    }

    // fires in direction of x,y relative to this ball
    fireBullet(x, y, radius, velocity) {
        const fire = new Vector(x, y);

        const distance = fire.distance(this.position);
        const direction = fire.minus(this.position).mult(1/distance);

        const positionIncrement = direction.mult(this.radius + radius);
        const bulletPosition = this.position.add(positionIncrement);

        const bulletVelocity = direction.mult(velocity);
        
        return new Bullet(bulletPosition, bulletVelocity, radius);
    }
}
