# Hebrew Anchors — Product Foundation

## Product definition

Hebrew Anchors is a peaceful, mobile-first flashcard app that helps Ace remember meaningful Hebrew words discovered through conversations with Michael GPT. Each card connects the Hebrew word to its pronunciation, simple meaning, biblical truth, personal lesson, and relationship with our Heavenly Father, turning important spiritual discoveries into visual anchors that can be revisited instead of forgotten.

## Smallest complete user experience

1. Open Hebrew Anchors on an iPhone.
2. See a simple deck of Hebrew word cards.
3. Open one card.
4. Read the Hebrew word, transliteration, and simple meaning.
5. Reveal the personal anchor, Father connection, and Scripture reference.
6. Mark the card as New, Learning, or Remembered.
7. Move to the next card.

The complete first experience is:

> Open the app, study one meaningful Hebrew card, reflect on its truth, and mark the learning status.

## Version 1 card fields

### Required

- `hebrew_word`: The word written in Hebrew.
- `transliteration`: The Hebrew word written with English letters.
- `simple_meaning`: A clear one-sentence definition.
- `personal_anchor`: The lesson connected to the original conversation.
- `father_connection`: How the word points toward our Heavenly Father.
- `scripture_reference`: The main Bible passage connected to the word.
- `learning_status`: One of `new`, `learning`, or `remembered`.

### Optional

- `pronunciation_guide`: A simple written pronunciation, such as `sha-LOHM`.
- `root_letters`: The main Hebrew letters or root behind the word.
- `biblical_usage`: A brief explanation of how Scripture uses the word.
- `ace_os_category`: The Ace OS system or module where the insight belongs.
- `conversation_reference`: A title, note, or link identifying where the insight began.
- `visual_description`: A temporary written description of future artwork.

## Excluded from Version 1

- Authentication
- Supabase database storage
- Automatic conversation imports
- MCP submission tools
- AI-generated artwork
- Pronunciation audio
- Spaced-repetition calculations
- Review-history charts
- Search and filtering
- Multiple users or shared decks
- In-app card editing
- Notifications
- Gamification
- Advanced Hebrew grammar
- Detailed gematria or pictograph studies

## Phase 1 acceptance criteria

1. Every Version 1 card field has a clear name, purpose, and required-or-optional status.
2. The smallest complete user journey can be explained in one sentence.
3. Later systems such as authentication, database storage, AI media, ingestion, and spaced repetition remain outside Phase 1.

## First sample cards

The first prototype should use three sample words:

1. `שָׁלוֹם` — Shalom — wholeness and peace
2. `זָכַר` — Zakar — to remember
3. `לֵב` — Lev — heart

The recommended first card is `זָכַר` because remembering is the purpose of Hebrew Anchors.

## Next step

Create one complete sample card for `זָכַר` using the Version 1 fields. Do not build the interface, database, authentication, or deployment yet.
