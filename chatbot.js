const workerUrl =
"https://sunny-resume-bot.engg-sunny.workers.dev";

const systemPrompt = `
You are Sunny Gupta's professional AI assistant.

Answer questions using ONLY the information below.

If information is unavailable, respond:

"I don't have enough information about that topic."

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

  messages.innerHTML +=
    `<p><b>You:</b> ${question}</p>`;

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

    const answer =
      data?.choices?.[0]?.message?.content ||
      "No response received.";

    messages.innerHTML +=
      `<p><b>Sunny AI:</b> ${answer}</p>`;

  } catch (err) {

    messages.innerHTML +=
      `<p><b>Error:</b> ${err.message}</p>`;

  }

}

sendBtn.onclick = sendMessage;