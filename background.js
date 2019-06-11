
var storage = chrome.storage.sync;
var storedSitesArray;
var siteStorageKey="sites";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if(changeInfo.status === 'complete'){		
		storage.get(siteStorageKey,function(result) {
			storedSitesArray = result[siteStorageKey] ? result[siteStorageKey] : [];
			
			for ( var i = 0; i < storedSitesArray.length; i++) {
                if (tab.url == storedSitesArray[i][1]) {
                    var c = 0;
                    var max = 40;
                    var foundUrl = false;
                    
                    var interval = setInterval(function() {
                        c++;
                        chrome.tabs.sendMessage(tab.id, {command: "getNext", tabId:tab.id}, function(response) {
                            if (response.nextUrl) {
                                clearInterval(interval);
                                foundUrl = true;
                                if (tab.url != response.nextUrl) {
                                    updateTab(response.refreshTab, response.nextUrl);
                                }
                            }	 
                        });
                                
                        if (c > max || foundUrl) {
                            clearInterval(interval);
                        }
                    }, 200);
                    break;
			    }
			}
		});
	}
});

function updateTab(id, nextUrl) {
	chrome.tabs.update(id,{ url : nextUrl });
}