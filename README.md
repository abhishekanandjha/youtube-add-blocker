# youtube-add-blocker

⸻

YouTube Ad Skipper / Blocker

A lightweight Chrome Extension that automatically skips YouTube ads by:
	•	Playing ads at 10x speed or skip the entire add by calculating the add video duration and skipping to last
	•	Muting ads during playback
	•	Clicking the “Skip Ad” button as soon as it appears

This gives you an ad-free, smooth YouTube experience without relying on external blockers.

⸻

Features

✅ Detects when an ad starts
✅ Increases ad playback speed to 10x (browser limit) or skip the entire add by calculating the add video duration and skipping to last
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
