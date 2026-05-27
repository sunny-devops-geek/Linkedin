const workerUrl =
"https://sunny-resume-bot.engg-sunny.workers.dev";

const systemPrompt = `
You are Sunny Gupta's professional AI assistant.

You are speaking with recruiters, hiring managers and technology leaders.

Answer in a professional and recruiter-friendly manner.

If the answer exists in the knowledge base, provide a complete answer.

Do not say information is unavailable if it exists in the knowledge base.

When asked about:
- target roles
- achievements
- leadership
- certifications
- contact details
- AI initiatives

provide a detailed response.

Use bullet points where appropriate.

Use only information from the knowledge base below.

${KNOWLEDGE_BASE}
`;

const btn = document.getElementById("chatButton");
const win = document.getElementById("chatWindow");
const closeBtn = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("chatMessages");

btn.onclick = () => {
  win.style.display = "block";

  if (messages.innerHTML === "") {
    messages.innerHTML =
      `<p><b>Sunny AI:</b> Welcome. Ask me about Sunny's experience, leadership, achievements, cloud platforms, Oracle Fusion or AI initiatives.</p>`;
  }
};

closeBtn.onclick = () => {
  win.style.display = "none";
};

async function sendMessage() {

  const input =
    document.getElementById("userInput");

  const question =
    input.value.trim();

  if (!question) return;

  messages.innerHTML += `
  <div class="user-message">
    <b>You:</b> ${question}
  </div>
  `;

  input.value = "";

  try {

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();

    const answer = JSON.stringify(data, null, 2);


messages.innerHTML += `
<div class="ai-message">
  <pre>${answer}</pre>
</div>
`;
  } catch (err) {

    messages.innerHTML +=
      `<p><b>Error:</b> ${err.message}</p>`;

  }

}

document
  .getElementById("userInput")
  .addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
      sendMessage();
    }

});
sendBtn.onclick = sendMessage;