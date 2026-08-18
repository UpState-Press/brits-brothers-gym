# Design Notes

## Torn-edge divider system (v2, August 18, 2026)

v1 documented two assets and a color rule. It was written after the first divider
incident and did not prevent the second (Aug 18: a stacked double tear at the
Programs to Facility seam, wrong fill color, and the Programs quote rendered under
its own divider). v2 keeps every v1 rule and adds the parts that were missing:
the full asset inventory, an ownership rule, a clearance rule, the page boundary
map, and a verification gate.

### Background shades

Sections use exactly two background shades: primary dark `#121214` and lighter
black `#1c1c1e`. The footer is its own near-black `#0a0a0c`. No third shade of
black is ever allowed.

### Asset inventory (measured, do not trust memory)

All four assets are 2880px wide PNGs. "Solid edge" is the fully opaque edge; the
opposite edge is the tear. Rendered height scales with viewport width:
`rendered_px = natural_height x viewport_width / 2880`.

| Asset | File (src/assets) | Fill | Solid edge | Natural | @1440w | @2600w |
| --- | --- | --- | --- | --- | --- | --- |
| greyDivider | d15eda18ea41e9b4c6d7c8d24a445decb714d367.png | #121212 | top | 2880x113 | 56px | 102px |
| topDivider | 31fcf544b442943636aba42ea48f9a04dfca2658.png | #1c1c1c | top | 2880x113 | 56px | 102px |
| splatterDivider | 185cb69eec51df2a8ca706e784867b4ab9e15b10.png | #1c1c1c | bottom | 2880x203 | 102px | 183px |
| footerDivider | 37021cebd2b33050505f81cf47d1c80f523c66e3.png | #0a0a0a | bottom | 2880x113 | 56px | 102px |

`#121212` reads as `#121214`, `#1c1c1c` reads as `#1c1c1e`, `#0a0a0a` reads as
`#0a0a0c`. If a boundary needs a fill and tear direction that no asset provides,
author a new PNG from an existing tear alpha with the correct fill. Never
approximate with a mismatched fill and never stack two assets to fake one.

### The grammar (how any placement is decided)

A divider is one section's color tearing into its neighbor's territory. Three
checks decide every placement:

1. **Solid edge faces the boundary.** The opaque edge sits flush against the
   seam; the torn edge points into the section that hosts the image.
2. **Fill matches the neighbor across that boundary.** The solid edge must be
   invisible against the section on the other side of the seam.
3. **rotate-180 swaps which edge is solid.** That is the whole flip convention:
   an asset authored solid-bottom becomes solid-top when rotated, and vice versa.

Worked example (the standard #121214 above / #1c1c1e below seam): either place
splatterDivider at the BOTTOM of the upper section (solid #1c1c1c edge flush to
the seam, tear pointing up into the dark section), or greyDivider at the TOP of
the lower section (solid #121212 edge flush to the seam, tear pointing down into
the light section). Both are legal. Pick ONE - which brings us to:

### The ownership rule (hard - this is what failed on Aug 18)

**Exactly one divider per boundary.** Before adding any section or divider, open
BOTH adjacent components and check the upper one's bottom and the lower one's top
for an existing divider. If one exists, the boundary is owned - add nothing.
Two tears on one seam is always a bug, never a style.

Corollary: a divider belongs at a seam where the shade CHANGES. Same-shade seams
need no divider (there is no color edge to mask); a same-shade tear is optional
texture and should be rare.

### The clearance rule (hard - this is why the quote was eaten)

Divider images are absolutely positioned and will paint over anything in their
strip. The section HOSTING a divider must reserve edge padding of at least the
divider's rendered height at 2600px viewport width:

- splatterDivider edge: **pb-48 / pt-48** (192px covers 183px)
- greyDivider / topDivider / footerDivider edge: **pt-28 / pb-28** (112px covers 102px)

Text, headings, and interactive elements never live inside the reserve.

### HomePage boundary map (current)

| Seam | Shades | Divider | Owner |
| --- | --- | --- | --- |
| Hero -> Philosophy | #121214 -> #1c1c1e | splatterDivider, Hero bottom | Hero |
| Philosophy -> Trainers | #1c1c1e -> #121214 | splatterDivider rotate-180, Trainers top | Trainers |
| Trainers -> Programs | #121214 -> #121214 | greyDivider, Programs top (same-shade texture) | Programs |
| Programs -> Facility | #121214 -> #1c1c1e | splatterDivider, Programs bottom (pb-48 reserve) | Programs |
| Facility -> Hours | #1c1c1e -> #1c1c1e | none | - |
| Hours -> Pricing | #1c1c1e -> #121214 | splatterDivider rotate-180, Pricing top | Pricing |
| Pricing -> Location -> FinalCTA | mixed | see Location.tsx (grey + splatter + topDivider in use) | per component |
| FinalCTA -> Footer | #121214 -> #0a0a0c | footerDivider, Footer top | Footer |

Any new section on any page adds its rows to this table in the same commit.
The success stories / testimonials page remains a correct reference
implementation of the splatterDivider transitions.

### The verification gate

A grep proves text exists; it does not prove the page looks right. Any commit
that adds, removes, or reorders sections, or touches a divider or edge padding,
gets live screenshots of every changed seam after deploy - desktop wide
(2600px), laptop (1440px), and mobile (390px) - reviewed by eyes before the
change is called done. The droplet runs headless Chromium for this (see the
ashlar repo's puppeteer setup for the working pattern).

### Incident log

- Pre-July 2026: original divider mess; v1 of this doc written (commit fe778d97).
- Aug 18, 2026: Facility section inserted with its own top divider while
  Programs already owned the seam with a bottom splatterDivider - stacked
  double tear, mismatched #121212 band, and the Programs quote (80px clearance
  vs 183px divider) rendered under the tear. Fixed by removing both Facility
  dividers and raising Programs to pb-48. v2 of this doc is the countermeasure.
