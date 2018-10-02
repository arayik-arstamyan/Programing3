////////////////////////////////////////////////////////////////////////////////////////////////////////
////////   XOT     /////////////////////////////////////////////////////////////////////////////////////
class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////  XOTAKER   ////////////////////////////////////////////////////////////////////////////
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
    }
    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }

            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            this.energy++;
            if (this.energy >= 15) {
                this.mul();
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            this.y = newY;
            this.x = newX;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var newGrassEater = new GrassEater(this.x, this.y, this.index);
        xotaker.push(newGrassEater);
        matrix[this.y][this.x] = this.index
        this.energy = 5;

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in xotaker) {
            if (this.x == xotaker[i].x && this.y == xotaker[i].y) {
                xotaker.splice(i, 1);
                break;
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
/////////  GISHATICH   ////////////////////////////////////////////////////////////////////////
class Gihsatich {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.index = index;
        this.hincel = 0;
    }
    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsx = this.chooseCell(1);
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = random(a);
        if (newCellxy) {
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            var hintex = matrix[newY][newX];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = this.hincel;
            this.hincel = hintex;
            this.y = newY;
            this.x = newX;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy+=3;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if (this.energy >= 60) {
                this.mul();
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            this.y = newY;
            this.x = newX;
            for (var i in xotaker) {
                if (newX == xotaker[i].x && newY == xotaker[i].y) {
                    xotaker.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var newGishatich = new Gihsatich(this.x, this.y, this.index);
        gishatich.push(newGishatich);
        matrix[this.y][this.x] = this.index
        this.energy = 50;

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gishatich) {
            if (this.x == gishatich[i].x && this.y == gishatich[i].y) {
                gishatich.splice(i, 1);
                break;
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
/////////  AMENAKER   ////////////////////////////////////////////////////////////////////////
class Amenaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
        this.hincel = 0;
    }
    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCellxy = random(emptyCells);
        if (newCellxy) {
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy -= 2;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var emptyCellsx = this.chooseCell(2);
        var emptyCellsxy = this.chooseCell(3);
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        for (var i = 0; i < emptyCellsxy.length; i++) {
            a.push(emptyCellsxy[i]);
        }
        var newCellxy = random(a);
        if (newCellxy) {
            this.energy++;
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            matrix[newY][newX] = this.index;
            if (this.energy >= 20) {
                this.mul();
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            this.y = newY;
            this.x = newX;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in xotaker) {
                if (newX == xotaker[i].x && newY == xotaker[i].y) {
                    xotaker.splice(i, 1);
                    break;
                }
            }
            for (var i in gishatich) {
                if (newX == gishatich[i].x && newY == gishatich[i].y) {
                    gishatich.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var newAmenaker = new Amenaker(this.x, this.y, this.index);
        amenaker.push(newAmenaker);
        matrix[this.y][this.x] = this.index
        this.energy = 6;
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in amenaker) {
            if (this.x == amenaker[i].x && this.y == amenaker[i].y) {
                amenaker.splice(i, 1);
                break;
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
/////////  VORSORD   ////////////////////////////////////////////////////////////////////////
class Vorsord {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.hincel = 0;
        this.index = index;
    }
	 getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }

            }
        }
        return found;
    }
    getNewCoordinatesk() {
        this.directionk = [
		    [this.x-3 , this.y-3],
			[this.x-2 , this.y-3],
			[this.x-1 , this.y-3],
			[this.x   , this.y-3],
			[this.x+1 , this.y-3],
			[this.x+2 , this.y-3],
			[this.x+3 , this.y-3],
			[this.x-3 , this.y-2],
			[this.x-2 , this.y-2],
			[this.x-1 , this.y-2],
			[this.x   , this.y-2],
			[this.x+1 , this.y-2],
			[this.x+2 , this.y-2],
			[this.x+3 , this.y-2],
			[this.x-3 , this.y-1],
			[this.x-2 , this.y-1],
			[this.x-1 , this.y-1],
			[this.x   , this.y-1],
			[this.x+1 , this.y-1],
			[this.x+2 , this.y-1],
			[this.x+3 , this.y-1],
			[this.x-3 , this.y  ],
			[this.x-2 , this.y  ],
			[this.x-1 , this.y  ],
			[this.x   , this.y  ],
			[this.x+1 , this.y  ],
			[this.x+2 , this.y  ],
			[this.x+3 , this.y  ],
			[this.x-3 , this.y+1],
			[this.x-2 , this.y+1],
			[this.x-1 , this.y+1],
			[this.x   , this.y+1],
			[this.x+1 , this.y+1],
			[this.x+2 , this.y+1],
			[this.x+3 , this.y+1],
			[this.x-3 , this.y+2],
			[this.x-2 , this.y+2],
			[this.x-1 , this.y+2],
			[this.x   , this.y+2],
			[this.x+1 , this.y+2],
			[this.x+2 , this.y+2],
			[this.x+3 , this.y+2],
			[this.x-3 , this.y+3],
			[this.x-2 , this.y+3],
			[this.x-1 , this.y+3],
			[this.x   , this.y+3],
			[this.x+1 , this.y+3],
			[this.x+2 , this.y+3],
			[this.x+3 , this.y+3],
        ];
    }
    chooseCellk(characterk) {
        this.getNewCoordinatesk();
        var foundk = [];
        for (var i in this.directionk) {
            var x = this.directionk[i][0];
            var y = this.directionk[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == characterk) {
                    foundk.push(this.directionk[i]);
                }
            }
        }
        return foundk;
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsx = this.chooseCell(1);
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = random(a);
        if (newCellxy) {
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            var hintex = matrix[newY][newX];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = this.hincel;
            this.hincel = hintex;
            this.y = newY;
            this.x = newX;
        }
    }
    eat() {
        var emptyCells = this.chooseCellk(2);
        var emptyCellsx = this.chooseCellk(3);
        var emptyCellsxy = this.chooseCellk(4);
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        for (var i = 0; i < emptyCellsxy.length; i++) {
            a.push(emptyCellsxy[i]);
        }
        var newCellxy = random(a);
        if (newCellxy) {
            this.energy += 8;
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            matrix[newY][newX] = 0
            for (var i in xotaker) {
                if (newX == xotaker[i].x && newY == xotaker[i].y) {
                    xotaker.splice(i, 1);
                    break;
                }
            }
            for (var i in gishatich) {
                if (newX == gishatich[i].x && newY == gishatich[i].y) {
                    gishatich.splice(i, 1);
                    break;
                }
            }
            for (var i in amenaker) {
                if (newX == amenaker[i].x && newY == amenaker[i].y) {
                    amenaker.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
}




