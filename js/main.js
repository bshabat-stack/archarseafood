// Google Sheets lead-collection webhook (Apps Script web app — see
// apps-script/Code.gs). Leave empty until the web app is deployed; the form
// then shows a call-us fallback instead of silently dropping the submission.
var SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby_c3HN_W-N4K5g15Wfh2x5IisHIeFpfHBe786k0ngBziSrm5oygdeXB1t-IZLpd7vK/exec';

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

// Inquiry form → Google Sheets
(function () {
  var form = document.getElementById('inquiry-form');
  if (!form) return;

  var notice = form.querySelector('.form-notice');
  var success = document.getElementById('inquiry-success');

  // Track where the lead came from (?source=… on shared links)
  var source = new URLSearchParams(window.location.search).get('source');
  form.elements.source.value = source ? source.slice(0, 100) : 'direct';

  function setFieldError(name, invalid) {
    var input = form.elements[name];
    if (!input) return;
    input.classList.toggle('is-invalid', invalid);
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function validate() {
    var firstInvalid = null;

    function check(name, isValid) {
      setFieldError(name, !isValid);
      if (!isValid && !firstInvalid) firstInvalid = form.elements[name];
    }

    check('name', form.elements.name.value.trim() !== '');
    check('phone', form.elements.phone.value.trim() !== '');

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function setLoading(loading) {
    var button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = loading;
    if (loading) {
      button.dataset.label = button.textContent;
      button.textContent = 'Sending…';
    } else if (button.dataset.label) {
      button.textContent = button.dataset.label;
    }
  }

  function showNotice(html) {
    notice.innerHTML = html;
    notice.classList.add('show');
    notice.focus();
  }

  function showSuccess() {
    form.classList.add('is-hidden');
    if (success) {
      success.classList.remove('is-hidden');
      success.focus();
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    notice.classList.remove('show');
    if (!validate()) return;

    if (!SHEETS_WEBHOOK_URL) {
      showNotice('Online inquiries are coming soon — for now, the fastest way to reach us is a quick call: <a href="tel:+17322495835">(732) 249-5835</a>.');
      return;
    }

    setLoading(true);
    // No JSON content-type header: Apps Script web apps don't answer CORS
    // preflights, so the request must stay a "simple" POST (text/plain).
    fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        type: form.elements.type.value,
        message: form.elements.message.value.trim(),
        source: form.elements.source.value,
        website: form.elements.website.value
      })
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || !data.ok) throw new Error('submit failed');
        });
      })
      .then(showSuccess)
      .catch(function () {
        setLoading(false);
        showNotice('Something went wrong sending your inquiry. Please try again, or give us a call: <a href="tel:+17322495835">(732) 249-5835</a>.');
      });
  });

  // Clear a field's error as soon as the visitor edits it
  form.addEventListener('input', function (e) {
    if (e.target.name) setFieldError(e.target.name, false);
  });
})();
