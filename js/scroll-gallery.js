// Arrow controls (desktop) + edge fade + dot pagination (mobile) for
// horizontally-scrolling galleries. Wrap any scroller with class "flow".
(() => {
  function wrapAndArrows() {
    document.querySelectorAll('.flow').forEach((row) => {
      if (row.dataset.scrollInit) return;
      row.dataset.scrollInit = '1';

      const wrap = document.createElement('div');
      wrap.className = 'scroll-wrap';
      row.parentNode.insertBefore(wrap, row);
      wrap.appendChild(row);

      const mkBtn = (dir) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'scroll-arrow ' + dir;
        b.setAttribute('aria-label', dir === 'prev' ? 'Scroll back' : 'Scroll forward');
        b.addEventListener('click', () => {
          row.scrollBy({ left: (dir === 'prev' ? -1 : 1) * Math.round(row.clientWidth * 0.7), behavior: 'smooth' });
        });
        wrap.appendChild(b);
        return b;
      };
      const prev = mkBtn('prev');
      const next = mkBtn('next');

      const update = () => {
        const max = row.scrollWidth - row.clientWidth;
        const canNext = max > 8 && row.scrollLeft < max - 8;
        const canPrev = row.scrollLeft > 8;
        next.classList.toggle('show', canNext);
        prev.classList.toggle('show', canPrev);
        wrap.classList.toggle('can-next', canNext);
        wrap.classList.toggle('can-prev', canPrev);
      };
      row.addEventListener('scroll', update, { passive: true });
      addEventListener('resize', update);
      update();
    });
  }

  function dots() {
    document.querySelectorAll('.flow').forEach((scroller) => {
      if (scroller.dataset.dots) return;
      const items = Array.from(scroller.children);
      if (items.length < 2) return;

      const pag = document.createElement('div');
      pag.className = 'dots-pagination';
      pag.setAttribute('aria-hidden', 'true');
      items.forEach(() => {
        const d = document.createElement('span');
        d.className = 'dot';
        pag.appendChild(d);
      });
      const anchor = scroller.closest('.scroll-wrap') || scroller;
      anchor.insertAdjacentElement('afterend', pag);
      const dotEls = Array.from(pag.children);

      const update = () => {
        const s = scroller.getBoundingClientRect();
        const mid = s.left + s.width / 2;
        let idx = 0, best = Infinity;
        items.forEach((it, i) => {
          const r = it.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - mid);
          if (dist < best) { best = dist; idx = i; }
        });
        dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
      };
      scroller.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
      scroller.dataset.dots = '1';
    });
  }

  function dragToScroll() {
    document.querySelectorAll('.proj-pan-flow').forEach((row) => {
      if (row.dataset.dragInit) return;
      row.dataset.dragInit = '1';
      let isDown = false, startX = 0, startScroll = 0;
      row.addEventListener('pointerdown', (e) => {
        isDown = true;
        row.setPointerCapture(e.pointerId);
        startX = e.clientX;
        startScroll = row.scrollLeft;
        row.style.cursor = 'grabbing';
      });
      row.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        row.scrollLeft = startScroll - (e.clientX - startX);
      });
      const release = () => { isDown = false; row.style.cursor = 'grab'; };
      row.addEventListener('pointerup', release);
      row.addEventListener('pointerleave', release);
    });
  }

  function init() {
    wrapAndArrows();
    dots();
    dragToScroll();
  }

  if (document.readyState === 'complete') setTimeout(init, 60);
  else window.addEventListener('load', () => setTimeout(init, 60));
})();
