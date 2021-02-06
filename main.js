import {TileMap} from './tilemap.js';
import {Ball} from './ball.js';
import {World} from './collision.js';

const canvas = document.querySelector('#game');

canvas.width = Math.min(1280, window.innerWidth);
canvas.height = Math.min(720, window.innerHeight);

const ctx = canvas.getContext('2d');

const levelIndexes = [40, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 41, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 67, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 68];

const slideBoxes = [
                {
                 "height":1518,
                 "width":9,
                 "x":6,
                 "y":10
                }, 
                {
                 "height":1518,
                 "width":11,
                 "x":2543,
                 "y":8
                }, 
                {
                 "height":10,
                 "width":2544,
                 "x":10,
                 "y":8
                }, 
                {
                 "height":10,
                 "width":2544,
                 "x":4,
                 "y":1518
                }, 
                {
                 "height":753,
                 "width":242,
                 "x":1927,
                 "y":393
                }, 
                {
                 "height":753,
                 "width":241,
                 "x":391,
                 "y":391
                }, 
                {
                 "height":241,
                 "width":242,
                 "x":1160,
                 "y":264
                }, 
                {
                 "height":241,
                 "width":242,
                 "x":1158,
                 "y":1030
                }];

const V_WIDTH = canvas.width;
const V_HEIGHT = canvas.height;
const TILE_SIZE = 128;

let camera = {x: 0, y: 0};
const map = new TileMap(20, 12, 27, 20, TILE_SIZE, levelIndexes);
const world = new World(slideBoxes);
let ball = new Ball(200, 200, 30);
let lastTime = 0;

// start game on atlas load
let atlasImg = new Image();
atlasImg.addEventListener('load', () => {
    // add mouse listener
    canvas.addEventListener('click', (e) => {
        ball.impulse(e.offsetX + camera.x, e.offsetY + camera.y, 800, 300);
    });
    // start gameloop
    requestAnimationFrame(gameLoop);
});
atlasImg.src = './assets/tileAtlas.png';

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
    ball = new Ball(corrected.position.x, corrected.position.y, corrected.radius, 
                    corrected.velocity.x, corrected.velocity.y);
    // move ball
    ball.move(dt);
    // move camera
    moveCamera(ball.getPosition());
}

function draw() {
    // clear
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // tiles
    const tiles = map.getTilesInView(camera.x, camera.y, canvas.width, canvas.height);
    for (let tile of tiles) 
        ctx.drawImage(atlasImg, tile.atlasX, tile.atlasY, TILE_SIZE, TILE_SIZE,
                                tile.x, tile.y, TILE_SIZE, TILE_SIZE);

    // ball
    let pos = ball.getPosition();
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(pos.x - camera.x, pos.y - camera.y, ball.getRadius(), 0, 7);
    ctx.fill();
}

function moveCamera(position) {
    camera.x = position.x - V_WIDTH/2;
    camera.y = position.y - V_HEIGHT/2;
}


