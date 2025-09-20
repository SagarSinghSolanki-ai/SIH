// chat-client.js
document.addEventListener('DOMContentLoaded', () => {
  const chatPrompt = document.querySelector('.chat-prompt');
  const chatModal = document.getElementById('chat-modal');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const selectedLangSpan = document.getElementById('selected-lang'); // for language integration

  // Get language code
  function getLangCode() {
    const text = selectedLangSpan?.textContent?.trim().toLowerCase() || 'english';
    if (text.startsWith('hi') || text.includes('हिन्दी')) return 'hi';
    if (text.startsWith('m') || text.includes('മലയാളം')) return 'ml';
    return 'en';
  }

  // Append message
  function appendMessage(text, who = 'bot') {
    const div = document.createElement('div');
    div.className = chat-message `${who}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Open/close chat
  chatPrompt?.addEventListener('click', () => chatModal.classList.remove('hidden'));
  chatClose?.addEventListener('click', () => chatModal.classList.add('hidden'));

  // Handle form submit
  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    chatInput.value = '';

    // Temporary bot placeholder
    appendMessage('...', 'bot');

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang: getLangCode() })
      });
      const data = await resp.json();

      // Remove placeholder and show reply
      const placeholders = chatMessages.querySelectorAll('.chat-message.bot');
      if (placeholders.length) placeholders[placeholders.length - 1].remove();

      appendMessage(data.reply || 'No reply from server.', 'bot');
    } catch (err) {
      console.error('Chat error:', err);
      const placeholders = chatMessages.querySelectorAll('.chat-message.bot');
      if (placeholders.length) placeholders[placeholders.length - 1].remove();
      appendMessage('Error connecting to server.', 'bot');
    }
  });
  
});
