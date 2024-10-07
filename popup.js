document.addEventListener('DOMContentLoaded', () => {
  // Get the selected text from Chrome storage when the popup opens
  chrome.storage.local.get('selectedText', ({ selectedText }) => {
    if (selectedText) {
      document.getElementById('selected-text').textContent = selectedText

      // Clear the previous response
      document.getElementById('response').textContent = 'Loading...'

      // https://platform.openai.com/docs/api-reference/chat/create
      // Call ChatGPT API with the selected text to start a new conversation
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          // model: 'gpt-4',
          // prompt: `Give more context and a breakdown for the following text:\n\n${selectedText}`,
          // max_tokens: 1000,
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: `Give more context and a breakdown for the following text:\n\n${selectedText}`,
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const responseText = JSON.stringify(data)
          // const responseText = data.choices[0].text.trim()
          document.getElementById('response').textContent = data.choices[0].message.content
          })
        .catch((error) => {
          document.getElementById('response').textContent = error.message
        })
    } else {
      document.getElementById('response').textContent = 'No text highlighted.'
    }
  })
})
