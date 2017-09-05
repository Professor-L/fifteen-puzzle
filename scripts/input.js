

// So the easter egg isn't obvious in code
String.prototype.hash = function() {
    var h = 0;
    if (this.length == 0) { return h; }
    
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        h = ((h<<5)-h)+char;
        h = h & h;
    }
    return h;
}

var patterns = ["angle", "checker", "solid"];

// Establishing functions for onclick of size setting elements
for (var i = 3; i < 10; i++) {
    document.getElementById(i + "s").onclick = function() {
        document.querySelector("#sizeTable td.active").className = "";
        
        this.className = "active";
        
        d = parseInt(this.id);
        initBoard(range(1, d*d + 1)); draw(board);
        
        var s1 = document.getElementById("solvea");
        var s2 = document.getElementById("solveida");
        

        s1.disabled = !(d == 3);
        s2.disabled = !(d == 3);

        
        updateMoveFunctions();
    }
}


// for arrow keys, only onkeydown works, not onkeypress
// keyCode values for arrow keys

var left = 37;
var up = 38;
var right = 39;
var down = 40;

// Moving elements by clicking on them

function updateMoveFunctions() {
    
    for (var i = 1; i < (d*d)+1; i++) {
        document.getElementById(i.toString()).onclick = function() {
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

document.getElementById("solvea").onclick = function() {
    
    document.getElementById("thinking").style.display = "block";
    
    window.setTimeout(function() {
        showSolution(astar(board, boardSolved));
        document.getElementById("thinking").style.display = "none";
    }, 10);

}

document.getElementById("solveida").onclick = function() {
    
    document.getElementById("thinking").style.display = "block";
    
    window.setTimeout(function() {
        showSolution(ida_star(board, boardSolved));
        document.getElementById("thinking").style.display = "none";
    }, 10);
}



var info = document.getElementById("infoClick");
var settings = document.getElementById("settingsClick");

info.onmouseover = function() {
    this.src = "images/info_blue.png";
}
info.onmouseleave = function() {
    this.src = "images/info_gray.png";
}

settings.onmouseover = function() {
    this.src = "images/settings_blue.png";
}
settings.onmouseleave = function() {
    this.src = "images/settings_gray.png";
}

info.onclick = function() {
    displayModal(document.getElementById("infoModal"));
}

settings.onclick = function() {
    displayModal(document.getElementById("settingsModal"));
    
    document.querySelector("#settingsModal button.green").className = "red";
    
    document.getElementById(colorPattern + "Button").className = "green";
    
    if (colorPattern == "solid") {
        document.getElementById("customColor").disabled = false;
    }
}

var patterns = ["solid", "checker", "angle"];

for (var i = 0; i < patterns.length; i++) {
    document.getElementById(patterns[i] + "Button").onclick = function() {
        colorPattern = this.id.split("B")[0];
        
        if (colorPattern == "solid") {
            document.getElementById("customColor").disabled = false;
        }
        else {
            document.getElementById("customColor").disabled = true;
        }
        
        document.querySelector("#settingsModal button.green").className = "red";
        
        this.className = "green"
    }
}

document.getElementById("saveSettings").onclick = function() {
    hideModal(document.getElementById("settingsModal"));
    
    var c = document.getElementById("customColor").value;
    solidColor = checkValidHex(c) ? c : solidColor;
    
    document.querySelector("#settings td.active").click();
}


document.getElementById("algTab").onclick = function() {
    document.getElementById("algorithmDiv").style.display = "block";
    document.getElementById("developerDiv").style.display = "none";
    document.querySelector("#infoTabs td.active").className = "";
    this.className = "active";
}

document.getElementById("devTab").onclick = function() {
    document.getElementById("algorithmDiv").style.display = "none";
    document.getElementById("developerDiv").style.display = "block";
    document.querySelector("#infoTabs td.active").className = "";
    this.className = "active";
}

document.getElementById("infoLink").onclick = function() {
    displayModal(document.getElementById("infoModal"));
    document.getElementById("algTab").click();
}




