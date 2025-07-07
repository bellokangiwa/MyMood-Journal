function saveMood(event) {
  event.preventDefault();

  const mood = document.querySelector('input[name="mood"]:checked');
  const note = document.getElementById('note').value;
  const timestamp = new Date().toLocaleString();

  if (!mood) {
    alert('Please select a mood.');
    return;
  }

  const entry = {
    mood: mood.value,
    note: note,
    timestamp: timestamp
  };

  let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  entries.push(entry);
  localStorage.setItem('moodEntries', JSON.stringify(entries));

  const message = document.getElementById('saveMessage');
  message.style.display = 'block';
  setTimeout(() => {
    message.style.display = 'none';
    window.location.href = 'mood-history.html';
  }, 1500);
}

// Display Mood History
function loadMoodHistory() {
  const container = document.getElementById('historyContainer');
  const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];

  if (entries.length === 0) {
    container.innerHTML = '<p>No mood history yet.</p>';
    return;
  }

  container.innerHTML = '';
  entries.reverse().forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <p><strong>${entry.timestamp}</strong></p>
      <p>Mood: ${entry.mood}</p>
      <p>Note: ${entry.note}</p>
      <button onclick="deleteEntry(${index})">🗑 Delete</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  entries.splice(index, 1);
  localStorage.setItem('moodEntries', JSON.stringify(entries));
  location.reload();
}

// Load when page is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('mood-history.html')) {
    loadMoodHistory();
  }

  // Dark mode
  const toggle = document.getElementById('toggleDark');
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }
});
function loadHomeRecentEntries() {
  const container = document.getElementById('homeRecentEntries');
  if (!container) return;

  const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];

  if (entries.length === 0) {
    container.innerHTML = '<p>No recent moods yet.</p>';
    return;
  }

  // Show only the latest 3 entries
  const recent = entries.slice(-3).reverse();

  container.innerHTML = '';
  recent.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <p><strong>${entry.timestamp}</strong></p>
      <p>Mood: ${entry.mood}</p>
      <p>Note: ${entry.note}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('index.html')) {
    loadHomeRecentEntries();
  }
});