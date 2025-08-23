function loadRules() {
    chrome.storage.sync.get({ redirectRules: [] }, (data) => {
        const rulesList = document.getElementById("rulesList");
        rulesList.innerHTML = "";
        data.redirectRules.forEach((rule, index) => {
            const li = document.createElement("li");
            li.textContent = `${rule.match} → ${rule.redirect}`;
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => removeRule(index);
            li.appendChild(removeBtn);
            rulesList.appendChild(li);
        });
    });
}

function addRule() {
    const match = document.getElementById("match").value.trim();
    const redirect = document.getElementById("redirect").value.trim();
    if (!match || !redirect) return;

    chrome.storage.sync.get({ redirectRules: [] }, (data) => {
        data.redirectRules.push({ match, redirect });
        chrome.storage.sync.set({ redirectRules: data.redirectRules }, loadRules);
    });
}

function removeRule(index) {
    chrome.storage.sync.get({ redirectRules: [] }, (data) => {
        data.redirectRules.splice(index, 1);
        chrome.storage.sync.set({ redirectRules: data.redirectRules }, loadRules);
    });
}

document.getElementById("addRule").addEventListener("click", addRule);

loadRules();