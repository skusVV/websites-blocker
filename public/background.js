let redirectUrls = [];
let isRunning = false;
let time = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('isRunning: ', isRunning);
    console.log('time: ', time);
    console.log('NOW: ', new Date().getTime())
    if(time < new Date().getTime()) {
        return;
    }

    if(!isRunning) {
        return;
    }

    if(!time === null) {
        return;
    }

    if (changeInfo.status === 'loading' && tab.url) {
        if (redirectUrls.some(item => tab.url.includes(item))) {
            chrome.tabs.update(tabId, { url: 'chrome://newtab/' });
        }
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'UPDATE_URLS') {
        redirectUrls = request.urls;
        sendResponse({ status: 'success' });
    }

    if (request.type === 'UPDATE_DATA') {
        isRunning = request.data.isRunning;
        time = request.data.time;
        sendResponse({ status: 'success' });
    }
});