import { openFormatterTab } from './utils/openFormatterTab';

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'showPopup') {
        openFormatterTab();
    }
});
