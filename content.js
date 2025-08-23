// function monitorYouTubePlayer() {
//   const video = document.querySelector("video");

//   if (!video) {
//     console.log("No video found yet, retrying...");
//     setTimeout(monitorYouTubePlayer, 1000);
//     return;
//   }

//   const player = document.querySelector(".html5-video-player");

//   const observer = new MutationObserver(() => {
//     if (player.classList.contains("ad-interrupting")) {
//       // Ad is playing → fast-forward and mute
//       video.playbackRate = 10;
//       video.muted = true;
//       console.log("Ad detected → speeding up 10x and muted");
//     } else {
//       // Normal video → reset everything
//       video.playbackRate = 1;
//       video.muted = false;
//       console.log("Normal video → reset to 1x and unmuted");
//     }
//   });

//   observer.observe(player, { attributes: true, attributeFilter: ["class"] });
// }

// monitorYouTubePlayer();


//  above code is v1 commented out 
//  bellow is v2 which includes skip button functionality

// function monitorYouTubePlayer() {
//   const video = document.querySelector("video");

//   if (!video) {
//     console.log("No video found yet, retrying...");
//     setTimeout(monitorYouTubePlayer, 1000);
//     return;
//   }

//   const player = document.querySelector(".html5-video-player");

//   const observer = new MutationObserver(() => {
//     if (player.classList.contains("ad-interrupting")) {
//       // Ad is playing → fast-forward and mute
//       video.playbackRate = 10;
//       video.muted = true;
//       console.log("Ad detected → speeding up 10x and muted");

//       // Check if skip button exists and click it
//     //   const skipButton = document.querySelector(".ytp-ad-skip-button");
//         const skipButton = document.querySelector('[id^="skip-button"]') || document.querySelector('.ytp-skip-ad-button');

//         if (skipButton) {
//             skipButton.click();
//             console.log("Skip button clicked automatically");
//         }

//     } else {
//       // Normal video → reset everything
//       video.playbackRate = 1;
//       video.muted = false;
//       console.log("Normal video → reset to 1x and unmuted");
//     }
//   });

//   observer.observe(player, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true });
// }
// // class="ytp-skip-ad-button ytp-ad-component--clickable"

// // monitorYouTubePlayer();
// setTimeout(monitorYouTubePlayer, 1000);

//  ////////////////. version 3 with multiple hadd and handle skip button  ////////////////

(function () {
    // Hardcoded list of blocking rules
    const redirectRules = [
        {
            match: "youtube.com/shorts/",
            redirect: "https://www.youtube.com/"
        },
        {
            match: "linkedin.com/feed/",
            redirect: "https://www.linkedin.com/in/abhishek-anand-jha-4b3477188/"
        }
    ];

    let lastUrl = location.href;

    // Check every 500ms for URL change
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkAndRedirect(location.href);
        }
    }, 500);

    function checkAndRedirect(url) {
        for (let rule of redirectRules) {
            if (url.includes(rule.match)) {
                window.location.href = rule.redirect;
                setTimeout(() => {
                    freezePage();
                }, 1000);
                break;
            }
        }
    }

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
        overlay.innerText = "Blocked for 1 minute...";
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
        }, 60000);
    }
})();



// How This Works Now
// 	1.	Redirect Rules are hardcoded — works instantly after installing
// 	2.	background.js catches both:
// 	•	Page reloads (onCommitted)
// 	•	SPA navigation (onHistoryStateUpdated)
// 	3.	content.js runs in every tab:
// 	•	Checks URL every 0.5s for changes
// 	•	If it matches any rule → redirect + freeze page for 1 minute
// 	4.	Works for YouTube Shorts, LinkedIn Feed, and can scale by adding new rules

// ⸻

function monitorYouTubePlayer() {
    const videoElement = document.querySelector("video");

    if (!videoElement) {
        console.log("No video found yet, retrying...");
        setTimeout(monitorYouTubePlayer, 1000);
        return;
    }


    const playerElement = document.querySelector(".html5-video-player");

    if (!playerElement) {
        console.log("Player element not found, retrying...");
        setTimeout(monitorYouTubePlayer, 1000);
        return;
    }

    const observer = new MutationObserver(() => {
        const isAdPlaying = playerElement.classList.contains("ad-interrupting");

        if (isAdPlaying) {
            // Always force 10x speed + mute when an ad is playing
            if (videoElement.playbackRate !== 10 || !videoElement.muted) {
                videoElement.playbackRate = 10;
                videoElement.muted = true;
                console.log("Ad detected → forcing 10x speed & muted");
            }

            if (videoElement && videoElement.duration) {
                videoElement.currentTime = videoElement.duration; // jump to end of ad
                console.log("Forced skip by jumping video to end");
            }

            setVideoPlaybackRate(videoElement);
            const skipButton =
                document.querySelector('[id^="skip-button"]') ||
                document.querySelector('.ytp-skip-ad-button');

            if (skipButton) {
                // Create a trusted click event
                const event = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    composed: true // allow event to cross shadow DOM
                });

                skipButton.dispatchEvent(event);
                skipButton.focus();
                const enter = new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Enter",
                    code: "Enter"
                });
                skipButton.dispatchEvent(enter);
                const down = new PointerEvent("pointerdown", { bubbles: true });
                const up = new PointerEvent("pointerup", { bubbles: true });
                skipButton.dispatchEvent(down);
                skipButton.dispatchEvent(up);
                skipButton.click();
                console.log("Skip button dispatched trusted click event");
            }
        }
        // else {
        //     // Restore to normal only when the ad finishes
        //     videoElement.playbackRate = 1;
        //     videoElement.muted = false;
        //     console.log("Normal video → reset to 1x & unmuted");

        // }
    });

    function dismissYouTubeEnforcementBanner() {
        const dismissButton = document.querySelector('#dismiss-button button');
        if (dismissButton) {
            dismissButton.click();
            console.log("YouTube enforcement banner dismissed");
        } else {
            // Retry after 1s if not found yet
            setTimeout(dismissYouTubeEnforcementBanner, 1000);
        }
    }

    function setVideoPlaybackRate(videoElement) {
        videoElement.playbackRate = 1;
        videoElement.muted = false;
        console.log("Normal video → reset to 1x & unmuted");
    }

    observer.observe(playerElement, {
        attributes: true,
        attributeFilter: ["class"],
        childList: true,
        subtree: true,
    });

    console.log("Monitoring YouTube player for ads...");
}


if (window.location.host.includes("youtube.com")) {
    // run YouTube ad skipper logic
    // Start monitoring with a small delay
    setTimeout(monitorYouTubePlayer, 1000);
    setTimeout(dismissYouTubeEnforcementBanner, 2000);
} else if (window.location.host.includes("linkedin.com")) {
    // run LinkedIn ad skipper logic (e.g., speed up video, mute, skip if button exists)
    // will see later
}