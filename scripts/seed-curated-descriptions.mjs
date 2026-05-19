#!/usr/bin/env node
/**
 * One-shot seeder: writes hand-curated descriptions for the most-searched
 * games in the catalog. These entries are marked manual=true so the
 * generate-descriptions.mjs pass on every CI build preserves them.
 *
 * Adding more curated entries: append to CURATED below and re-run.
 * Each pitch is 1-2 sentences, ≤ 200 characters, written to feel like
 * an editor described the game — not a templated description.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'game_descriptions.json');

const CURATED = {
	'flappy-bird': {
		pitch: 'Tap to flap. Threading the gap between two green pipes sounds easy until you try it — Flappy Bird is the original one-touch torture device.',
		difficulty: 'hard',
		durationMin: [1, 10],
	},
	'2048': {
		pitch: 'Slide numbered tiles. Match pairs. Double them. Hit 2048 to win, or chase 4096 if you think you\'re clever. The puzzle game that ate everyone\'s commute in 2014.',
		difficulty: 'med',
		durationMin: [5, 20],
	},
	'minecraft-classic': {
		pitch: 'The original 2009 Minecraft — Creative mode only, all the blocks, no inventory limits. Build whatever you want in a browser tab. No login.',
		difficulty: 'easy',
		durationMin: [10, 60],
	},
	'crossy-road': {
		pitch: 'Why did the chicken cross the road? Because dodging cars, trains, and rivers turns out to be ridiculously addictive. One more try is never one more try.',
		difficulty: 'med',
		durationMin: [3, 15],
	},
	'google-snake': {
		pitch: 'The hidden Google Snake game, served fresh. Eat the apple, don\'t bite your tail, chase the high score. Comfort food in pixel form.',
		difficulty: 'easy',
		durationMin: [3, 10],
	},
	'wordle': {
		pitch: 'Six guesses. One five-letter word. Green means right letter, right spot — yellow means right letter, wrong spot. Daily logic at its purest.',
		difficulty: 'med',
		durationMin: [3, 8],
	},
	'retro-bowl': {
		pitch: 'Run a football franchise on a fake Nintendo. Draft, trade, call plays, win Super Bowls. The pixelated football game that beats most modern sims.',
		difficulty: 'med',
		durationMin: [10, 40],
	},
	'slope': {
		pitch: 'Steer a ball down an infinite neon slope. Don\'t fall off the edge. Don\'t hit the red blocks. The bar for "one more run" is set absurdly low.',
		difficulty: 'hard',
		durationMin: [2, 10],
	},
	'tank-trouble-2': {
		pitch: 'Same screen, two tanks, one maze. Bounce shots off walls and corner your friend before they corner you. Couch multiplayer that still hits.',
		difficulty: 'med',
		durationMin: [5, 20],
	},
	'pizza-tower': {
		pitch: 'A speedrun-friendly platformer with the energy of a Saturday-morning cartoon and the chaos of a fire drill. Climb the tower, run from The Noise.',
		difficulty: 'hard',
		durationMin: [15, 60],
	},
	'pacman': {
		pitch: 'Eat the dots. Avoid the ghosts. Grab a power pellet and turn the tables for a few precious seconds. The arcade classic, untouched.',
		difficulty: 'med',
		durationMin: [5, 20],
	},
	'among-us': {
		pitch: 'Crewmates do tasks. Impostors do… something else. Lie convincingly enough at the emergency meeting and you live another round.',
		difficulty: 'med',
		durationMin: [10, 30],
	},
	'subway-surfers': {
		pitch: 'Outrun the grumpy inspector and his dog across the rooftops of a moving train. Swipe left, swipe right, grab the hoverboard. Pure runner energy.',
		difficulty: 'easy',
		durationMin: [3, 15],
	},
	'cookie-clicker': {
		pitch: 'Click cookie. Cookie multiplies. Buy grandma. Grandma bakes cookies. Math goes brrr. The original idle game and still the smoothest one to fall into.',
		difficulty: 'easy',
		durationMin: [10, 60],
	},
	'rooftop-snipers': {
		pitch: 'Two stick figures on a rooftop. One button to shoot, one to jump. Knock the other guy off the roof. Couch-multiplayer gold.',
		difficulty: 'easy',
		durationMin: [3, 10],
	},
	'worlds-hardest-game': {
		pitch: 'A red square in a maze of blue dots. Don\'t get touched. The name is not marketing — it is a warning. You will die. A lot.',
		difficulty: 'hard',
		durationMin: [10, 60],
	},
	'worlds-hardest-game-2': {
		pitch: 'The sequel doubled the cruelty. Same red square, fresh nightmares, more moving parts. If the first one broke you, this one will finish the job.',
		difficulty: 'hard',
		durationMin: [10, 60],
	},
};

const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
let added = 0, replaced = 0;
for (const [slug, data] of Object.entries(CURATED)) {
	const had = existing[slug];
	existing[slug] = { ...data, manual: true };
	if (had) replaced++; else added++;
}
writeFileSync(OUT, JSON.stringify(existing, null, '\t') + '\n');
console.log(`[seed-curated] ${added} added, ${replaced} replaced (manual=true) → ${OUT}`);
