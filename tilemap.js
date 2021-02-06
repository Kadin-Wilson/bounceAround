export class TileMap {
    constructor(width, height, atlasWidth, atlasHeight, tileSize, indexes) {
        this.width = width;
        this.height = height;
        this.atlasWidth = atlasWidth;
        this.atlasHeight = atlasHeight;
        this.tileSize = tileSize;
        this.indexes = indexes;
    }

    // return atlas info
    getAtlas() {
        return {
            width: this.atlasWidth,
            height: this.atlasHeight,
            tileSize: this.tileSize
        }
    }

    // return map data
    getMap() {
        return {
            width: this.width,
            height: this.height,
            indexes: this.indexes
        }
    }

    // return array of tiles in current view
    // coordinates of returned tiles are relative to view
    getTilesInView(viewX, viewY, viewWidth, viewHeight) {
        let x = viewX;
        let y = viewY;
        let tiles = [];

        let maxX = x + viewWidth + this.tileSize;
        let maxY = y + viewHeight + this.tileSize;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (maxX > this.width * this.tileSize)
            maxX = this.width * this.tileSize;
        if (maxY > this.height * this.tileSize)
            maxY = this.height * this.tileSize;

        for (let i = x; i < maxX; i += this.tileSize)
            for (let j = y; j < maxY; j += this.tileSize) {
                let tile = this.getTile(i, j);
                let atlasPos = this.getAtlasPosition(tile.index);
                tiles.push({
                    x: tile.x - viewX,
                    y: tile.y - viewY,
                    atlasX: atlasPos.x,
                    atlasY: atlasPos.y
                });
            }

        return tiles;
    }

    // coordinates are relative to map
    // return tile containing the coordinates
    getTile(x, y) {
        if (x < 0 || y < 0 
                  || x > this.width * this.tilSize 
                  || y > this.height * this.tileSize)
            throw RangeError(`TileMap::getTile sent bad coor (${x},${y})`);

        let tileX = x - (x % this.tileSize);
        let tileY = y - (y % this.tileSize);
        let index = this.indexes[((tileY / this.tileSize) * this.width) 
                                 + (tileX/ this.tileSize)];

        //console.log(tileX, tileY, index);
        return {x: tileX, y: tileY, index};
    }

    // return atlas position of tile
    // based on its index
    getAtlasPosition(index) {
        let row = (index - (index % this.atlasWidth)) / this.atlasWidth;
        let col = index % this.atlasWidth;
        col = col == 0 ? this.atlasWidth : col;
        col -= 1;

        return {x: col * this.tileSize, y: row * this.tileSize};
    }
}
