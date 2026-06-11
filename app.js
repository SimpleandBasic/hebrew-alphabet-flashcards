const cards = HEBREW_ALPHABET_CARDS;

const state = {
  currentIndex: 0,
  isFlipped: false,
  history: [],
  shuffleMode: true
};

const flashcard = document.querySelector("#flashcard");
const letterImage = document.querySelector("#letterImage");
const imageFallback = document.querySelector("#imageFallback");
const letterOrder = document.querySelector("#letterOrder");
const hebrewLetter = document.querySelector("#hebrewLetter");
const letterName = document.querySelector("#letterName");
const transliteration = document.querySelector("#transliteration");
const meaning = document.querySelector("#meaning");
const progressText = document.querySelector("#progressText");
const prevBtn = document.querySelector("#prevBtn");
const randomBtn = document.querySelector("#randomBtn");
const shuffleMode = document.querySelector("#shuffleMode");
const letterGrid = document.querySelector("#letterGrid");

function renderCard() {
  const card = cards[state.currentIndex];

  flashcard.classList.toggle("is-flipped", state.isFlipped);
  flashcard.setAttribute("aria-pressed", String(state.isFlipped));

  letterImage.hidden = false;
  letterImage.alt = `${card.letterName} Hebrew letter image`;
  letterImage.onerror = () => {
    if (letterImage.src !== card.image) {
      letterImage.src = card.image;
      return;
    }
    letterImage.hidden = true;
  };
  letterImage.src = card.localImage || card.image;

  imageFallback.textContent = card.hebrew;
  letterOrder.textContent = `Letter ${card.id} of ${cards.length}`;
  hebrewLetter.textContent = card.hebrew;
  letterName.textContent = card.letterName;
  transliteration.textContent = card.transliteration;
  meaning.textContent = card.meaning || "Meaning note coming soon.";
  progressText.textContent = `Card ${state.currentIndex + 1} of ${cards.length}`;
  prevBtn.disabled = state.history.length === 0;

  updateGridSelection();
}

function setCard(index, remember = true) {
  if (index === state.currentIndex) return;
  if (remember) state.history.push(state.currentIndex);
  state.currentIndex = index;
  state.isFlipped = false;
  renderCard();
}

function nextSequentialIndex() {
  return (state.currentIndex + 1) % cards.length;
}

function nextRandomIndex() {
  if (cards.length < 2) return state.currentIndex;
  let next = state.currentIndex;
  while (next === state.currentIndex) {
    next = Math.floor(Math.random() * cards.length);
  }
  return next;
}

function goNext() {
  setCard(state.shuffleMode ? nextRandomIndex() : nextSequentialIndex());
}

function goPrevious() {
  const previous = state.history.pop();
  if (previous === undefined) return;
  state.currentIndex = previous;
  state.isFlipped = false;
  renderCard();
}

function buildGrid() {
  letterGrid.innerHTML = "";
  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "grid-card";
    button.innerHTML = `
      <span class="grid-hebrew" dir="rtl">${card.hebrew}</span>
      <span class="grid-name">${card.letterName}</span>
      <span class="grid-order">${card.id}</span>
    `;
    button.addEventListener("click", () => setCard(index));
    letterGrid.appendChild(button);
  });
}

function updateGridSelection() {
  [...letterGrid.children].forEach((button, index) => {
    button.classList.toggle("is-selected", index === state.currentIndex);
  });
}

flashcard.addEventListener("click", () => {
  state.isFlipped = !state.isFlipped;
  renderCard();
});

randomBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrevious);

shuffleMode.addEventListener("change", () => {
  state.shuffleMode = shuffleMode.checked;
  randomBtn.textContent = state.shuffleMode ? "Next Random Card" : "Next Card";
});

document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    if (document.activeElement === flashcard) return;
    state.isFlipped = !state.isFlipped;
    renderCard();
  }
  if (event.key === "ArrowRight") goNext();
  if (event.key === "ArrowLeft") goPrevious();
});

buildGrid();
renderCard();
