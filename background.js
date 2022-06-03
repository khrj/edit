chrome.action.onClicked.addListener(tab => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: toggleDesignMode,
	})
})

chrome.runtime.onMessage.addListener(async event => {
	const [{ id: tabId }] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	})

	event.message
		? chrome.action.setIcon({ path: "icons/active.png", tabId })
		: chrome.action.setIcon({ path: "icons/inactive.png", tabId })
})

const toggleDesignMode = () => {
	if (document.designMode === "on") {
		document.designMode = "off"
		chrome.runtime.sendMessage({ message: false })
	} else {
		document.designMode = "on"
		chrome.runtime.sendMessage({ message: true })
	}
}
