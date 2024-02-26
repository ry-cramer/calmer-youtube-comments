// Unnecessary, to be removed (background.js seems incompatible with popup)

const compatibleSite = 'https://canhas.report/permissions-policy'

chrome.action.onClicked.addListener(async (tab) => {
    console.log('Extension clicked')
    if (tab.url.startsWith(compatibleSite)) {
        console.log('Found compatible site!');
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
        console.log('State: ' + nextState)
    }
});

chrome.runtime.onInstalled.addListener(() => {
    // Extensions can use the Storage API and IndexedDB to 
    // store the application state. In this case, though, since 
    // we're only handling two states, we will use the action's 
    // badge text itself to track whether the extension is 
    // 'ON' or 'OFF'.
    chrome.action.setBadgeText({
        text: "OFF",
    });
});