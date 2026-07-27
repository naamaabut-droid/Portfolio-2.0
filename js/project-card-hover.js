// Adds the reveal-on-hover arrow button to every .project-card, per the
// "Project Card" hover/pressed variants in the Figma component library.
(() => {
  function init() {
    document.querySelectorAll('.project-card__title-block').forEach((block) => {
      if (block.dataset.arrowInit) return;
      block.dataset.arrowInit = '1';

      const inner = document.createElement('div');
      inner.className = 'project-card__title-inner';
      while (block.firstChild) inner.appendChild(block.firstChild);
      block.appendChild(inner);

      const arrow = document.createElement('span');
      arrow.className = 'project-card__arrow';
      arrow.setAttribute('aria-hidden', 'true');
      block.appendChild(arrow);
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
