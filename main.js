import {TileMap} from './tilemap.js';
import {Ball} from './ball.js';

const canvas = document.querySelector('#game');

canvas.width = Math.min(1280, window.innerWidth);
canvas.height = Math.min(720, window.innerHeight);

const ctx = canvas.getContext('2d');

const levelIndexes = [40, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 41, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 67, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 68];

const V_WIDTH = canvas.width;
const V_HEIGHT = canvas.height;
const TILE_SIZE = 128;

let camera = {x: 0, y: 0};
const map = new TileMap(20, 12, 27, 20, TILE_SIZE, levelIndexes);
let ball = new Ball(200, 200, 30);

let atlasImg = new Image();
atlasImg.addEventListener('load', () => {
    canvas.addEventListener('click', (e) => {
        ball.impulse(e.offsetX + camera.x, e.offsetY + camera.y, 100, 50);
    });
    requestAnimationFrame(gameLoop);
});
atlasImg.src = './assets/tileAtlas.png';

function gameLoop() {
    const nextFrame = requestAnimationFrame(gameLoop);

    update();
    draw();
    //console.log(camera);
}

function update() {
    ball.move();
    moveCamera(ball.getPosition());
}

function draw() {
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const tiles = map.getTilesInView(camera.x, camera.y, canvas.width, canvas.height);
    for (let tile of tiles) 
        ctx.drawImage(atlasImg, tile.atlasX, tile.atlasY, TILE_SIZE, TILE_SIZE,
                                tile.x, tile.y, TILE_SIZE, TILE_SIZE);
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


