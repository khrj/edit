chrome.action.onClicked.addListener(tab => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: toggleDesignMode,
	})
})

chrome.runtime.onMessage.addListener(event => {
	event.message
		? chrome.action.setIcon({ path: "icons/active.png" })
		: chrome.action.setIcon({ path: "icons/inactive.png" })
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
