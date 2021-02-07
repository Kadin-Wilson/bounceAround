import {TileMap} from './tilemap.js';
import {Ball} from './ball.js';
import {World} from './collision.js';
import {level} from './level1_64.js';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const V_WIDTH = canvas.width;
const V_HEIGHT = canvas.height;
const TILE_SIZE = 64;
const TILE_WIDTH = 20;
const TILE_HEIGHT = 12;
const OFFSET = 40;

canvas.width = TILE_WIDTH * TILE_SIZE + OFFSET*2;
canvas.height = TILE_HEIGHT * TILE_SIZE + OFFSET*2;

let camera = {x: -OFFSET, y: -OFFSET};
const map = new TileMap(TILE_WIDTH, TILE_HEIGHT, 27, 20, TILE_SIZE, level.indexes);
const world = new World(level.slide, level.bounce);
let ball = new Ball(100, 375, 25);
let lastTime = 0;

// start game on atlas load
let atlasImg = new Image();
atlasImg.addEventListener('load', () => {
    // add mouse listener
    canvas.addEventListener('click', (e) => {
        ball.setWaypoint(e.offsetX + camera.x, e.offsetY + camera.y);
    });
    // start gameloop
    requestAnimationFrame(gameLoop);
});
atlasImg.src = './assets/tileAtlas64.png';

function gameLoop(time) {
    const nextFrame = requestAnimationFrame(gameLoop);

    time = time * 0.001;
    const dt = time - lastTime;
    lastTime = time;

    update(dt);
    draw();
}

function update(dt) {
    // collision detection
    const corrected = world.checkCircle(ball.position, ball.velocity, ball.radius);
    ball.position = corrected.position;
    ball.velocity = corrected.velocity;

    // move ball
    ball.move(dt);
}

function draw() {
    // tiles
    const tiles = map.getTilesInView(camera.x, camera.y, canvas.width, canvas.height);
    for (let tile of tiles) 
        ctx.drawImage(atlasImg, tile.atlasX, tile.atlasY, TILE_SIZE, TILE_SIZE,
                                tile.x, tile.y, TILE_SIZE, TILE_SIZE);

    // waypoint
    let pos = ball.waypoint
    ctx.fillStyle = 'blue';
    ctx.beginPath()
    ctx.arc(pos.x - camera.x, pos.y - camera.y, ball.radius/3, 0, 7);
    ctx.fill();

    // ball
    pos = ball.position;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(pos.x - camera.x, pos.y - camera.y, ball.radius, 0, 7);
    ctx.fill();
}

function moveCamera(position) {
    camera.x = position.x - V_WIDTH/2;
    camera.y = position.y - V_HEIGHT/2;
}


