import {TileMap} from './tilemap.js';
import {Ball} from './ball.js';
import {World} from './collision.js';
import {level} from './level1_64.js';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 64;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 12;
const ATLAS_WIDTH = 27;
const ATLAS_HEIGHT = 20;

canvas.width = MAP_WIDTH * TILE_SIZE;
canvas.height = MAP_HEIGHT * TILE_SIZE;

const map = new TileMap(MAP_WIDTH, MAP_HEIGHT, 
                        ATLAS_WIDTH, ATLAS_HEIGHT, TILE_SIZE, level.indexes);
const world = new World(level.slide, level.bounce);
const ball = new Ball(100, 375, 25);
const bullets = [];
let lastTime = 0;
let nextFrame;

// start game on atlas load
let atlasImg = new Image();
atlasImg.addEventListener('load', () => {
    // start gameloop
    lastTime = performance.now() * 0.001; // adjust to seconds
    nextFrame = requestAnimationFrame(gameLoop);

    // add mouse listener to set waypoints
    // and fire bullets
    canvas.addEventListener('mousedown', (e) => {
        switch(e.button) {
            case 0: // left mouse button
                ball.setWaypoint(e.offsetX, e.offsetY);
                break;
            case 2: // right mouse button
                if (bullets.length < 5)
                    bullets.push(ball.fireBullet(e.offsetX, e.offsetY, 10, 300));
                break;
        }
    });

    // pause and restart on visibility changes
    document.addEventListener('visibilitychange', (e) => {
        if (document.hidden) {
            cancelAnimationFrame(nextFrame);
        }
        else {
            lastTime = performance.now() * 0.001; // adjust to seconds
            requestAnimationFrame(gameLoop);
        }
    });

    // prevent context menu
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
atlasImg.src = './assets/tileAtlas64.png';

function gameLoop(time) {
    nextFrame = requestAnimationFrame(gameLoop);

    time = time * 0.001; // adjust to seconds
    const dt = time - lastTime;
    lastTime = time;

    update(dt);
    draw();
}

function update(dt) {
    // ball updates
    let corrected = world.checkCircle(ball.position, ball.velocity, ball.radius);
    ball.position = corrected.position;
    ball.velocity = corrected.velocity;

    ball.move(dt);

    // bullet updates
    for (let i = 0; i < bullets.length; i++) {
        corrected = world.checkCircle(bullets[i].position, 
                                      bullets[i].velocity, 
                                      bullets[i].radius);
        bullets[i].position = corrected.position;
        bullets[i].velocity = corrected.velocity;
        
        if (!bullets[i].move(dt))
            bullets.splice(i, 1);
            
    }
}

function draw() {
    // tiles
    const tiles = map.getTilesInView(0, 0, canvas.width, canvas.height);
    for (let tile of tiles) 
        ctx.drawImage(atlasImg, tile.atlasX, tile.atlasY, TILE_SIZE, TILE_SIZE,
                                tile.x, tile.y, TILE_SIZE, TILE_SIZE);

    // waypoint
    let pos = ball.waypoint
    ctx.fillStyle = 'blue';
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, ball.radius/3, 0, 7);
    ctx.fill();

    // bullets
    ctx.fillStyle = 'orange';
    for (let bullet of bullets) {
        pos = bullet.position;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, bullet.radius, 0, 7);
        ctx.fill();
    }

    // ball
    pos = ball.position;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ball.radius, 0, 7);
    ctx.fill();
}

