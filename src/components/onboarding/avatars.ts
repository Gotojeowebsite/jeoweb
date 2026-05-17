/**
 * Avatar id → mascot pose. The onboarding flow uses these as starting
 * options; the profile page reuses the mapping to render the user's pick.
 */
import type { JeoPose } from '../mascot/Jeo.astro';

export interface AvatarOption {
	id: string;
	label: string;
	pose: JeoPose;
}

export const AVATARS: AvatarOption[] = [
	{ id: 'wave',     label: 'Wave',     pose: 'wave' },
	{ id: 'cheer',    label: 'Cheer',    pose: 'cheer' },
	{ id: 'peek',     label: 'Peek',     pose: 'peek' },
	{ id: 'thinking', label: 'Think',    pose: 'thinking' },
	{ id: 'shrug',    label: 'Shrug',    pose: 'shrug' },
	{ id: 'sleep',    label: 'Sleep',    pose: 'sleep' },
];

export function poseFor(id: string | undefined): JeoPose {
	const found = AVATARS.find(a => a.id === id);
	return found?.pose ?? 'wave';
}
