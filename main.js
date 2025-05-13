// Toggle Fullscreen Mode
function toggleFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');

    if (!document.fullscreenElement) {
        enterFullscreen(fullscreenContainer);
    } else {
        exitFullscreen();
    }
}

// Enter Fullscreen Mode
function enterFullscreen(container) {
    container.requestFullscreen()
        .then(() => container.classList.add("fullscreen"))
        .catch(err => alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`));
}

// Exit Fullscreen Mode
function exitFullscreen() {
    document.exitFullscreen();
    resetContainerSize();
}

// Reset Container Size on Fullscreen Exit (PC & Mobile)
document.addEventListener("fullscreenchange", resetContainerSize);
document.addEventListener("webkitfullscreenchange", resetContainerSize); // Safari
document.addEventListener("mozfullscreenchange", resetContainerSize);    // Firefox
document.addEventListener("MSFullscreenChange", resetContainerSize);     // Internet Explorer

// Automatically Reset the Container Size
function resetContainerSize() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (!document.fullscreenElement) {
        fullscreenContainer.classList.remove("fullscreen");
        fullscreenContainer.style.width = "854px";
        fullscreenContainer.style.height = "480px";
    }
}

// Refresh Game (Reload Iframe)
function refreshGame() {
    const iframe = document.getElementById("game-frame");
    const currentSrc = iframe.getAttribute("src");
    const newSrc = currentSrc.includes("?")
        ? currentSrc.split("?")[0] + "?t=" + new Date().getTime()
        : currentSrc + "?t=" + new Date().getTime();
    
    iframe.src = newSrc;
}
