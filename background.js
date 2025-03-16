chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: analyzeSite
        });
    }
});

function analyzeSite() {
    let isPhishing = !window.location.href.startsWith("https");
    let message = isPhishing ? "❌ Not Secure" : "✅ Secure";
    alert(`Phishing Detector: ${message}`);
}
