const FLASHCARD_SETS = {
  alphabet: {
    title: "Alphabet Flashcards",
    eyebrow: "Aleph to Tav",
    gridTitle: "All Letters",
    gridDescription: "Choose any letter to study it.",
    itemLabel: "Letter",
    cards: HEBREW_ALPHABET_CARDS
  },
  pronunciation: {
    title: "Pronunciation Symbols",
    eyebrow: "Sound Marks",
    gridTitle: "Sound Marks",
    gridDescription: "Pick a vowel mark or pronunciation symbol to practice it.",
    itemLabel: "Sound mark",
    cards: HEBREW_PRONUNCIATION_SYMBOL_CARDS
  }
};

const state = {
  mode: "alphabet",
  currentIndex: 0,
  isFlipped: false,
  history: [],
  shuffleMode: true
};

const flashcard = document.querySelector("#flashcard");
const letterImage = document.querySelector("#letterImage");
const imageFallback = document.querySelector("#imageFallback");
const frontStudyText = document.querySelector("#frontStudyText");
const frontSymbol = document.querySelector("#frontSymbol");
const frontName = document.querySelector("#frontName");
const frontSound = document.querySelector("#frontSound");
const tapHint = document.querySelector("#tapHint");
const letterOrder = document.querySelector("#letterOrder");
const hebrewLetter = document.querySelector("#hebrewLetter");
const letterName = document.querySelector("#letterName");
const transliteration = document.querySelector("#transliteration");
const soundLine = document.querySelector("#soundLine");
const exampleLine = document.querySelector("#exampleLine");
const gematria = document.querySelector("#gematria");
const meaning = document.querySelector("#meaning");
const memoryPicture = document.querySelector("#memoryPicture");
const category = document.querySelector("#category");
const progressText = document.querySelector("#progressText");
const prevBtn = document.querySelector("#prevBtn");
const randomBtn = document.querySelector("#randomBtn");
const shuffleMode = document.querySelector("#shuffleMode");
const letterGrid = document.querySelector("#letterGrid");
const alphabetMode = document.querySelector("#alphabetMode");
const pronunciationMode = document.querySelector("#pronunciationMode");
const modeEyebrow = document.querySelector("#modeEyebrow");
const gridTitle = document.querySelector("#gridTitle");
const gridDescription = document.querySelector("#gridDescription");

function currentSet() {
  return FLASHCARD_SETS[state.mode];
}

function currentCards() {
  return currentSet().cards;
}

function setHidden(element, shouldHide) {
  element.hidden = shouldHide;
}

function displaySymbol(card) {
  if (card.example === card.symbol) return card.symbol;
  return `\u25cc${card.symbol}`;
}

function renderAlphabetCard(card, cards) {
  flashcard.classList.remove("sound-card");
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
  setHidden(frontStudyText, true);
  tapHint.textContent = "Tap to flip";

  letterOrder.textContent = `Letter ${card.id} of ${cards.length}`;
  hebrewLetter.textContent = card.hebrew;
  letterName.textContent = card.letterName;
  transliteration.textContent = card.transliteration;
  gematria.textContent = `Gematria Value: ${card.gematria}`;
  meaning.textContent = card.meaning || "Meaning note coming soon.";

  setHidden(soundLine, true);
  setHidden(exampleLine, true);
  setHidden(gematria, false);
  setHidden(memoryPicture, true);
  setHidden(category, true);
}

function renderPronunciationCard(card, cards) {
  flashcard.classList.add("sound-card");
  letterImage.hidden = true;
  imageFallback.textContent = card.symbol;
  setHidden(frontStudyText, false);
  tapHint.textContent = "Show answer";

  frontSymbol.textContent = displaySymbol(card);
  frontName.textContent = card.name;
  frontSound.textContent = card.simpleSound;

  letterOrder.textContent = `Sound mark ${card.id} of ${cards.length}`;
  hebrewLetter.textContent = displaySymbol(card);
  letterName.textContent = card.name;
  transliteration.textContent = `Name sound: ${card.transliteration}`;
  soundLine.textContent = `Sound: ${card.simpleSound}`;
  exampleLine.innerHTML = `Try it with aleph: <span dir="rtl">${card.example}</span>`;
  meaning.textContent = card.explanation;
  memoryPicture.textContent = card.memoryPicture;
  category.textContent = card.category;

  setHidden(soundLine, false);
  setHidden(exampleLine, false);
  setHidden(gematria, true);
  setHidden(memoryPicture, false);
  setHidden(category, false);
}

function renderCard() {
  const set = currentSet();
  const cards = currentCards();
  const card = cards[state.currentIndex];

  flashcard.classList.toggle("is-flipped", state.isFlipped);
  flashcard.setAttribute("aria-pressed", String(state.isFlipped));

  if (state.mode === "alphabet") {
    renderAlphabetCard(card, cards);
  } else {
    renderPronunciationCard(card, cards);
  }

  modeEyebrow.textContent = set.eyebrow;
  gridTitle.textContent = set.gridTitle;
  gridDescription.textContent = set.gridDescription;
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
  return (state.currentIndex + 1) % currentCards().length;
}

function nextRandomIndex() {
  const cards = currentCards();
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
  const cards = currentCards();
  letterGrid.innerHTML = "";
  cards.forEach((card, index) => {
    const button = document.createElement("button");
    const symbol = state.mode === "alphabet" ? card.hebrew : displaySymbol(card);
    const name = state.mode === "alphabet" ? card.letterName : card.name;
    const orderText = state.mode === "alphabet" ? card.id : card.category;
    button.type = "button";
    button.className = "grid-card";
    button.innerHTML = `
      <span class="grid-hebrew" dir="rtl">${symbol}</span>
      <span class="grid-name">${name}</span>
      <span class="grid-order">${orderText}</span>
    `;
    button.addEventListener("click", () => setCard(index));
    letterGrid.appendChild(button);
  });
  updateGridSelection();
}

function updateGridSelection() {
  [...letterGrid.children].forEach((button, index) => {
    button.classList.toggle("is-selected", index === state.currentIndex);
  });
}

function setMode(mode) {
  if (mode === state.mode) return;
  state.mode = mode;
  state.currentIndex = 0;
  state.isFlipped = false;
  state.history = [];

  alphabetMode.classList.toggle("is-active", mode === "alphabet");
  pronunciationMode.classList.toggle("is-active", mode === "pronunciation");
  alphabetMode.setAttribute("aria-selected", String(mode === "alphabet"));
  pronunciationMode.setAttribute("aria-selected", String(mode === "pronunciation"));

  buildGrid();
  renderCard();
}

flashcard.addEventListener("click", () => {
  state.isFlipped = !state.isFlipped;
  renderCard();
});

randomBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrevious);
alphabetMode.addEventListener("click", () => setMode("alphabet"));
pronunciationMode.addEventListener("click", () => setMode("pronunciation"));

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
