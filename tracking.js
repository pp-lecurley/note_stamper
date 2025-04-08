document.addEventListener("DOMContentLoaded", () => {
    const trackingInput = document.getElementById("tracking-input");
    const toggleEnv = document.getElementById("toggle-env");
    const generateButton = document.getElementById("generate-btn");
    const resetButton = document.getElementById("reset-btn");
    const outputArea = document.getElementById("output-area");
    const copyButton = document.getElementById("copy-btn");
    const outputContainer = document.getElementById("output-container");

    // Default environment is sandbox
    toggleEnv.checked = false;

    generateButton.addEventListener("click", () => {
        const inputLines = trackingInput.value.trim().split("\n");
        if (inputLines.length < 2) {
            alert("Please provide both Client ID and BN Code (one per line).");
            return;
        }

        const clientId = inputLines[0].trim();
        const bnCode = inputLines[1].trim();
        const isLive = toggleEnv.checked;

        if (!clientId || !bnCode) {
            alert("Please provide valid Client ID and BN Code.");
            return;
        }

        const links = generateLinks(clientId, bnCode, isLive);
        outputArea.value = links;
        outputContainer.style.display = "block";
        copyButton.style.display = "inline-block";
    });

    resetButton.addEventListener("click", () => {
        trackingInput.value = "";
        toggleEnv.checked = false;
        outputArea.value = "";
        outputContainer.style.display = "none";
        copyButton.style.display = "none";
    });

    copyButton.addEventListener("click", () => {
        if (outputArea.value.trim()) {
            navigator.clipboard.writeText(outputArea.value)
                .then(() => alert("Copied to clipboard!"))
                .catch(() => alert("Failed to copy."));
        } else {
            alert("Nothing to copy.");
        }
    });

    function generateLinks(clientId, bnCode, isLive) {
        if (isLive) {
            return `
REST-BN_Code: https://apihistory.paypal.com/apihistorynodeweb/search?searchType=attribution_id&q=${bnCode}&days=7
REST-CLIENT_ID: https://apihistory.paypal.com/apihistorynodeweb/search?q=${clientId}&days=7
SRE-BN_Code: https://engineering.paypalcorp.com/merchantmonitor/#/api-activity/results?openTab=api-table&idType=BnCode&idValue=${bnCode}
            `.trim();
        } else {
            return `
REST-BN_Code: https://internal.sandbox.paypalinc.com/apihistorynodeweb/search?searchType=attribution_id&q=${bnCode}&days=7
REST-CLIENT_ID: https://internal.sandbox.paypalinc.com/apihistorynodeweb/search?q=${clientId}&days=7
            `.trim();
        }
    }
});