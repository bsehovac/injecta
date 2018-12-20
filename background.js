const script = chrome.extension.getURL('inject/script.js')
const style = chrome.extension.getURL('inject/style.css')

chrome.browserAction.onClicked.addListener(tab => {

    chrome.tabs.executeScript(tab.id, {
      code: `
        typeof window.injecta === 'undefined' && (window.injecta = {
          started: false,
          files: { script: '${script}', style: '${style}' },
          dom: {},
          interval: 250,
        })`
    }, () => {
      chrome.tabs.executeScript(tab.id, { file: 'inject.js' });
    });

});