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
