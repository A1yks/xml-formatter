export function openFormatterTab() {
    chrome.tabs.create({ url: chrome.runtime.getURL('../../index.html') + '?formatter=1' });
}
