// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close the menu after tapping a link
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Inquiry form — backend not yet connected; show a call-us fallback instead of
// silently dropping the submission. Remove once a form endpoint is wired up.
(function () {
  var form = document.querySelector('.form-card');
  var notice = document.querySelector('.form-notice');
  if (!form || !notice) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    notice.classList.add('show');
    notice.focus();
  });
})();
