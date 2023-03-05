// Copyright (c) 2015 o9000. All rights reserved.
// Use of this source code is governed by the GNU General Public License version 2.

var enabled = {};

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({ file: "content.js" });
});

function updateIcon(tabId) {
  var text;
  if (tabId in enabled) {
    text = enabled[tabId] ? "1" : "";
  } else {
    text = "";
  }
  chrome.browserAction.setBadgeText({tabId: tabId, text: text});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled) {
    enabled[sender.tab.id] = true;
  } else {
    enabled[sender.tab.id] = false;
  }
  updateIcon(sender.tab.id);
});

chrome.tabs.onActivated.addListener(function(e) {
  updateIcon(e.tabId);
});
