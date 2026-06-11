# Hebrew Alphabet Flashcards

A simple mobile-friendly web app for learning the Hebrew alphabet with visual flashcards.

Live site: https://simpleandbasic.github.io/hebrew-alphabet-flashcards/

## How to use

Open the live site or `index.html` locally in a browser. Tap or click the large card to flip between the image front and the study details on the back.

Use the controls to move through the alphabet:

- Previous Card returns to the card you just studied.
- Next Random Card shows another card.
- Shuffle / Randomize mode switches between random review and alphabet-order review.
- The grid lets you jump directly to a specific Hebrew letter.

## What is included

- One Hebrew alphabet card shown at a time
- Front card image for each Hebrew letter
- Back card details with letter name, Hebrew character, transliteration, order, and meaning note
- Chet for `ח`
- Previous and next controls
- Shuffle / Randomize mode
- Progress indicator
- Mobile-first layout

## Edit cards

Card data lives in `alphabet-data.js`.

Each card follows this shape:

```js
{
  id: 8,
  letterName: "Chet",
  hebrew: "ח",
  transliteration: "Chet",
  meaning: "Fence, inner room, life",
  image: "https://drive.google.com/thumbnail?id=...&sz=w1000",
  localImage: "images/het.png"
}
```

Keep the `id` values in alphabet order so the progress indicator and grid stay clear.

## Image setup

The app uses public Google Drive thumbnail URLs from the `Hebrew Alphabet` folder.

For an offline local version, place downloaded PNGs in `images/` using the filenames shown in each card's `localImage` field. The app tries the local image first. If that file is not present, it falls back to the public Google Drive image URL. If an image ever cannot load, the card still shows the large Hebrew character as a fallback.

## Project structure

```text
/
  index.html
  styles.css
  app.js
  alphabet-data.js
  README.md
  images/
```
