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
    if (fullscreenContainer && !document.fullscreenElement) {
        fullscreenContainer.classList.remove("fullscreen");
        fullscreenContainer.style.width = "854px";
        fullscreenContainer.style.height = "480px";
    }
}

// Refresh Game (Force Reload Iframe)
function refreshGame() {
    const iframe = document.getElementById("myiframe");

    if (iframe) {
        const currentSrc = iframe.getAttribute("src");
        if (currentSrc) {
            const newSrc = currentSrc.includes("?")
                ? currentSrc.split("?")[0] + "?t=" + new Date().getTime()
                : currentSrc + "?t=" + new Date().getTime();
            
            iframe.src = newSrc;
            console.log("Game refreshed:", newSrc);
        } else {
            console.error("Error: Game iframe has no source URL.");
        }
    } else {
        console.error("Error: Game iframe not found. Retrying...");
        setTimeout(refreshGame, 500); // Retry after 500ms
    }
}

// Ensure the iframe is loaded before trying to refresh
document.addEventListener("DOMContentLoaded", function() {
    waitForIframe();
});

// Function to Wait for the Iframe to Load
function waitForIframe() {
    const iframe = document.getElementById("myiframe");
    if (iframe) {
        console.log("Game iframe is loaded and ready.");
    } else {
        console.warn("Game iframe not found. Retrying in 500ms...");
        setTimeout(waitForIframe, 500);
    }
}
