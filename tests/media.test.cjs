const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function setup(overrides = {}) {
    const context = { window: { location: { href: 'https://example.com/staff/', origin: 'https://example.com' } }, document: { currentScript: { src: 'https://example.com/js/media.js' }, documentElement: { classList: { add() {} } }, addEventListener() {} }, URL, setTimeout, clearTimeout, requestAnimationFrame: callback => callback(), Image: class {}, ...overrides };
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/media.js'), 'utf8'), context);
    return context.window.siteMedia;
}

function pending() {
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    return { promise, resolve };
}

test('keeps the current image visible until the requested image is ready', async () => {
    const media = setup();
    const next = pending();
    let displayed = 0;
    const switcher = media.createSwitcher(2, () => next.promise, i => { displayed = i; });
    const change = switcher.show(1);
    assert.equal(displayed, 0);
    next.resolve(true);
    await change;
    assert.equal(displayed, 1);
});

test('a late image cannot replace the latest scroll selection', async () => {
    const media = setup();
    const requests = [pending(), pending(), pending()];
    let displayed = 0;
    const switcher = media.createSwitcher(3, i => requests[i].promise, i => { displayed = i; });
    const first = switcher.show(1);
    const last = switcher.show(2);
    requests[2].resolve(true);
    await last;
    requests[1].resolve(true);
    await first;
    assert.equal(displayed, 2);
});

test('a failed replacement leaves the previous photo visible', async () => {
    const media = setup();
    let displayed = 0;
    const switcher = media.createSwitcher(2, async () => false, i => { displayed = i; });
    await switcher.show(1);
    assert.equal(displayed, 0);
});

test('does not reveal an image until decoding finishes', async () => {
    const media = setup();
    const decoded = pending();
    const classes = new Set();
    const image = { complete: true, naturalWidth: 100, loading: 'lazy', classList: { add: c => classes.add(c) }, decode: () => decoded.promise };
    const ready = media.image(image);
    assert.equal(classes.has('media-ready'), false);
    decoded.resolve();
    assert.equal(await ready, true);
    assert.equal(classes.has('media-ready'), true);
});

test('a broken image resolves as failed instead of blocking a reveal', async () => {
    const media = setup();
    const classes = new Set();
    const image = { complete: true, naturalWidth: 0, classList: { add: c => classes.add(c) } };
    assert.equal(await media.image(image), false);
    assert.equal(classes.has('media-failed'), true);
    assert.equal(classes.has('media-ready'), false);
});

test('a decode error preserves the preview', async () => {
    const media = setup();
    const classes = new Set();
    const image = { complete: true, naturalWidth: 100, classList: { add: c => classes.add(c) }, decode: async () => { throw new Error('decode failed'); } };
    assert.equal(await media.image(image), false);
    assert.equal(classes.has('media-failed'), true);
    assert.equal(classes.has('media-ready'), false);
});

test('hero wipe waits for decoding and a painted frame', async () => {
    const frames = [];
    const media = setup({ requestAnimationFrame: callback => frames.push(callback) });
    const decoded = pending();
    const classes = new Set();
    const photo = { complete: true, naturalWidth: 100, classList: { add() {} }, decode: () => decoded.promise };
    const hero = { matches: () => false, querySelectorAll: () => [photo], classList: { add: c => classes.add(c) } };
    const ready = media.revealHero(hero);
    assert.equal(classes.has('hero-ready'), false);
    decoded.resolve();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(classes.has('hero-ready'), false);
    frames.shift()();
    assert.equal(classes.has('hero-ready'), false);
    frames.shift()();
    assert.equal(await ready, true);
    assert.equal(classes.has('hero-ready'), true);
});

test('failed hero does not play an empty wipe', async () => {
    const media = setup();
    const classes = new Set();
    const photo = { complete: true, naturalWidth: 0, classList: { add() {} } };
    const hero = { matches: () => false, querySelectorAll: () => [photo], classList: { add: c => classes.add(c) } };
    assert.equal(await media.revealHero(hero), false);
    assert.equal(classes.has('hero-ready'), false);
    assert.equal(classes.has('hero-unavailable'), true);
});

test('Korean and English routes prewarm the same hero; external links do not', () => {
    const media = setup();
    for (const route of ['staff', 'values', 'diagnosis', 'treatment', 'prp', 'contact']) {
        assert.match(media.heroUrl('/' + route + '/'), /\/images\/heroes\/.*\.[a-f0-9]{12}\.webp$/);
        assert.equal(media.heroUrl('/en/' + route + '/'), media.heroUrl('/' + route + '/'));
    }
    assert.equal(media.heroUrl('https://outside.example/staff/'), null);
    assert.equal(media.heroUrl('/#main'), null);
});

test('menu hints share one preload and a click raises its priority', async () => {
    const photos = [];
    class PreloadImage {
        constructor() {
            this.complete = true;
            this.naturalWidth = 100;
            this.classList = { add() {} };
            photos.push(this);
        }
        async decode() {}
    }
    const media = setup({ Image: PreloadImage });
    const low = media.prewarm('/values/');
    const high = media.prewarm('/en/values/', 'high');
    assert.equal(low, high);
    assert.equal(photos.length, 1);
    assert.equal(photos[0].fetchPriority, 'high');
    assert.equal(await high, true);
});
