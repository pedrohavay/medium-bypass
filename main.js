// Listener to extension icon click
chrome.browserAction.onClicked.addListener(function () {
    // Getting the current tab
    chrome.tabs.getSelected(null, function (tab) {
        // Getting url from active tab
        const current_url = tab.url;

        // Checking if is Medium website
        chrome.tabs.executeScript(tab.id, {
            code: 'document.querySelector("meta[content=Medium]")'
        }, function (medium) {
            // Validating the result
            const checker = (medium[0] || null);

            if (checker !== null) {
                // Redirecting to 'https://t.co/'
                chrome.tabs.update(tab.id, { url: 'https://t.co/' }, function () {
                    // Defining timeout after the page loads
                    setTimeout(function () {
                        // Redirecting to source url
                        chrome.tabs.executeScript(tab.id, {
                            code: `window.location.replace("${current_url}")`
                        }, null);
                    }, 1000);
                })
            }
        });
    });
});