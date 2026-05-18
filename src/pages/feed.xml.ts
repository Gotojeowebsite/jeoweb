/**
 * Atom feed of newly added games. Generated from recently_added.json so
 * it always matches what the homepage's "Newly added" rail shows.
 *
 * Subscribers (RSS readers, NetNewsWire, Feedly, etc.) get a clean
 * notification the moment a new game lands in the catalog — no email
 * signup, no JS, no tracking.
 */
import type { APIRoute } from 'astro';
import { getRecentlyAdded, gameSlug } from '../lib/catalog';

const SITE = 'https://jeoweb.app';

function xmlEscape(s: string): string {
	return s.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}

export const GET: APIRoute = () => {
	const games = getRecentlyAdded().slice(0, 30);
	const latest = games[0]?.addedDate ?? new Date().toISOString().slice(0, 10);
	const updated = new Date(latest).toISOString();

	const entries = games
		.map(g => {
			const slug = gameSlug(g);
			const url = `${SITE}/game/${slug}`;
			const published = new Date(g.addedDate || latest).toISOString();
			const tags = (g.tags ?? []).join(', ');
			const image = g.image ? `${SITE}/${g.image}` : '';
			const summary = `New ${g.type} game added to Jeo. ${tags ? 'Tags: ' + tags + '.' : ''} Plays right in the browser, no download.`;
			return `<entry>
		<id>${url}</id>
		<title>${xmlEscape(g.name)}</title>
		<link href="${url}" rel="alternate"/>
		<link href="${SITE}/play/${slug}" rel="related" title="Play now"/>
		${image ? `<link href="${xmlEscape(image)}" rel="enclosure" type="image/jpeg"/>` : ''}
		<published>${published}</published>
		<updated>${published}</updated>
		<summary>${xmlEscape(summary)}</summary>
		<category term="${xmlEscape(g.type)}"/>
		${(g.tags ?? []).map(t => `<category term="${xmlEscape(t)}"/>`).join('')}
	</entry>`;
		})
		.join('\n\t');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>Jeo — Newly added games</title>
	<subtitle>Fresh imports, the moment they pass the offline-manifest gate.</subtitle>
	<link href="${SITE}/feed.xml" rel="self"/>
	<link href="${SITE}/new" rel="alternate"/>
	<id>${SITE}/</id>
	<updated>${updated}</updated>
	<icon>${SITE}/icon.svg</icon>
	<author><name>Jeo</name></author>
	${entries}
</feed>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=900',
		},
	});
};
