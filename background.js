chrome.commands.onCommand.addListener((command) => {
  if (command === 'trigger-chat') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Check if the tab is a PDF
      if (tabs[0].url.includes('chrome://') || tabs[0].url.includes('pdf')) {
        // PDF context
        console.log('PDF context')
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: getSelectedTextFromPDF,
          },
          (results) => {
            console.log('results', results)
            if (results[0].result) {
              const selectedText = results[0].result
              chrome.storage.local.set({ selectedText }, () => {
                chrome.action.openPopup()
              })
            }
          }
        )
      } else {
        // Regular HTML page
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: getSelectedText,
          },
          (results) => {
            if (results[0].result) {
              const selectedText = results[0].result
              chrome.storage.local.set({ selectedText }, () => {
                chrome.action.openPopup()
              })
            }
          }
        )
      }
    })
  }
})

function getSelectedTextFromPDF() {
  return document.getSelection().toString()
}

function getSelectedText() {
  return window.getSelection().toString()
}
