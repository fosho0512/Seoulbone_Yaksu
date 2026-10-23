/* Image readiness shared by page reveals and scroll-driven photo changes. */
(function () {
    const imageTasks = new WeakMap();
    const elementTasks = new WeakMap();
    const backgrounds = new Map();
    const heroPreloads = new Map();
    const mediaScriptUrl = document.currentScript.src;
    const heroFiles = {
        staff: 'staff.c96764c12e5e.webp',
        values: 'values.13e23a5c8897.webp',
        diagnosis: 'diagnosis.adef45d4f797.webp',
        treatment: 'treatment.4f3c242dfc3e.webp',
        prp: 'prp.a6675250c3bf.webp',
        contact: 'contact.d0558b3cf837.webp'
    };
    document.documentElement.classList.add('media-enabled');

    function image(img) {
        if (imageTasks.has(img)) return imageTasks.get(img);
        const task = new Promise(resolve => {
            let finished = false;
            const finish = success => {
                if (finished) return;
                finished = true;
                clearTimeout(timer);
                img.removeEventListener?.('load', loaded);
                img.removeEventListener?.('error', failed);
                img.classList.add(success ? 'media-ready' : 'media-failed');
                resolve(success);
            };
            const loaded = async () => {
                try {
                    if (img.decode) await img.decode();
                    finish(img.naturalWidth > 0);
                } catch (_) { finish(false); }
            };
            const failed = () => finish(false);
            const timer = setTimeout(failed, 15000);
            img.addEventListener?.('load', loaded, { once: true });
            img.addEventListener?.('error', failed, { once: true });
            img.loading = 'eager';
            if (img.complete) {
                if (img.naturalWidth > 0) loaded();
                else failed();
            }
        });
        imageTasks.set(img, task);
        return task;
    }

    function background(element, pseudo) {
        const match = getComputedStyle(element, pseudo).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (!match) return Promise.resolve(true);
        const url = match[1];
        if (!backgrounds.has(url)) {
            const img = new Image();
            img.src = url;
            backgrounds.set(url, image(img));
        }
        return backgrounds.get(url);
    }

    function prepare(element) {
        if (elementTasks.has(element)) return elementTasks.get(element);
        const photos = element.matches('img') ? [element] : Array.from(element.querySelectorAll('img'));
        const task = (photos.length
            ? Promise.all(photos.map(image)).then(results => results.every(Boolean))
            : background(element, element.id === 'visual-section' ? '::before' : null)
        ).then(success => {
            element.classList.add(success ? 'media-ready' : 'media-failed');
            return success;
        });
        elementTasks.set(element, task);
        return task;
    }

    function warmNear(elements) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    prepare(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '120% 0px', threshold: 0 });
        elements.forEach(element => observer.observe(element));
    }

    async function revealHero(hero) {
        if (!await prepare(hero)) {
            hero.classList.add('hero-unavailable');
            return false;
        }
        // Let the decoded, fully opaque photo settle before opening its mask.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        hero.classList.add('hero-ready');
        return true;
    }

    function heroUrl(href) {
        const target = new URL(href, window.location.href);
        if (target.origin !== window.location.origin) return null;
        const route = target.pathname.match(/^\/(?:en\/)?(staff|values|diagnosis|treatment|prp|contact)(?:\/|\/index\.html)?$/);
        return route ? new URL('../images/heroes/' + heroFiles[route[1]], mediaScriptUrl).href : null;
    }

    function prewarm(href, priority = 'low') {
        const url = heroUrl(href);
        if (!url) return Promise.resolve(false);
        if (heroPreloads.has(url)) {
            const existing = heroPreloads.get(url);
            if (priority === 'high') existing.img.fetchPriority = 'high';
            return existing.task;
        }
        const img = new Image();
        img.fetchPriority = priority;
        img.decoding = 'async';
        img.src = url;
        const task = image(img).then(success => {
            if (!success) heroPreloads.delete(url);
            return success;
        });
        heroPreloads.set(url, { img, task });
        return task;
    }

    function setupNavigationPreload() {
        let navigation = 0;
        const navigationLink = target => target.closest?.('.drawer-menu a[href], .lang-switch[href]');
        const hint = event => {
            const link = navigationLink(event.target);
            if (link) prewarm(link.href, 'high');
        };
        document.addEventListener('pointerover', hint, { passive: true });
        document.addEventListener('focusin', hint);
        document.addEventListener('pointerdown', hint, { passive: true });
        document.getElementById('menu-toggle')?.addEventListener('click', () => {
            document.querySelectorAll('.drawer-menu a[href]').forEach(link => prewarm(link.href));
        });
        document.addEventListener('click', async event => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = navigationLink(event.target);
            if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || !heroUrl(link.href)) return;
            const target = new URL(link.href);
            if (target.pathname === window.location.pathname && target.search === window.location.search) return;
            event.preventDefault();
            const request = ++navigation;
            link.setAttribute('aria-busy', 'true');
            document.documentElement.classList.add('media-navigating');
            // Keep the current page while warming the destination; never trap a failed navigation.
            await new Promise(resolve => {
                const timer = setTimeout(resolve, 2000);
                prewarm(link.href, 'high').then(() => { clearTimeout(timer); resolve(); });
            });
            link.removeAttribute('aria-busy');
            if (request !== navigation) return;
            document.documentElement.classList.remove('media-navigating');
            window.location.assign(link.href);
        });
    }

    function observeReveal(elements) {
        warmNear(elements);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                prepare(entry.target).then(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        elements.forEach(element => observer.observe(element));
        return observer;
    }

    function createSwitcher(count, load, display) {
        const tasks = new Map();
        let requested = -1;
        let displayed = -1;
        const warm = index => {
            if (index < 0 || index >= count) return Promise.resolve(false);
            if (!tasks.has(index)) tasks.set(index, Promise.resolve(load(index)).catch(() => false));
            return tasks.get(index);
        };
        return {
            warm,
            async show(index) {
                if (requested === index) return;
                requested = index;
                if (await warm(index) && requested === index && displayed !== index) {
                    displayed = index;
                    display(index);
                    warm(index + 1);
                }
            }
        };
    }

    window.siteMedia = { image, prepare, warmNear, observeReveal, createSwitcher, revealHero, heroUrl, prewarm };
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.sub-hero, .diag-subhero').forEach(hero => {
            revealHero(hero);
        });
        setupNavigationPreload();
        const visual = document.getElementById('visual-section');
        if (visual) prepare(visual);
        warmNear(document.querySelectorAll('.profile-image-wrapper, .treatment-slogan-bg, .diag-slogan'));
    });
})();
