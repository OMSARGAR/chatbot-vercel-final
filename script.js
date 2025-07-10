document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const message = input.value;
    appendMessage("user", message);
    input.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      appendMessage("bot", data.reply || "Error");
    } catch (err) {
      appendMessage("bot", "Error");
    }
  });

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
  }
});
