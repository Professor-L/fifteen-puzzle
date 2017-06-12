var modal = document.getElementById("settingsModal");
var content = document.getElementById("settingsContent");

// Modal style, set with js because it's easier
modal.style.display = "none";
modal.style.zIndex = "1";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
modal.style.position = "absolute";
modal.style.top = "0"; modal.style.left = "0";
modal.style.width = "100%"; modal.style.height = "100%";

// Content style, also with js
content.style.margin = "15% auto";
content.style.height = "60%";
content.style.width = "60%";
content.style.background = "linear-gradient(to right, #ecf0f1, #bdc3c7, #ecf0f1)";
content.style.paddingTop = "20px";
content.style.paddingLeft = "30px";

document.getElementById("settingsButton").onclick = function() {
    modal.style.display = "block";
}

// When the user clicks outside the modal, close it
document.getElementById("close").onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}