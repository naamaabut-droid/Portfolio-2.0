/* Mobile gate — blocks the site below MAX_WIDTH and shows a desktop-only notice.
   Loaded at the top of <body> (not deferred) so the overlay paints before the page. */
(function () {
  var MAX_WIDTH = 767; // keep in sync with the media query in css/mobile-gate.css

  if (!window.matchMedia('(max-width: ' + MAX_WIDTH + 'px)').matches) return;

  // resolve asset paths relative to this script, so /projects/*.html works too
  var script = document.currentScript;
  var root = script ? script.src.replace(/js\/mobile-gate\.js.*$/, '') : '';

  var gate = document.createElement('div');
  gate.className = 'mobile-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-label', 'This portfolio is designed for desktop');
  gate.innerHTML = [
    '<img class="mobile-gate__bg" src="' + root + 'assets/home/hero-bg.jpg" alt="" />',
    '<img class="mobile-gate__glow" src="' + root + 'assets/home/glow-cream.svg" alt="" />',
    '<div class="mobile-gate__inner">',
    '  <span class="mobile-gate__icon">',
    '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '      <rect x="2" y="4" width="20" height="13" rx="2" />',
    '      <path d="M2 21h20" />',
    '    </svg>',
    '  </span>',
    '  <p class="mobile-gate__title heading-h3">Best viewed on desktop</p>',
    '  <p class="mobile-gate__copy">This portfolio is designed for a larger screen. Open it on your laptop for the full experience.</p>',
    '  <div class="mobile-gate__actions">',
    '    <button type="button" class="mobile-gate__button body-small-medium">Copy link</button>',
    '    <p class="mobile-gate__note body-small-regular">Or reach me at <a href="mailto:naamaabut@gmail.com">naamaabut@gmail.com</a></p>',
    '  </div>',
    '</div>'
  ].join('');

  document.documentElement.classList.add('is-mobile-gated');
  document.body.appendChild(gate);

  var button = gate.querySelector('.mobile-gate__button');
  var resetTimer;

  function flash(label) {
    button.textContent = label;
    button.classList.add('is-copied');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      button.textContent = 'Copy link';
      button.classList.remove('is-copied');
    }, 2000);
  }

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(field);
    return ok;
  }

  button.addEventListener('click', function () {
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { flash('Link copied'); },
        function () { flash(legacyCopy(url) ? 'Link copied' : 'Copy failed'); }
      );
    } else {
      flash(legacyCopy(url) ? 'Link copied' : 'Copy failed');
    }
  });

  // If the window grows past the breakpoint (desktop resize / tablet rotate), release the page.
  window.addEventListener('resize', function () {
    if (!window.matchMedia('(max-width: ' + MAX_WIDTH + 'px)').matches) {
      document.documentElement.classList.remove('is-mobile-gated');
      if (gate.parentNode) gate.parentNode.removeChild(gate);
    }
  });
})();
