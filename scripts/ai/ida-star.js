var goal = boardSolved;

function ida_star(root, goalNode=boardSolved) {
    goal = goalNode;
    
    // Set bound to heuristic; will increase
    var bound = heuristic(root, goal) + linearConflict(root, goal);
    
    // Path is stack of board states
    var path = []; path.push(root);
    
    // Dangerous while loop, broken by return
    while (true) {
        
        var t = search(path, 0, bound);
        
        // If found, return path
        if (t == "found") { return pathToMoves(path); break; }
        
        // If impossible, return it
        if (t == Infinity) { return false; break; }
        
        bound = t;
    }
    
}

function search(path, g, bound) {
    
    // Node to branch off of
    var node = path[path.length - 1];
    
    // F score is current cost + heuristic
    var f = g + heuristic(node, goal);
    
    // If it's greater than bound, return it
    if (f > bound) { return f; }
    
    // If we're at our goal, return found
    if (compareBoards(node, goal)) { return "found"; }
    
    var min = Infinity;
    
    // Generate successors
    var neighbors = successors(node);
    
    for (var i = 0; i < neighbors.length; i++) {
        
        var succ = neighbors[i];
        
        // If path does NOT have successor
        if (!hasBoardState(path, succ)) {
            
            // Add it to path
            path.push(succ);
            
            // Search with new successor in path
            var t = search(path, (g + 1), bound);
            if (t == "found") { return "found"; }
            else if (t < min) { min = t; }
            
            // Remove it from path again
            path.pop();
        } 
    }
    
    return min;
}

// Generate succesors of node sorted by heuristic from node to goal
function successors(node) {
    
    // Empty array of successors
    var s = [];
    
    var pMoves = possibleMoves(node);
    
    // For each possible move
    for (var i = 0; i < pMoves.length; i++) {
        
        // Copy board, simulate move to get new board state (node)
        var b = copyBoard(node);
        move(b, pMoves[i], true);
        
        // For speed, calculate heuristic once & store it
        var tempH = heuristic(b, goal);
        
        var added = false;
        
        // Else add to s in proper index so it'll be sorted by heuristic
        // Prevents extra parsing to sort after the fact
        for (var k = 0; k < s.length; k++) {
            if (heuristic(s[k], goal) > tempH) {
                insertBefore(s, b, k);
                added = true;
                break;
            }
        }
        
        if (!added) {
            s.push(b);
        }
    }
    
    // Return successors array
    return s;
}


function insertBefore(a, v, i) {
    // Start at end, go down to index i, shifting array each once
    for (var k = a.length; k > i; k--) {
        a[k] = a[k - 1];
    }
    a[i] = v;
}