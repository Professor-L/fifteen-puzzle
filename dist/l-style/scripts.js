function displayModal(modal) {
    
    // Define wrapper
    var wrapper = modal.parentElement;
    
    wrapper.style.display = "flex";
    
    setTimeout(function() {
        
        wrapper.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
        modal.style.transform = "translateY(0px)";
        modal.style.opacity = 1;

    }, 10)
}

function hideModal(modal) {
    
    // Define wrapper as well as modal
    var wrapper = modal.parentElement;
    
    // Fade out background, move modal up
    wrapper.style.backgroundColor = "transparent";
    modal.style.transform = "translateY(-60px)";
    modal.style.opacity = 0;
    
    // Set timeout for hiding actual modal after .3s
    setTimeout(function() {wrapper.style.display = "none";}, 300);
}





// All close modal <span> elements
var modalClose = document.getElementsByClassName("closeModal");

// Set onclick for each one
for (var i = 0; i < modalClose.length; i++) {
    
    // Hide parent modal on click
    modalClose[i].onclick = function() { 
        hideModal(this.parentElement); 
    }
}



