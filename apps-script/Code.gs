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
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADER);
      sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
    }
    sheet.appendRow([new Date(), name, phone, type, message, source]);

    return respond({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
