# Sounds folder

Put audio files here and the screen page picks them up. No code to change.

## Names (the name decides what the file is)
| File | What it is |
| --- | --- |
| `red.wav` | Warmth / Wärme |
| `yellow.wav` | Light / Licht |
| `blue.wav` | Calm / Ruhe |
| `green.wav` | Growth / Wachsen |
| `purple.wav` | Memory / Erinnerung |
| `orange.wav` | Company / Gesellschaft |
| `base.wav` | The starting melody: a loop that plays quietly under everything |

`.wav`, `.mp3`, `.ogg` and `.m4a` work. Use only the names above, in lower case. Any file with another name is ignored.

## How they are used
- A star plays the file of each of its colours. The colour of the star decides which files sound.
- A colour that is repeated plays its file again at a higher pitch (an octave, then a fifth). In `presence` mode, the colour that appears most in the sky is louder and is picked more often by the background notes.
- A colour with no file keeps its browser tone, so you can add files one at a time.
- `base.wav` loops. Export it so the end joins the start without a click.

## Tips for exporting from Ableton
- Export each colour as a short sound, about 1 to 4 seconds, one note or one short phrase.
- Use the same key for all files, so they sound good together. Colours play one after another, and stars sometimes sound at the same time.
- Leave a little silence at the end so nothing is cut. Keep each file under about 2 MB.
- Mono or stereo is fine. Normalise to a similar loudness (about -14 LUFS or a peak of -3 dB).

## Check that it worked
Restart the server (`npm start`) after adding files, reload `/screen` and press Start sound. The bottom right of the screen says `audio files:` followed by the names it found. If it says `none, browser tones`, the names are wrong or the folder is empty.

Without the server (demo mode) the page also reads `manifest.json`: `{"files": {"red": "sounds/red.wav"}}`.
