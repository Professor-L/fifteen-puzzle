var board = [];
var boardSolved = [];
var d = 4;

function initBoard(arr) {
    d = Math.sqrt(arr.max());
    board = [];
    for (var i = 0; i < d; i++) { board.push([]); boardSolved.push([]); }
    
    var on = 1;
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            board[x][y] = on; boardSolved[x][y] = on; on++;
        }
    }
}

function scrambleBoard() {
    var a = board.slice().unNest().randomize();
    for(var x=0;x<d;x++){for(var y=0;y<d;y++){board[x][y]=a[y+(x*d)];}}
    while(!solvable(board)) { scrambleBoard(); }
    
}

function solvable(b) {
    var a = b.slice().unNest().remove(d*d).inversions();
    return (d%2==1)?(a%2==0):((d-position(d*d,b)[1])%2!=a%2);
}

function position(n, b) {
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            if (b[x][y] == n) { return [x, y]; }
        }
    }
    return [-1, -1];
}

function move(bd, n, actuallyMove) {
    var np = position(n, bd);
    var sp = position(d*d, bd);
    
    var difx = Math.abs(np[0] - sp[0]);
    var dify = Math.abs(np[1] - sp[1]);
    
    if (difx + dify == 1) {
        if (actuallyMove) {
            bd[sp[0]][sp[1]] = n;
            bd[np[0]][np[1]] = d*d;
        }
        return true;
    }
    return false;
}

function possibleMoves(b) {
    var f = [];
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            if (move(b, b[x][y], false)) {
                f.push(b[x][y]);
            }
        }
    }
    return f;
}

function compareBoards(b1, b2) {
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            if (b1[x][y] != b2[x][y]) { return false; }
        }
    }
    return true;
}

function copyBoard(b) {
    var t = [];
    for (var x = 0; x < d; x++) {
        t.push(b[x].slice());
    }
    return t;
}

function manhattan(b1, b2) {
    var total = 0;
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            var p2 = position(b1[x][y], b2);
            total += Math.abs(p2[0] - x) + Math.abs(p2[1] - y);
        }
    }
    return total;
}

function heuristic(b1, b2) {
    return (manhattan(b1, b2));
}

initBoard(range(1, 17));