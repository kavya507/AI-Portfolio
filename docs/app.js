import projects from './projects.json' assert { type: 'json' };

// 1. Render avatar
const avatar = document.getElementById('avatar');
avatar.innerHTML = `
  <lottie-player src="assets/avatar.json" background="transparent" speed="1"
                 autoplay loop></lottie-player>`;

// 2. Render project cards
const projRoot = document.getElementById('projects');
projRoot.innerHTML = `
  <h2 class="text-3xl font-bold mb-8 text-center">Projects</h2>
  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
    ${projects.map(p => `
      <article class="bg-white/10 p-6 rounded-2xl flex flex-col">
        <h3 class="text-xl font-semibold mb-2">${p.title}</h3>
        <p class="flex-1 text-sm mb-4">${p.summary}</p>
        <div class="mb-4">
          ${p.stack.map(t => `<span class="text-xs bg-blue-500/20 px-2 py-1 rounded mr-1">${t}</span>`).join('')}
        </div>
        <div class="flex gap-3">
          ${p.repo ? `<a href="${p.repo}" target="_blank" class="text-blue-400 underline">Code</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" class="text-blue-400 underline">Demo</a>` : ''}
          <button class="ml-auto ask-btn text-sm underline" data-id="${p.id}">
            Ask me about this
          </button>
        </div>
      </article>
    `).join('')}
  </div>`;

// 3. Chat UX
const chatLog  = document.getElementById('chat-log');
const form     = document.getElementById('chat-form');
const input    = document.getElementById('chat-input');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;
  appendMsg('user', msg);
  input.value = '';

  // 🔥 call your backend (serverless function)
  const res = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    body: JSON.stringify({ message: msg })
  });
  const reader = res.body.getReader();
  let chunk;
  while (!(chunk = await reader.read()).done) {
    appendMsg('bot', new TextDecoder().decode(chunk.value), true);
  }
});

function appendMsg(role, text, streaming=false) {
  if (streaming && chatLog.lastChild?.dataset.stream === 'true') {
    chatLog.lastChild.textContent += text;
    chatLog.scrollTop = chatLog.scrollHeight;
    return;
  }
  const div = document.createElement('div');
  div.dataset.stream = streaming;
  div.className = role === 'user' ? 'text-right mb-2' : 'text-left mb-2';
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// 4. “Ask me about this” buttons — feed project metadata
document.querySelectorAll('.ask-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const p = projects.find(x => x.id === btn.dataset.id);
    input.value = `Tell me more about ${p.title}`;
    form.dispatchEvent(new Event('submit'));
  });
});
