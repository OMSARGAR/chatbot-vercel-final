document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const chat = document.querySelector('#chat');

  function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data); // Debug log

        if (data.bot) {
          addMessage(data.bot.trim(), 'bot');
        } else if (data.error) {
          addMessage(`❌ Error: ${data.error}`, 'bot');
        } else {
          addMessage('⚠️ Unknown error from API', 'bot');
        }
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        addMessage(`❌ Network error: ${error.message}`, 'bot');
      });
  });
});
