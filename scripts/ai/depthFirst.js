var solution = [];

function depthFirstSearch(boardToSolve, depth) {

    if (solved(boardToSolve)) {
        return true;
    }
    
    if (depth > 22) { return false; }
    
    // Set solution.length to equal depth
    solution.length = depth;
    
    // Get possible moves from current position, remove
    // previous move to prevent infinite loop
    var poss = possibleMoves(boardToSolve);
    poss.remove(solution[depth-1]);
    
    // For each successor board state
    for (var i = 0; i < poss.length; i++) {
        
        // Generate board state and make solution[depth] == to move
        var newBoard = copyBoard(boardToSolve);
        move(newBoard, poss[i], true);
        solution[depth] = poss[i];
        
        if (solved(newBoard)) { return true; }
        
        // Recursively call function
        var solvedYet = depthFirstSearch(newBoard, depth+1);
        if (solvedYet) { return true; }
    }
    
    return false;
    
}