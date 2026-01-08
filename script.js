const goal = 25;

const currentBoss = {
  title: "The Ashen Archive",
  author: "D. Kuang",
  format: "Hardcover",
  totalPages: 512,
  currentPage: 278,
  sessions: 6,
  streak: 4,
  mood: "Determined",
};

const defeatedBosses = [
  {
    title: "Crimson Labyrinth",
    author: "J. Harrow",
    rating: "⭐️⭐️⭐️⭐️",
    verdict: "Bold worldbuilding, epic finale.",
    favoriteMoment: "The mirror arena showdown.",
    dateFinished: "Feb 18",
    loot: "New writing idea +1",
  },
  {
    title: "Skyline Hydra",
    author: "M. Chen",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    verdict: "Instant classic, couldn't put it down.",
    favoriteMoment: "Chapter 22 rooftop duel.",
    dateFinished: "Mar 02",
    loot: "Motivation surge",
  },
  {
    title: "Echoes of Frost",
    author: "S. Patel",
    rating: "⭐️⭐️⭐️½",
    verdict: "Slow burn, gorgeous prose.",
    favoriteMoment: "Ice temple reveal.",
    dateFinished: "Apr 09",
    loot: "New playlist",
  },
];

const currentContainer = document.getElementById("current-boss");
const defeatedContainer = document.getElementById("defeated-bosses");
const mysteryContainer = document.getElementById("mystery-bosses");

const bossCount = defeatedBosses.length;
const progressFill = document.getElementById("progress-fill");
const bossCountText = document.getElementById("boss-count");
const progressNote = document.getElementById("progress-note");

function buildCurrentBoss() {
  const pagesLeft = currentBoss.totalPages - currentBoss.currentPage;
  const progressPercent = Math.round(
    (currentBoss.currentPage / currentBoss.totalPages) * 100
  );

  const card = document.createElement("article");
  card.className = "boss-card current";
  card.innerHTML = `
    <div class="boss-tag">Current Boss</div>
    <h3>${currentBoss.title}</h3>
    <p>by ${currentBoss.author} · ${currentBoss.format}</p>
    <div class="stat-line">
      <strong>Progress</strong>
      <span>${currentBoss.currentPage} / ${currentBoss.totalPages} pages</span>
    </div>
    <div class="stat-line">
      <strong>Boss HP</strong>
      <span>${pagesLeft} pages left</span>
    </div>
    <div class="stat-line">
      <strong>Streak</strong>
      <span>${currentBoss.streak} days</span>
    </div>
    <div class="stat-line">
      <strong>Momentum</strong>
      <span>${currentBoss.sessions} sessions</span>
    </div>
    <details>
      <summary>Battle tactics</summary>
      <ul>
        <li>Target ${Math.ceil(pagesLeft / 5)} pages per night to finish in 5 days.</li>
        <li>Set a timer for a 30-minute sprint to land a critical hit.</li>
        <li>Reward yourself after each chapter with a mini-break.</li>
      </ul>
    </details>
    <p class="stat-line"><strong>Status</strong><span>${progressPercent}% defeated · Mood: ${currentBoss.mood}</span></p>
  `;

  currentContainer.appendChild(card);
}

function buildDefeatedBosses() {
  defeatedBosses.forEach((boss, index) => {
    const card = document.createElement("article");
    card.className = "boss-card defeated";
    card.innerHTML = `
      <div class="boss-tag">Defeated #${index + 1}</div>
      <h3>${boss.title}</h3>
      <p>by ${boss.author}</p>
      <details>
        <summary>View victory stats</summary>
        <ul>
          <li>Rating: ${boss.rating}</li>
          <li>Verdict: ${boss.verdict}</li>
          <li>Favorite moment: ${boss.favoriteMoment}</li>
          <li>Defeated on: ${boss.dateFinished}</li>
          <li>Loot acquired: ${boss.loot}</li>
        </ul>
      </details>
    `;

    defeatedContainer.appendChild(card);
  });
}

function buildMysteryBosses() {
  const remaining = goal - bossCount - 1;

  Array.from({ length: remaining }).forEach((_, index) => {
    const card = document.createElement("article");
    card.className = "boss-card mystery";
    card.innerHTML = `
      <span class="locked-icon">🔒</span>
      <div class="boss-tag">Unknown Boss</div>
      <h3>???</h3>
      <p>Slot ${bossCount + index + 2} / ${goal}</p>
      <p>Begin a new book to reveal this foe.</p>
    `;

    mysteryContainer.appendChild(card);
  });
}

function updateProgress() {
  bossCountText.textContent = `${bossCount} / ${goal}`;
  const percent = Math.round((bossCount / goal) * 100);
  progressFill.style.width = `${percent}%`;
  progressNote.textContent = `Quest log: ${goal - bossCount} bosses remain.`;
}

buildCurrentBoss();
buildDefeatedBosses();
buildMysteryBosses();
updateProgress();
