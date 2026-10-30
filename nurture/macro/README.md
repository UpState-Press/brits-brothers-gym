# UpState macro nurture (GHL)

Five emails that go to people who use the macro calculator. UpState runs this nurture,
not Olly. Olly still gets his Formspree copy of every lead. When a nurture lead asks for
an evaluation, we hand it to him ourselves and get the credit.

## How it is wired

1. A visitor fills in the gate on `/macro-calculator`.
2. `src/app/components/ToolGate.tsx` posts to Formspree (Olly) and to `/api/macro-lead` (us).
3. `api/macro-lead.js` upserts the contact in the Brits GHL sub-account
   (location `vmfZgRdAoZXbZA38iuln`), writes the `macro_*` custom fields, then adds the tags
   `macro-calculator`, `upstate-nurture`, `email-consent`.
4. The GHL workflow **UpState | Macro Calculator Nurture** fires on the `macro-calculator` tag:
   Email 1 (day 0) > wait 2 days > Email 2 > wait 3 > Email 3 > wait 4 > Email 4 > wait 5 > Email 5.
   From "Brit's Brothers Gym" <info@britsbrothersgym.com>. Not a no-reply. Stop on response is on.
5. Every button carries `utm_source=upstate&utm_campaign=macro-nurture&utm_content=emailN`.
   `src/lib/leadSource.ts` keeps that as a 30 day first touch. When the person books on
   `/consultation`, `api/eval-lead.js` tags them `eval-requested` and `upstate-sourced`.
6. The GHL workflow **UpState | Nurture lead booked evaluation** fires on `upstate-sourced`:
   removes them from the nurture, emails info@britsbrothersgym.com (cc jerry@upstate.press),
   and tags `lead-engaged`.

GHL adds its own unsubscribe line to every email. Do not add one to the HTML.

## Files

| File | What it is |
|---|---|
| `build.py` | Generates all five emails. Edit copy here. |
| `coaches.json` | Coach list for email 4. Must match the active quiz trainers. |
| `manifest.json` | Generated. Subject, preheader and send day per email. |
| `dist/emailN.body.html` | Generated. The exact HTML pasted into the GHL workflow. |
| `dist/emailN.html` | Generated. Full standalone version for testing in a browser. |
| `preview/` | Generated, not committed. Sample values filled in. |
| `ghl-live.json` | sha256 of each body as last pasted into GHL, and when. |

## Changing an email (including trainer changes)

Agents can do steps 1 to 3. Step 4 needs a human or Johnny, because workers have no GHL access.

1. Edit `build.py` (copy) or `coaches.json` (coach list).
2. Run `python3 nurture/macro/build.py`. It prints any leftover merge tags or dashes.
3. Run `npm run check:trainers`. It fails on drift and warns **GHL SYNC NEEDED** for every
   email whose built body no longer matches `ghl-live.json`. Commit the `dist/` changes.
   Agents: say "GHL SYNC NEEDED: email N" in your final summary.
4. Human or Johnny: in GHL open Automation > Workflows > UpState | Macro Calculator Nurture,
   click the email action, keep "Quick compose", click the `</>` source code button in the editor
   toolbar, select all, paste `dist/emailN.body.html`, Save, Save action. If a subject or preheader
   changed, copy it from `manifest.json` into the action. Then update the hash in `ghl-live.json`:
   `sha256sum nurture/macro/dist/email4.body.html`, set `synced` to today, and commit.

Do not use "Select existing template" in the workflow email action. A template picked that way
did not save and the first live send went out blank (Oct 30, 2026). Paste into Quick compose.

The five GHL templates named "UpState Macro N" still exist in the account but the workflow does
not use them. Do not edit them expecting a change in the live emails.

## Testing without bothering Olly

Post straight to the API so Formspree does not fire:

```bash
curl -X POST https://www.britsbrothersgym.com/api/macro-lead \
  -H "Content-Type: application/json" -H "Origin: https://www.britsbrothersgym.com" \
  -d '{"name":"Test Person","email":"jerry+macrotestN@upstate.press","consent":true,
       "payload":{"calories":2110,"protein_g":220,"carbs_g":128,"fat_g":80,
                  "sessions_per_week":3,"session_style_met":5.5,"goal":"cut"}}'
```

Use a new `+tag` each time: the workflow does not re-enter a contact who already has the tag.
Tag test contacts `internal-test` and remove them from the workflow when done.
