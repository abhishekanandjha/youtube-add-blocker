# youtube-add-blocker

⸻
⚠️ Disclaimer

This extension is developed strictly for personal and educational purposes only.
	•	It is not affiliated with, endorsed, or approved by YouTube, Google, or LinkedIn.
	•	YouTube’s Terms of Service prohibit the use of third-party tools to block or alter ads. By using this 		extension, you acknowledge that you are solely responsible for any consequences that may arise from modifying your browsing experience.
	•	The author of this project does not encourage, promote, or distribute ad-blocking as a commercial product.
	•	This project is intended only as a learning exercise in Chrome extension development and personal productivity tool.

If you choose to use this code, you do so at your own risk and responsibility.


⸻

⚖️ Legal Notes
	•	Do not publish this extension on the Chrome Web Store or any public distribution platform.
YouTube and LinkedIn explicitly prohibit the use of extensions that modify, block, or interfere with their ads and user experience. Uploading or distributing this publicly may result in takedowns, account bans, or legal action.
	•	Personal Use Only
This project should remain installed only in Developer Mode on your own machine. Do not share pre-built .crx files or promote this as an “ad blocker” to others.
	•	Respect Platform Policies
	•	YouTube and Google rely on ads for revenue. Bypassing or skipping ads violates their Terms of Service.
	•	LinkedIn has similar restrictions against scraping or altering feed behavior.
	•	Educational Purpose
The primary goal of this project is to learn:
	•	How Chrome extensions work
	•	How to manipulate the DOM
	•	How to handle single-page app (SPA) navigation with JavaScript
	•	How MutationObservers, event dispatchers, and redirection rules function

By using this project, you accept full responsibility for any actions or consequences. The author assumes no liability for misuse.


YouTube Ad Skipper / Blocker / shorts Blocker

•	🚫 Blocking YouTube Shorts (redirects you to neetcode homepage).
•	🚫 Blocking LinkedIn Feed (redirects you to your neetcode profile instead).

A lightweight Chrome Extension that automatically skips YouTube ads by:
	•	Playing ads at 10x speed or skip the entire add by calculating the ad video duration and skipping to last
	•	Muting ads during playback
	•	Clicking the “Skip Ad” button as soon as it appears

This gives you an ad-free, smooth YouTube experience without relying on external blockers.
Perfect for productivity + uninterrupted video watching.
⸻

Features
🔴 Shorts & Feed Blocker
•	If you open YouTube Shorts → You get redirected to YouTneetcodeube homepage.
•	If you open LinkedIn Feed → You get redirected to your neetcode profile.
•	Optionally, a freeze overlay is displayed for 1 minute to prevent going back.

✅ Detects when an ad starts
✅ Increases ad playback speed to 10x (browser limit) or skip the entire add by calculating the ad video duration and skipping to last
✅ Mutes the ad while it’s running
✅ Instantly clicks the Skip Ad button when available (currently not working)
✅ Resets to normal playback after the ad finishes
✅ Lightweight, runs only on YouTube

⸻

📦 Installation

Since this is a developer extension (not yet on Chrome Web Store), you’ll need to load it manually:
	1.	Download / Clone this repository

git clone https://github.com/yourusername/youtube-ad-skipper.git
cd youtube-ad-skipper


	2.	Open Chrome Extensions
	•	Go to chrome://extensions/
	•	Enable Developer Mode (toggle on top right)
	3.	Load Extension
	•	Click Load unpacked
	•	Select the folder containing manifest.json
	4.	Done ✅
	•	You should now see YouTube Ad Skipper in your extensions list

⸻

🛠️ How It Works

The extension injects a content script (content.js) into YouTube pages:
	•	Ad detection: Observes YouTube’s video player for ad classes (ad-interrupting)
	•	Speed boost: Sets video.playbackRate = 10
	•	Mute: Temporarily mutes ads (video.muted = true)
	•	Skip: Looks for #skip-button or .ytp-skip-ad-button and clicks it instantly
	•	Restore: Resets to normal playback once the ad ends

⸻

🔑 Permissions

The extension requires:
	•	"activeTab" → To interact with the YouTube tab
	•	"scripting" → To inject scripts into YouTube pages
	•	"storage" → (Optional) for storing settings if you extend later
	•	"webNavigation" → To detect page loads

⸻

📂 File Structure

youtube-ad-skipper/
│── manifest.json      # Extension config
│── content.js         # Core logic (ad detection + skipping)
│── README.md          # Documentation


⸻

⚠️ Limitations
	•	Maximum speed is capped (~10x) by Chrome → YouTube may throttle beyond this.
	•	Works only on desktop Chrome (not on iOS/Android YouTube app).
	•	YouTube frequently changes UI — you may need to update selectors (skip-button, .ytp-skip-ad-button).

⸻

🐞 Troubleshooting
	•	Skip button not clicked?
→ Update the selector in content.js to match YouTube’s latest DOM.
	•	Still hearing ads?
→ Ensure the extension is active on youtube.com.
	•	Not working after update?
→ Reload the extension from chrome://extensions/.

⸻

🔮 Future Enhancements
	•	Options page → configure playback speed (10x) or direct skip
	•	Dark mode icon
	•	Auto-update selectors when YouTube changes UI
    •	Block all the adult webiste for child safety and not able to uninstall the plugin without parent consent
	•	youtube / linkedin / X : shorts blocker for chrome and maybe extend for safari and edge

⸻

📝 License

MIT License. Free to use, modify, and distribute.

⸻
