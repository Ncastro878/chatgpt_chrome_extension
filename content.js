function getSelectedTextFromPDF() {
  // Access selected text in a PDF file
  const selection = document.getSelection();
  return selection ? selection.toString() : '';
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    const selectedText = getSelectedTextFromPDF();
    sendResponse({selectedText: selectedText});
  }
});
