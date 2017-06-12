// Establishing functions for onclick of size setting elements
for (var i = 3; i < 10; i++) {
    document.getElementById(i.toString() + "s").onclick = function() {
        
        d = parseInt(this.id);
        initBoard(range(1, d*d + 1)); draw(board);
        
        updateMoveFunctions();
    }
}


// for arrrow keys, only onkeydown works, not onkeypress
// keyCode values for arrow keys

var left = 37;
var up = 38;
var right = 39;
var down = 40;

// Moving elements by clicking on them

function updateMoveFunctions() {
    
    for (var i = 1; i < d+1; i++) {
        document.getElementById(i).onclick = function() {
            if (move(board, parseInt(this.id), true)) {
                draw(board); updateMoveFunctions();
            }
        }
    }
}

document.getElementById("scramble").onclick = function() {
    scrambleBoard(); draw(board); updateMoveFunctions();
}

draw(board);
updateMoveFunctions();



// Moving elements with ARROW KEYS !!

document.onkeydown = function(e) {
    e = e || window.event;
    
    var blankPos = position(d*d, board);
    var moved = false;
    
    if (e.keyCode == left) {
        // If there's a piece to the right of blank, move it
        if ( blankPos[1] < d ) {
            move( board, board[ blankPos[0] ][ blankPos[1] + 1 ], true );
            moved = true;
        }
        
    }
    
    else if (e.keyCode == right) {
        // If there's a piece to the left of blank, move it
        if (blankPos[1] > 0) {
            move( board, board[ blankPos[0] ][ blankPos[1] - 1 ], true );
            moved = true;
        }
    }
    
    else if (e.keyCode == up) {
        // If there's a piece below blank, move it
        if (blankPos[0] < d - 1) {
            move( board, board[ blankPos[0] + 1 ][ blankPos[1] ], true );
            moved = true;
        }
    }
    
    else if (e.keyCode == down) {
        // If there's a piece above blank, move it
        if (blankPos[0] > 0) {
            move( board, board[ blankPos[0] - 1 ][ blankPos[1] ], true );
            moved = true;
        }
    }
    
    if (moved) { draw(board); updateMoveFunctions(); }
    
}

