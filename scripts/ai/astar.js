function astar(start, goal=boardSolved) {
    // Already evaluated nodes
    var closedSet = [];
    
    // Discovered but unevaluated nodes
    var openSet = [start];
    
    // Where node is most efficiently reached from
    var cameFrom = new Map();
    
    // Cost of getting to node from start
    var gScore = new Map();
    gScore[start] = 0;
    
    // Total cost of getting from start to goal
    // By passing through that node. Partially heuristic
    var fScore = new Map();
    fScore[start] = heuristic(start, goal);
    
    while (openSet.length != 0) {
        
        // Current will eventually be node in openSet with lowest fScore
        var current = openSet[0];
        var currentIndex = 0;
        for (var i = 1; i < openSet.length; i++) {
            var checking = openSet[i];
            var fScoreCurrent = fScore[current] || Infinity;
            var fScoreChecking = fScore[checking] || Infinity;
            if (fScoreChecking < fScoreCurrent) {
                current = checking; currentIndex = i;
            }
        }
        
        if (compareBoards(current, goal)) {
            return pathToMoves( reconstructPath(cameFrom, current) );
        }
        
        // Remove current from openSet, append to closedSet
        openSet.splice(currentIndex, 1);
        closedSet.push(current);
        
        // Generate neighbors of current
        var neighbors = [];
        var possMoves = possibleMoves(current);
        for (var k = 0; k < possMoves.length; k++) {
            var newBoard = copyBoard(current);
            move(newBoard, possMoves[k], true);
            neighbors.push(copyBoard(newBoard));
        }

        // For each neighbor in current
        for (var m = 0; m < neighbors.length; m++) {
            var neighbor = neighbors[m];
            
            // If neighbor has already been evaluated, ignore it
            if (hasBoardState(closedSet, neighbor)) { continue; }
            
            var tentativeGScore = gScore[current] + 1;
            var neighborG = gScore[neighbor] || Infinity;
            
            // If node is newly discovered
            if (!hasBoardState(openSet, neighbor)) {
                openSet.push(neighbor);
            }
            
            else if (tentativeGScore >= neighborG) { continue; }
            
            // Path is best so far, so record it
            cameFrom[neighbor] = current;
            gScore[neighbor] = tentativeGScore;
            fScore[neighbor] = tentativeGScore + heuristic(neighbor, goal);
            
            if (closedSet.length%1000 == 0) {
                console.log("Checked: " + closedSet.length);
            }
        }
        
    }
    return false;
}

function reconstructPath(cameFrom, current) {
    totalPath = [current];
    while (cameFrom[current]) {
        current = cameFrom[current];
        totalPath.push(current);
    }
    totalPath.reverse();
    return totalPath;
}

function hasBoardState(array, state) {
    for (var i = 0; i < array.length; i++) {
        if (compareBoards(array[i], state)) {
            return true;
        }
    }
    return false;
}

function pathToMoves(path) {
    var moves = [];
    for (var i = 0; i < path.length - 1; i++) {
        
        var state1 = path[i]; var state2 = path[i + 1];
        var moveBetween;
        
        var space = position(d*d, state2);
        
        moves.push( state1[space[0]][space[1]] );
    }
    return moves;
}