

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

// Inject script that replaces YouTube home feed
function injectReplaceHomeFeed(tabId) {
    chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
            // Function to remove YouTube home feed and replace with motivational message
            function replaceHomeFeed() {
                if (location.pathname === "/" || location.pathname === "/feed/explore") {
                    console.log("On YouTube homepage, replacing feed...");

                    const observer = new MutationObserver(() => {
                        const homeFeed = document.querySelector("ytd-rich-grid-renderer");
                        if (homeFeed) {
                            homeFeed.style.display = "none";

                            if (!document.querySelector("#focus-message")) {
                                const messageDiv = document.createElement("div");
                                messageDiv.id = "focus-message";
                                messageDiv.style.textAlign = "center";
                                messageDiv.style.margin = "50px auto";
                                messageDiv.style.fontSize = "24px";
                                messageDiv.style.fontWeight = "bold";
                                messageDiv.style.color = "#ff4d4f";
                                messageDiv.innerText = "Stay focused! Search only what you need";
                                homeFeed.parentNode.insertBefore(messageDiv, homeFeed);
                            }

                            console.log("Home feed replaced with motivational message");
                            observer.disconnect();
                        }
                    });

                    observer.observe(document.body, { childList: true, subtree: true });
                } else {
                    console.log("home feed not found");
                }
            }

            // Run immediately
            replaceHomeFeed();

            // Detect SPA navigation (YouTube URL changes without reload)
            let lastUrl = location.href;
            new MutationObserver(() => {
                const currentUrl = location.href;
                if (currentUrl !== lastUrl) {
                    lastUrl = currentUrl;
                    replaceHomeFeed();
                }
            }).observe(document, { subtree: true, childList: true });
        }
    });
}

// Main redirect handler
function handleNavigation(tabId, url) {
    for (let rule of redirectRules) {
        if (url.includes(rule.match)) {
            chrome.tabs.update(tabId, { url: rule.redirect }, () => {
                setTimeout(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: (() => {
                            freezePage();
                            // 2. If on YouTube, inject feed blocker

                        })
                    });
                }, 1000);
            });
            break;
        }
    }

    if (url.includes("youtube.com")) {
        injectReplaceHomeFeed(tabId);
        console.log(" inide if statement");
    } else {
        console.log(" outside if statement");
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