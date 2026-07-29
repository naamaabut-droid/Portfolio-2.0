(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var strength = 220;
  document.querySelectorAll('.hero__glow, .proj-header__glow').forEach(function (glow) {
    var container = glow.closest('.hero, .proj-header');
    if (!container) return;
    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      glow.style.translate = (relX * strength * 2).toFixed(1) + 'px ' + (relY * strength * 2).toFixed(1) + 'px';
    });
    container.addEventListener('mouseleave', function () {
      glow.style.translate = '';
    });
  });
})();
