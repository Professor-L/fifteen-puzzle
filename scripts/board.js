var board = [];
var boardSolved = [];
var d = 4;

function initBoard(arr) {
    d = Math.sqrt(arr.length);
    board = [];
    boardSolved = [];
    for (var i = 0; i < d; i++) { board.push([]); boardSolved.push([]); }
    
    var on = 1;
    for (var x = 0; x < d; x++) {
        for (var y = 0; y < d; y++) {
            board[x][y] = arr[on-1]; boardSolved[x][y] = on; on++;
        }
    }
}

function scrambleBoard() {
    var a = board.slice().unNest().randomize();
    initBoard(a);
    
    while(!solvable(board)) { scrambleBoard(); }
}

function solvable(b) {
    var a = b.slice().unNest();
    a.remove(d*d);
    var inv = a.inversions();
    
    if (d%2 == 1) {
        return (inv%2 == 0);
    }
    
    else if (d%2 == 0) {
        var blankRow = d - (position(d*d, b)[0]);
        return ( inv%2 != blankRow%2 );
    }
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

function solved(b) {
    compareBoards(b, boardSolved);
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

function linearConflict(b1, b2) {
    var conflicts = 0;
    var rac = b1.slice();
    var racSolved = b2.slice();
    
    // Adds columns to rac, racSolved
    for (var y = 0; y < d; y++) {
        var a = [];
        var b = [];
        for (var x = 0; x < d; x++) {
            a.push(b1[x][y]);
            b.push(b2[x][y]);
        }
        rac.push(a);
        racSolved.push(b);
    }
    
    // For each row/column...
    for (var i = 0; i < rac.length; i++) {
        // Row or column as array
        var current = rac[i];
        var currentSolved = racSolved[i];
        
        // Calculate permutations
        var permutations = calcPerm(currentSolved);
        
        for (var p = 0; p < permutations.length; p++) {
            var two = permutations[p];
            if (current.hasValue(two[1]) && current.hasValue(two[0])) {
                if (current.indexOf(two[0]) > current.indexOf(two[1])) {
                    if (two[0] != d*d && two[1] != d*d) {
                        conflicts++;
                    }
                }
            }
        
        }
        
    }
    
    return conflicts*2;
    
}

function calcPerm(a) {
        var p = [];
        for (var k = 0; k < a.length; k++) {
            for (var m = k+1; m < a.length; m++) {
                p.push([a[k], a[m]]);
            }
        }
        return p;
    }

function heuristic(b1, b2) {
    return (manhattan(b1, b2));
}

initBoard(range(1, 17));