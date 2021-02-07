export class World {
    constructor(slide, bounce) {
        this.slide = slide;
        this.bounce = bounce;
    }
    
    checkCircle(position, velocity, radius) {
        let circle = {position, velocity, radius};
        if (this.checkSlide(circle))
            return circle;
        if (this.checkBounce(circle))
            return circle;
        return circle;
    }

    checkSlide(circle) {
        let returnFlag = false;

        for (let box of this.slide) {
            let side = this.collide(circle, box);
            if (side != -1) {
                returnFlag = true;
                if (side == 0) { // top
                    circle.velocity.y = 0;
                    circle.position.y = box.y - circle.radius - 1;
                }
                else if (side == 1) { // right
                    circle.velocity.x = 0;
                    circle.position.x = box.x + box.width + circle.radius + 1;
                }
                else if (side == 2) { // bottom
                    circle.velocity.y = 0;
                    circle.position.y = box.y + box.height + circle.radius + 1;
                }
                else if (side == 3) { // left
                    circle.velocity.x = 0;
                    circle.position.x = box.x - circle.radius - 1;
                }
            }
        }

        return returnFlag;
    }

    checkBounce(circle) {
        let returnFlag = false;

        for (let box of this.bounce) {
            let side = this.collide(circle, box);
            if (side != -1) {
                returnFlag = true;
                if (side == 0) { // top
                    circle.velocity.y = -circle.velocity.y;
                    circle.position.y = box.y - circle.radius - 1;
                }
                else if (side == 1) { // right
                    circle.velocity.x = -circle.velocity.x;
                    circle.position.x = box.x + box.width + circle.radius + 1;
                }
                else if (side == 2) { // bottom
                    circle.velocity.y = -circle.velocity.y;
                    circle.position.y = box.y + box.height + circle.radius + 1;
                }
                else if (side == 3) { // left
                    circle.velocity.x = -circle.velocity.x;
                    circle.position.x = box.x - circle.radius - 1;
                }
            }
        }

        return returnFlag;
    }

    collide(circle, box) {
        let testX = circle.position.x;
        let testY = circle.position.y;
        let side = 0; // top right bottom left

        if (circle.position.x < box.x) {
            testX = box.x;
            side = 3;
        }
        else if (circle.position.x > box.x + box.width) {
            testX = box.x + box.width;
            side = 1;
        }
        if (circle.position.y < box.y) {
            testY = box.y;
            side = 0;
        }
        else if (circle.position.y > box.y + box.height) {
            testY = box.y + box.height;
            side = 2;
        }

        let distX = circle.position.x - testX;
        let distY = circle.position.y - testY;
        let distance = Math.hypot(distX, distY);

        if (distance <= circle.radius) {
            console.log('hit', side);
            return side;
        }
        else 
            return -1;
    }
}
