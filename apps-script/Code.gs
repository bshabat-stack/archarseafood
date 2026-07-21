// Archar Seafood — lead collection webhook.
// Lives in the Google Sheet: Extensions → Apps Script. Receives JSON POSTs
// from the website inquiry form and appends one row per lead.
//
// Deploy: Deploy → New deployment → Web app → Execute as: Me →
// Who has access: Anyone. Paste the resulting /exec URL into
// SHEETS_WEBHOOK_URL in js/main.js.

var SPREADSHEET_ID = '1cDWXx4eMPdy2XhmNsEOuV0PsJfftmUufEkQotkI-XWs';
var HEADER = ['Timestamp', 'Name', 'Phone', 'Interested in', 'Message', 'Source'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return respond({ ok: false, error: 'Invalid request body.' });
    }

    // Honeypot: humans never see this field. Answer with a normal success so
    // bots can't tell they were filtered.
    if (clean(body.website, 300)) {
      return respond({ ok: true });
    }

    var name = clean(body.name, 300);
    var phone = clean(body.phone, 50);
    var type = clean(body.type, 100);
    var message = clean(body.message, 2000);
    var source = clean(body.source, 100) || 'direct';

    if (!name || !phone) {
      return respond({ ok: false, error: 'Name and phone are required.' });
    }

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    ensureHeader(sheet);
    sheet.appendRow([new Date(), name, phone, type, message, source]);

    return respond({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Guarantee row 1 is Archar's header. Repairs a stale/mismatched header (e.g. a
// leftover schema from another project) so appended rows never drift out of
// alignment with their labels. Only touches row 1, never the data below it.
function ensureHeader(sheet) {
  var width = HEADER.length;
  var current = sheet.getLastRow() === 0
    ? []
    : sheet.getRange(1, 1, 1, width).getValues()[0];
  if (current.join('') === HEADER.join('')) return;
  sheet.getRange(1, 1, 1, width).setValues([HEADER]).setFontWeight('bold');
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
