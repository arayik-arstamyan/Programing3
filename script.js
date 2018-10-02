/////////     PATAHAKAN MATRIC     /////////////////////////////////////////////////////
function patmatric(n, m) {
    var a = [];
    for (var y = 0; y < n; y++) {
        a[y] = [];
        for (var x = 0; x < m; x++) {
            var z = 0;
            a[y][x] = z;
        }
    }
    return a
}


/// PATAHAKAN TIV NSHVAC MIJAKAYQIC   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandInt(min,max){
    var a=min;
    var b=max;
    var z=Math.floor(Math.random()*(b-a+1))+a;
    return(z);
}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////    XOTAKER  ///////////////////////////////////////////////////////////////////////
var matrix =patmatric(90,120);
for(var i=0; i<5400; i++){
 matrix[getRandInt(0,89)][getRandInt(0,119)]=1;
}
for(var i=0; i<750; i++){
 matrix[getRandInt(0,89)][getRandInt(0,119)]=2;
}
for(var i=0; i<125; i++){
 matrix[getRandInt(0,89)][getRandInt(0,119)]=3;
}
for(var i=0; i<75; i++){
 matrix[getRandInt(0,89)][getRandInt(0,119)]=4;
}
for(var i=0; i<15; i++){
 matrix[getRandInt(0,89)][getRandInt(0,119)]=5;
}
var side = 10;
var grassArr = [];
var xotaker = [];
var gishatich = [];
var amenaker = [];
var vorsord = [];
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background(188, 142, 66);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            }
            else if (matrix[y][x] == 2) {
                xotaker.push(new GrassEater(x, y, 2));
            }
            else if (matrix[y][x] == 3) {
                gishatich.push(new Gihsatich(x, y, 3));
            }
            else if (matrix[y][x] == 4) {
                amenaker.push(new Amenaker(x, y, 4));
            }
            else if (matrix[y][x] == 5) {
                vorsord.push(new Vorsord(x, y, 5));
            }
        }
    }
}



function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(39, 155, 28);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill(241, 160, 8);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(208, 43, 32);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill(80, 66, 183);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill(0,0,0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill(188, 142, 66);
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (var i in xotaker) {
        xotaker[i].eat();
    }
    for (var i in gishatich) {
        gishatich[i].eat();
    }
    for (var i in amenaker) {
        amenaker[i].eat();
    }
    for (var i in vorsord) {
        vorsord[i].eat();
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
}




