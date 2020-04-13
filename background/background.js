chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.setBadgeText({ text: "🔍" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
    refresh();
});

chrome.tabs.onCreated.addListener(function() {
    chrome.browserAction.setBadgeText({ text: "🔍" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
    refresh();

});

chrome.runtime.onConnect.addListener(function() {
    chrome.browserAction.setBadgeText({ text: "🔍" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
    refresh();

});

chrome.runtime.onStartup.addListener(function() {
    chrome.browserAction.setBadgeText({ text: "🔍" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
    refresh();

});

function refresh() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var country = {
                "country": data.country,
            };
            var path = '../img/flag/' + country.country + '.png'
            chrome.browserAction.setBadgeText({ text: "" });
            chrome.browserAction.setIcon({ path: path });
        }
    }
    xmlhttp.open("GET", "https://ipapi.co/json", true);
    xmlhttp.send();

}