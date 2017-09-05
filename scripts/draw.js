var colorPattern = "angle";
var colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#16a085", "#3498db", "#9b59b6", "#c15379"];

var checker1 = colors[0]; var checker2 = colors[5];
var solid = colors[5];

var light = "#ecf0f1";
var dark = "#34495e";

function draw(b) {
    clear();
    var table = document.getElementById("game")
    
    var dim = 400/d;
    
    for (var x = 0; x < d; x++) {
        
        var row = document.createElement("tr");
        row.id = x.toString() + "r";
        
        for (var y = 0; y < d; y++) {
            var tileNum = b[x][y];
            var tile = document.createElement("td");
            tile.id = tileNum.toString();
            
            tile.style.width = dim + "px";
            tile.style.height = (dim-3) + "px";
            
            if ( tileNum == d*d ) {
                tile.innerHTML = ""; tile.style.borderColor = "transparent";
            }
            
            else { tile.innerHTML = tileNum; }
            
            row.appendChild(tile);
            
        }
        table.appendChild(row);
    }
    colorBoard(colorPattern);
}

function clear() {
    var c = document.getElementById("game");
    while (c.children.length > 0) {
        c.removeChild(c.children[0]);
    }
}

function colorBoard(val) {
    if (val == "checker") { checkerColor(); }
    else if (val == "angle") { angleColor(); }
    else if (val == "solid") { solidColor(); }
}

function checkerColor() {
    // TRUE is color1, FALSE is color2 
    function rob(b) { return b ? checker1 : checker2; }
    
    // Define current color and table element
    var currentColor = false;
    var table = document.getElementById("game");
    
    for (var row = 0; row < d; row++) {
        var r = table.children[row];
        
        // if d is odd, make start value opposite
        if ( d%2 == 0 ) { currentColor = !currentColor; }
        
        for (var el = 0; el < d; el++) {
            // we know the number that BELONGS here should be:
            var val = row*d + el + 1;
            var e = document.getElementById(val.toString())
            if (e.innerHTML != "") { e.style.backgroundColor = rob(currentColor); }
            currentColor = !currentColor;
        }
    }
}

function angleColor() {
    var ca = colors.slice(0, d-1);
    var table = document.getElementById("game");
    for (var x = 0; x < d; x++) {
        
        var row = table.children[x];
        
        for (var y = 0; y < d; y++) {
            var el = row.children[y];
            var c = ca[position(parseInt(row.children[y].id), boardSolved).min()];
            el.style.backgroundColor = c;
            
            
        }
    }
}

function solidColor() {
    var table = document.getElementById("game");
    for (var x = 0; x < d; x++) {
        var row = table.children[x];
        for (var y = 0; y < d; y++) {
            var q = row.children[y];
            q.style.backgroundColor = solid;
            if (q.innerHTML == "") { q.style.backgroundColor = "transparent";}
            
        }
    }
}

function showSolution(moves) {
    var on = 0;
    var i = setInterval(function() {
        if (on >= moves.length) { clearInterval(i); }
        
        move(board, moves[on], true);
        draw(board);
        on++;
    }, 200);
}

function checkValidHex(s) {

    var p=['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
    if (s[0] != "#" || ( s.length != 4 && s.length != 7 )) {
        return false;
    }
    
    for (var i = 1; i < s.length; i++) {
        if (!(p.hasValue(s[i]))) {
            return false;
        }
    }
    return true;
}