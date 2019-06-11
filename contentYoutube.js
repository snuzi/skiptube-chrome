var storage = chrome.storage.sync;
var storedSitesArray;
var siteStorageKey = "sites";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "getNext") {
        var url = '';
        var nextlink = $("#thumbnail").attr('href');

        if (typeof nextlink !== 'undefined' && nextlink != 'undefined') {
            url = "https://www.youtube.com" + nextlink;
        }
        sendResponse({ nextUrl: url, refreshTab: request.tabId });
    }
});
 