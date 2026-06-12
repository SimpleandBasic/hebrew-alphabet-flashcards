const decks = {
  alphabet: {
    title: "Hebrew Alphabet Flashcards",
    eyebrow: "Aleph to Tav",
    gridTitle: "All Letters",
    gridDescription: "Choose any card to study it.",
    orderLabel: "Letter",
    cards: HEBREW_ALPHABET_CARDS
  },
  pronunciation: {
    title: "Hebrew Pronunciation Symbols",
    eyebrow: "Sound marks and vowel helpers",
    gridTitle: "All Pronunciation Symbols",
    gridDescription: "Choose a sound mark to practice it.",
    orderLabel: "Symbol",
    cards: HEBREW_PRONUNCIATION_CARDS
  }
};

const state = {
  activeDeckKey: "alphabet",
  currentIndex: 0,
  isFlipped: false,
  history: [],
  shuffleMode: true
};

const flashcard = document.querySelector("#flashcard");
const letterImage = document.querySelector("#letterImage");
const imageFallback = document.querySelector("#imageFallback");
const frontLabel = document.querySelector("#frontLabel");
const frontSound = document.querySelector("#frontSound");
const letterOrder = document.querySelector("#letterOrder");
const hebrewLetter = document.querySelector("#hebrewLetter");
const letterName = document.querySelector("#letterName");
const transliteration = document.querySelector("#transliteration");
const gematria = document.querySelector("#gematria");
const meaning = document.querySelector("#meaning");
const example = document.querySelector("#example");
const memory = document.querySelector("#memory");
const progressText = document.querySelector("#progressText");
const prevBtn = document.querySelector("#prevBtn");
const randomBtn = document.querySelector("#randomBtn");
const shuffleMode = document.querySelector("#shuffleMode");
const letterGrid = document.querySelector("#letterGrid");
const alphabetDeckBtn = document.querySelector("#alphabetDeckBtn");
const pronunciationDeckBtn = document.querySelector("#pronunciationDeckBtn");
const appTitle = document.querySelector("#appTitle");
const eyebrowText = document.querySelector("#eyebrowText");
const gridTitle = document.querySelector("#gridTitle");
const gridDescription = document.querySelector("#gridDescription");

function getActiveDeck() {
  return decks[state.activeDeckKey];
}

function getActiveCards() {
  return getActiveDeck().cards;
}

function setOptionalText(element, text, hidden = false) {
  element.textContent = text || "";
  element.hidden = hidden || !text;
}

function renderCard() {
  const deck = getActiveDeck();
  const cards = getActiveCards();
  const card = cards[state.currentIndex];
  const isAlphabetDeck = state.activeDeckKey === "alphabet";

  flashcard.classList.toggle("is-flipped", state.isFlipped);
  flashcard.setAttribute("aria-pressed", String(state.isFlipped));
  flashcard.classList.toggle("symbol-card", !isAlphabetDeck);

  appTitle.textContent = deck.title;
  eyebrowText.textContent = deck.eyebrow;
  gridTitle.textContent = deck.gridTitle;
  gridDescription.textContent = deck.gridDescription;

  alphabetDeckBtn.classList.toggle("active", isAlphabetDeck);
  alphabetDeckBtn.setAttribute("aria-pressed", String(isAlphabetDeck));
  pronunciationDeckBtn.classList.toggle("active", !isAlphabetDeck);
  pronunciationDeckBtn.setAttribute("aria-pressed", String(!isAlphabetDeck));

  letterImage.hidden = !isAlphabetDeck;
  if (isAlphabetDeck) {
    letterImage.alt = `${card.letterName} Hebrew letter image`;
    letterImage.onerror = () => {
      if (letterImage.src !== card.image) {
        letterImage.src = card.image;
        return;
      }
      letterImage.hidden = true;
    };
    letterImage.src = card.localImage || card.image;
  } else {
    letterImage.removeAttribute("src");
    letterImage.alt = "";
    letterImage.onerror = null;
  }

  imageFallback.textContent = card.hebrew;
  frontLabel.textContent = card.letterName;
  setOptionalText(frontSound, card.sound);

  letterOrder.textContent = `${deck.orderLabel} ${card.id} of ${cards.length}`;
  hebrewLetter.textContent = card.hebrew;
  letterName.textContent = card.letterName;
  transliteration.textContent = card.transliteration;
  setOptionalText(gematria, card.gematria ? `Gematria Value: ${card.gematria}` : card.category);
  meaning.textContent = card.meaning || "Meaning note coming soon.";
  setOptionalText(example, card.example);
  setOptionalText(memory, card.memory ? `Memory picture: ${card.memory}` : "");
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

function switchDeck(deckKey) {
  if (deckKey === state.activeDeckKey) return;
  state.activeDeckKey = deckKey;
  state.currentIndex = 0;
  state.isFlipped = false;
  state.history = [];
  buildGrid();
  renderCard();
}

function nextSequentialIndex() {
  return (state.currentIndex + 1) % getActiveCards().length;
}

function nextRandomIndex() {
  const cards = getActiveCards();
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
  getActiveCards().forEach((card, index) => {
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
alphabetDeckBtn.addEventListener("click", () => switchDeck("alphabet"));
pronunciationDeckBtn.addEventListener("click", () => switchDeck("pronunciation"));

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
