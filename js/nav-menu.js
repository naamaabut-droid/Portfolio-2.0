(function () {
  document.querySelectorAll('.nav-pill').forEach(function (pill) {
    var toggle = pill.querySelector('.nav-pill__toggle');
    if (!toggle) return;

    function setOpen(open) {
      pill.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!pill.classList.contains('is-open'));
    });

    // close when a link is tapped
    pill.querySelectorAll('.nav-pill__item').forEach(function (item) {
      item.addEventListener('click', function () { setOpen(false); });
    });

    // close on outside tap
    document.addEventListener('click', function (e) {
      if (!pill.contains(e.target)) setOpen(false);
    });
  });
})();
