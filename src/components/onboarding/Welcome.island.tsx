/** @jsxImportSource preact */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { AVATARS } from './avatars';
import { readPrefs, writePrefs } from '../../lib/storage';
import { ONBOARD } from '../../lib/voice';

type StarterGame = {
	slug: string;
	name: string;
	image: string | null;
	type: 'webgl' | 'flash' | 'retro';
};

interface Props {
	starters: StarterGame[];
}

const ACCENTS = [
	{ id: 'violet', label: 'Violet', value: '#7c3aed' },
	{ id: 'sun',    label: 'Sun',    value: '#f5b54a' },
	{ id: 'rose',   label: 'Rose',   value: '#ec4899' },
	{ id: 'mint',   label: 'Mint',   value: '#14b8a6' },
	{ id: 'sky',    label: 'Sky',    value: '#38bdf8' },
	{ id: 'ember',  label: 'Ember',  value: '#ef4444' },
];

export default function Welcome({ starters }: Props) {
	// Don't render if already onboarded.
	const initialOnboarded = useMemo(() => {
		try { return readPrefs().onboarded; } catch { return false; }
	}, []);
	const [open, setOpen] = useState<boolean>(!initialOnboarded);
	const [step, setStep] = useState(0);
	const [avatar, setAvatar] = useState<string>('wave');
	const [accent, setAccent] = useState<string | null>(null);

	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	function applyAccent(hex: string) {
		document.documentElement.style.setProperty('--accent', hex);
	}

	function finish(target?: string) {
		writePrefs({
			onboarded: true,
			avatar,
			accent: accent,
			accentPreset: ACCENTS.find(a => a.value === accent)?.id ?? null,
		});
		setOpen(false);
		if (target) {
			window.location.href = `/play/${target}`;
		}
	}

	if (!open) return null;

	return (
		<div class="jeo-onboard">
			<div class="jeo-onboard__panel fx-pop">
				<div class="jeo-onboard__dots" aria-hidden="true">
					{[0, 1, 2].map(i => (
						<span class={`dot ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`} />
					))}
				</div>

				{step === 0 && (
					<div class="jeo-onboard__step">
						<h2>{ONBOARD.title1}</h2>
						<p>{ONBOARD.body1}</p>
						<div class="jeo-onboard__avatars">
							{AVATARS.map(a => (
								<button
									type="button"
									class={`jeo-onboard__avatar ${avatar === a.id ? 'is-active' : ''}`}
									onClick={() => setAvatar(a.id)}
									aria-pressed={avatar === a.id}
									aria-label={a.label}
								>
									<span class={`jeo-mascot is-${a.pose} is-bobbing`} style="--jeo-size: 56px;">
										<img src="/brand/jeo-mascot.svg" alt="" width="56" height="56" />
									</span>
									<span class="jeo-onboard__avatar-label">{a.label}</span>
								</button>
							))}
						</div>
						<div class="jeo-onboard__actions">
							<button class="btn btn--ghost" type="button" onClick={() => finish()}>{ONBOARD.skip}</button>
							<button class="btn btn--primary fx-ripple" type="button" onClick={() => setStep(1)}>Next</button>
						</div>
					</div>
				)}

				{step === 1 && (
					<div class="jeo-onboard__step">
						<h2>{ONBOARD.title2}</h2>
						<p>{ONBOARD.body2}</p>
						<div class="jeo-onboard__accents">
							{ACCENTS.map(a => (
								<button
									type="button"
									class={`jeo-onboard__accent ${accent === a.value ? 'is-active' : ''}`}
									onClick={() => { setAccent(a.value); applyAccent(a.value); }}
									aria-pressed={accent === a.value}
									aria-label={a.label}
									style={`--swatch:${a.value};`}
								>
									<span class="swatch" />
									<span>{a.label}</span>
								</button>
							))}
						</div>
						<div class="jeo-onboard__actions">
							<button class="btn btn--ghost" type="button" onClick={() => setStep(0)}>Back</button>
							<button class="btn btn--primary fx-ripple" type="button" onClick={() => setStep(2)}>Next</button>
						</div>
					</div>
				)}

				{step === 2 && (
					<div class="jeo-onboard__step">
						<h2>{ONBOARD.title3}</h2>
						<p>{ONBOARD.body3}</p>
						<div class="jeo-onboard__starters">
							{starters.map(s => (
								<button
									type="button"
									class="jeo-onboard__starter fx-ripple"
									onClick={() => finish(s.slug)}
								>
									<span class="cover" style={s.image ? `background-image:url('/${s.image}');` : ''} />
									<span class="meta">
										<span class="name">{s.name}</span>
										<span class="type">{s.type}</span>
									</span>
								</button>
							))}
						</div>
						<div class="jeo-onboard__actions">
							<button class="btn btn--ghost" type="button" onClick={() => setStep(1)}>Back</button>
							<button class="btn btn--secondary" type="button" onClick={() => finish()}>{ONBOARD.finish}</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
