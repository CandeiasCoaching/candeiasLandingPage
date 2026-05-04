import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const page = readFileSync('src/app/page.tsx', 'utf8');
const copy = readFileSync('src/components/site-copy.ts', 'utf8');

for (const label of ['plans', 'starter', 'standard', 'more', 'firstBlock']) {
  assert.match(copy, new RegExp(`${label}:`), `missing copy key: ${label}`);
}

for (const id of ['plans', 'more', 'first-block']) {
  assert.match(page, new RegExp(`id=["']${id}["']`), `missing section id: ${id}`);
}

assert.match(page, /id=\{item\.id\}/, 'missing dynamic plan card section ids');
assert.match(page, /id: 'starter'/, 'missing starter section data');
assert.match(page, /id: 'standard'/, 'missing standard section data');
assert.match(page, /copy\.nav\.plans/, 'missing Plans nav item');
assert.doesNotMatch(page, /copy\.nav\.contact/, 'Contact should not be in the top navigation');
assert.doesNotMatch(page, /top-full[^"]*\bmt-3\b/, 'Plans dropdown must not have a hover gap before the menu');
assert.match(page, /top-full[^"]*\bpt-3\b/, 'Plans dropdown needs a padded hover bridge to the menu');
assert.match(page, /copy\.nav\.firstBlock/, 'missing The First Block nav item');
assert.match(page, /copy\.home\.planDetails\.starter/, 'missing Starter plan details');
assert.match(page, /copy\.home\.planDetails\.standard/, 'missing Standard plan details');
assert.match(copy, /advanced:/, 'missing Advanced plan details');
assert.match(copy, /premium:/, 'missing Premium plan details');
assert.match(copy, /online4:/, 'missing 4 week online coaching plan details');
assert.match(copy, /online12:/, 'missing 12 week online coaching plan details');
assert.match(copy, /friendsFamily:/, 'missing friends and family plan details');
assert.match(copy, /varia:/, 'missing varia plan details');
assert.match(page, /item\.plan\.price/, 'missing rendered plan price');
assert.doesNotMatch(page, /<section\s+id="more"/, 'More must not be its own snap section');
assert.match(page, /setPlansPanel\('details'\)/, 'More should reveal the details panel');
assert.match(page, /translate-x-\[-50%\]/, 'Plans container should slide left to reveal details');
assert.match(page, /lg:col-span-2/, 'More CTA should span both plan columns');
assert.match(page, /←\{'\s'\}\s*\{copy\.home\.planDetails\.back\}/, 'Details panel should show a left back control with an arrow');
assert.doesNotMatch(copy, /Back to Starter & Standard|Terug naar Starter & Standard/, 'Back label should be concise');
assert.doesNotMatch(page, /copy\.home\.firstBlock\.description/, 'First Block description text should not render');
assert.doesNotMatch(copy, /Review the first block directly below\.|Bekijk het eerste blok hieronder\./, 'First Block review prompt should be removed');
assert.ok(existsSync('public/res/the_first_block_2.pdf'), 'missing first block PDF');
assert.match(page, /src="\/res\/the_first_block_2\.pdf(?:#[^"]*)?"/, 'missing first block PDF viewer source');
assert.match(page, /title=\{copy\.home\.firstBlock\.pdfTitle\}/, 'missing accessible PDF viewer title');
assert.doesNotMatch(page, /<section\s+id="contact"/, 'Contact should not be a snap section');
assert.match(page, /contactExpanded/, 'Missing collapsible contact footer state');
assert.match(page, /fixed inset-x-0 bottom-0/, 'Contact footer should be a full-width bottom bar');
assert.doesNotMatch(page, /fixed inset-x-3 bottom-3/, 'Contact footer should not be a floating inset card');
assert.match(page, /md:flex[^"]*hidden|hidden[^"]*md:flex/, 'Collapsed desktop footer should show horizontal contact info');
assert.match(page, /compact desktop contact info/, 'Collapsed desktop footer should include compact platform icons');
assert.match(page, /max-w-3xl/, 'Expanded contact content should be centered with a constrained width');
assert.match(page, /contactExpanded \? '' : 'rotate-180'/, 'Contact footer chevron should point up when collapsed and down when expanded');
assert.match(page, /expanded contact brand column/, 'Expanded footer should include a brand/social column');
assert.match(page, /expanded contact links column/, 'Expanded footer should include a links column');
assert.match(page, /expanded contact details column/, 'Expanded footer should include a contact details column');
assert.match(page, /md:grid-cols-\[1fr_0\.75fr_1fr\]/, 'Expanded footer should use a reference-inspired three-column desktop layout');
assert.match(page, /contactExpanded \? 'grid-rows-\[1fr\]' : 'grid-rows-\[0fr\]'/, 'Collapsed footer should hide detailed contact info');
assert.match(page, /aria-expanded=\{contactExpanded\}/, 'Contact footer toggle should expose expanded state');

const languageSwitcher = readFileSync('src/components/language-switcher.tsx', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
assert.match(page, /<LanguageSwitcher className="ml-1" \/>/, 'Language picker should render in the header');
assert.doesNotMatch(layout, /<LanguageSwitcher/, 'Language picker should not render globally over the footer');
assert.match(languageSwitcher, /FlagIcon/, 'Language picker should use flag controls');
