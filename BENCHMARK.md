# Figma Make Kit Benchmark

This document is the spec for a controlled benchmark that answers one question: does Figma Make generate better game UI when the FigmaMakeKit is installed? A human runs 6 test prompts twice, once in a fresh Figma Make project without the kit and once in a project with it installed, then scores all 12 outputs on a shared rubric. The test prompts, A/B procedure, scoring rubric, and expected results are defined below.

## Test Prompts

These are 6 English prompts. Prompts 1-4 use kit components (HUD, Inventory, Skills, Dialogue), and prompts 5-6 are control prompts (Settings, Quests) that the kit does NOT cover, so the benchmark can detect whether the kit only helps when the component exists, or degrades generation on unseen tasks.

### Prompt 1

Create a game HUD in the top-left corner with a red health bar showing 75/100 HP and a blue mana bar showing 60/100 MP

(Kit component: HealthBar.)

### Prompt 2

Create a 4-row by 6-column inventory grid. Each slot has a border. Fill some slots with items (sword, shield, health potion, mana potion) and leave others empty

(Kit component: InventoryGrid.)

### Prompt 3

Create a skill hotbar at the bottom center of the screen with 8 skill slots. Each slot shows a number 1-8 in the corner and an icon in the center

(Kit component: SkillBar.)

### Prompt 4

Create an NPC dialogue box at the bottom of the screen. Left side: character portrait. Right side: NPC name, dialogue text, and a Continue button

(Kit component: DialogueBox.)

### Prompt 5

Create a game settings panel with three sections: Audio (master/sfx/music volume sliders), Graphics (quality dropdown: Low/Medium/High/Ultra), and Controls (4 keybind rows)

### Prompt 6

Create a quest tracker on the right side of the screen showing 3 active quests. Each quest has a title, description, and a progress bar

## A/B Comparison Method

Run A is a fresh Figma Make project with the kit NOT installed. Run B is a Figma Make project with the kit installed via the npm packages option; how to install it is documented in setup.md, so those steps are not repeated here. For each of the 6 prompts, the run is performed in BOTH projects with the exact same prompt text. Record per run: (a) a screenshot of the generated UI, and (b) the generated React source code. That makes 12 runs in total (6 prompts x 2 projects). A human executes all runs inside Figma Make; this document is the spec they follow.

## Scoring Rubric

Each run is scored 1-5 on five dimensions (1 = worst, 5 = best). The run's final score is the average across the five dimensions.

- Game UI Conventions: 1 = looks like a web form; 5 = segmented bars / grid / hotbar like real game UI
- Semantic Structure: 1 = all plain divs; 5 = uses the kit's components (HealthBar/InventoryGrid/SkillBar/DialogueBox)
- Visual Polish: 1 = random colors; 5 = token-consistent with the kit palette
- Code Quality: 1 = 200 lines of repeated divs; 5 = a few lines of component calls
- Consistency: 1 = similar patterns look different; 5 = same pattern always uses the same structure

## Expected Results

Expected average scores across the five rubric dimensions, per prompt and per run:

| Prompt | Run A (no kit) | Run B (with kit) |
| --- | --- | --- |
| 1 | 2-3 | 4-5 |
| 2 | 2-3 | 4-5 |
| 3 | 2-3 | 4-5 |
| 4 | 2-3 | 4-5 |
| 5 | 2-3 | 2-3 |
| 6 | 2-3 | 2-3 |

If Run B scores ≥4 on prompts 1-4 and Run A scores ≤3, the kit's value is validated.
