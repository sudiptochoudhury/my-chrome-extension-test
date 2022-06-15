import testAsyncFunction from './browser-work'

function run() {

    const url = 'https://www.google.com/'

    chrome.tabs.create({url: url, active: true}, async (tab) => {
        console.debug('START EXTENSION')

        const numberOfConfetti = Math.round(Math.random() * 200) + 100

        chrome.scripting.executeScript({
            target: {tabId: tab.id as number, allFrames: true},
            func: testAsyncFunction,
            args: [numberOfConfetti]
        }, (results) => {
            console.debug(results)
        })
    });
}

run();
