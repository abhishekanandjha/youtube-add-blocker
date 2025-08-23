

///// version 3 - make it across all tabs and add options page
// Load rules from synced storage or set empty if none


// Hardcoded list of blocking rules
const redirectRules = [
    {
        match: "youtube.com/shorts/",
        redirect: "https://neetcode.io/practice?tab=neetcode250"
    },
    {
        match: "linkedin.com/feed/",
        redirect: "https://neetcode.io/practice?tab=neetcode250"
    }
];

// Function to freeze page
function freezePage() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "#fff";
    overlay.style.fontSize = "24px";
    overlay.innerText = "Blocked for 1 minute... Go do something productive!";
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
    }, 60000);
}

// Main redirect handler
function handleNavigation(tabId, url) {
    for (let rule of redirectRules) {
        if (url.includes(rule.match)) {
            chrome.tabs.update(tabId, { url: rule.redirect }, () => {
                setTimeout(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: freezePage
                    });
                }, 1000);
            });
            break;
        }
    }
}

// For normal page loads
chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId === 0) {
        handleNavigation(details.tabId, details.url);
    }
});

// For SPA navigation (no full reload)
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId === 0) {
        handleNavigation(details.tabId, details.url);
    }
});