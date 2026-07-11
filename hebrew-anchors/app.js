let currentCardIndex = 0;

const elements = {
  progressText: document.getElementById("progressText"),
  anchorCard: document.getElementById("anchorCard"),
  cardArtwork: document.getElementById("cardArtwork"),
  artSymbol: document.getElementById("artSymbol"),
  hebrewWord: document.getElementById("hebrewWord"),
  transliteration: document.getElementById("transliteration"),
  pronunciation: document.getElementById("pronunciation"),
  simpleMeaning: document.getElementById("simpleMeaning"),
  personalAnchor: document.getElementById("personalAnchor"),
  fatherConnection: document.getElementById("fatherConnection"),
  scriptureText: document.getElementById("scriptureText"),
  scriptureReference: document.getElementById("scriptureReference"),
  rootLetters: document.getElementById("rootLetters"),
  aceCategory: document.getElementById("aceCategory"),
  conversationReference: document.getElementById("conversationReference"),
  statusBadge: document.getElementById("statusBadge"),
  revealButton: document.getElementById("revealButton"),
  anchorDetails: document.getElementById("anchorDetails"),
  previousButton: document.getElementById("previousButton"),
  nextButton: document.getElementById("nextButton"),
  statusButtons: Array.from(document.querySelectorAll("[data-status]"))
};

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function renderCard() {
  const card = hebrewAnchorCards[currentCardIndex];

  elements.progressText.textContent = `Anchor ${currentCardIndex + 1} of ${hebrewAnchorCards.length}`;
  elements.artSymbol.textContent = card.hebrewWord;
  elements.cardArtwork.className = `card-artwork ${card.artClass}`;
  elements.cardArtwork.setAttribute("aria-label", card.visualPrompt);
  elements.hebrewWord.textContent = card.hebrewWord;
  elements.transliteration.textContent = card.transliteration;
  elements.pronunciation.textContent = card.pronunciation;
  elements.simpleMeaning.textContent = card.simpleMeaning;
  elements.personalAnchor.textContent = card.personalAnchor;
  elements.fatherConnection.textContent = card.fatherConnection;
  elements.scriptureText.textContent = `“${card.scriptureText}”`;
  elements.scriptureReference.textContent = card.scriptureReference;
  elements.rootLetters.textContent = card.rootLetters;
  elements.aceCategory.textContent = card.aceCategory;
  elements.conversationReference.textContent = card.conversationReference;
  elements.statusBadge.textContent = formatStatus(card.status);
  elements.statusBadge.dataset.status = card.status;

  elements.anchorDetails.hidden = true;
  elements.revealButton.setAttribute("aria-expanded", "false");
  elements.revealButton.textContent = "Reveal the anchor";

  elements.statusButtons.forEach((button) => {
    const isActive = button.dataset.status === card.status;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  elements.previousButton.disabled = currentCardIndex === 0;
  elements.nextButton.textContent = currentCardIndex === hebrewAnchorCards.length - 1
    ? "Back to first"
    : "Next anchor";
}

function toggleDetails() {
  const willShow = elements.anchorDetails.hidden;
  elements.anchorDetails.hidden = !willShow;
  elements.revealButton.setAttribute("aria-expanded", String(willShow));
  elements.revealButton.textContent = willShow ? "Hide the anchor" : "Reveal the anchor";
}

function updateStatus(status) {
  hebrewAnchorCards[currentCardIndex].status = status;
  renderCard();
}

elements.revealButton.addEventListener("click", toggleDetails);

elements.previousButton.addEventListener("click", () => {
  if (currentCardIndex > 0) {
    currentCardIndex -= 1;
    renderCard();
  }
});

elements.nextButton.addEventListener("click", () => {
  currentCardIndex = (currentCardIndex + 1) % hebrewAnchorCards.length;
  renderCard();
});

elements.statusButtons.forEach((button) => {
  button.addEventListener("click", () => updateStatus(button.dataset.status));
});

renderCard();
