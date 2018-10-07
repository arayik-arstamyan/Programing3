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