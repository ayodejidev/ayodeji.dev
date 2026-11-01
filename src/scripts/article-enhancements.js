import { enhanceCodeBlocks } from '../lib/code-blocks.mjs';

export function enhanceArticles() {
  const article = document.querySelector('[data-longform]');
  if (!article || article.dataset.enhanced === 'true') return;
  article.dataset.enhanced = 'true';

  const revealTarget = () => {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
    if (!target || !article.contains(target)) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
    }
  };
  revealTarget();
  window.addEventListener('hashchange', revealTarget);

  for (const heading of article.querySelectorAll('h2[id], h3[id]')) {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = `#${heading.id}`;
    anchor.setAttribute('aria-label', `Link to ${heading.textContent?.trim() ?? 'section'}`);
    anchor.textContent = '#';
    heading.append(anchor);
  }

  const progress = document.querySelector('[data-reading-progress]');
  if (progress) {
    progress.hidden = false;
    const headings = [...article.querySelectorAll('h2[id], h3[id]')];
    const links = [...document.querySelectorAll('.article-toc a')];
    let pending = false;
    const update = () => {
      pending = false;
      const rect = article.getBoundingClientRect();
      const distance = Math.max(1, rect.height - Math.max(1, innerHeight - 100));
      const percent = Math.round(Math.min(1, Math.max(0, (100 - rect.top) / distance)) * 100);
      progress.querySelector('progress').value = percent;
      progress.querySelector('progress').textContent = `${percent}%`;
      progress.querySelector('[data-reading-percent]').textContent = `${percent}%`;
      let current;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) current = heading.id;
      }
      for (const link of links) {
        let id;
        try { id = decodeURIComponent(link.hash.slice(1)); } catch { continue; }
        if (id === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    article.addEventListener('toggle', schedule, true);
    article.addEventListener('load', schedule, true);
    update();
  }

  enhanceCodeBlocks(article);
}
