import {TileMap} from './tilemap.js';

const canvas = document.querySelector('#game');

canvas.width = Math.min(1280, window.innerWidth);
canvas.height = Math.min(720, window.innerHeight);

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'darkslategrey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const levelIndexes = [40, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 41, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 35, 36, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 35, 36, 93, 93, 36, 35, 93, 93, 67, 68, 93, 93, 93, 93, 40, 41, 93, 93, 93, 93, 67, 68, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 67, 68, 93, 93, 93, 93, 93, 93, 93, 93, 36, 35, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 36, 67, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 68];

const map = new TileMap(20, 12, 27, 20, 128, levelIndexes);

const tiles = map.getTilesInView(0, 0, canvas.width, canvas.height);
//console.log(tiles.length);

let atlasImg = new Image();
atlasImg.addEventListener('load', () => {
    for (let tile of tiles) 
        ctx.drawImage(atlasImg, tile.atlasX, tile.atlasY,
                      128, 128, tile.x, tile.y, 128, 128);
});
atlasImg.src = './assets/tileAtlas.png';
