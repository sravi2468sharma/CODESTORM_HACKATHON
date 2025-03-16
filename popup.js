document.addEventListener("DOMContentLoaded", function () {
    const statusDiv = document.getElementById("status");

    function updateStatus(message, isPhishing) {
        statusDiv.textContent = message;
        statusDiv.className = isPhishing ? "phishing" : "safe";
    }

    async function analyzeCurrentTab() {
        try {
            let tabs = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tabs.length === 0 || !tabs[0].url) {
                updateStatus("No active tab found", true);
                return;
            }

            let url = tabs[0].url;

            if (!url.startsWith("http")) {
                updateStatus("Invalid URL", true);
                return;
            }

            let sslStatus = url.startsWith("https") ? "valid" : "invalid";

            // Simple heuristic: If site doesn't use HTTPS, assume it's phishing
            if (sslStatus === "invalid") {
                updateStatus("❌ Not Secure", true);
                return;
            }

            updateStatus("✅ Secure", false);

        } catch (error) {
            updateStatus(`Error: ${error.message}`, true);
        }
    }

    analyzeCurrentTab();
});
