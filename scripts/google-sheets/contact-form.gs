/**
 * Enframe contact form → Google Sheets (one tab per day)
 *
 * Setup:
 * 1. Create a new Google Sheet (e.g. "Enframe Contact Enquiries")
 * 2. Extensions → Apps Script → paste this file → save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Project Settings → Script properties → add CONTACT_FORM_SECRET (same as .env.local)
 * 5. Copy the Web app URL into GOOGLE_APPS_SCRIPT_URL in .env.local
 */

const TIMEZONE = "Asia/Kolkata";
const HEADERS = ["Timestamp (IST)", "Name", "Phone", "Email", "Message"];

function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getTodaySheetName_() {
  return Utilities.formatDate(new Date(), TIMEZONE, "dd-MMM-yyyy");
}

function getOrCreateTodaySheet_() {
  const ss = getSpreadsheet_();
  const sheetName = getTodaySheetName_();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function parseRequest_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing form data.");
  }

  return JSON.parse(e.postData.contents);
}

function verifySecret_(data) {
  const expected = PropertiesService.getScriptProperties().getProperty("CONTACT_FORM_SECRET");

  if (!expected) {
    throw new Error("CONTACT_FORM_SECRET is not set in Script properties.");
  }

  const received = String(data.secret || "").trim();

  if (received !== String(expected).trim()) {
    throw new Error("Unauthorized request.");
  }
}

function appendSubmission_(data) {
  const sheet = getOrCreateTodaySheet_();
  const timestamp = Utilities.formatDate(new Date(), TIMEZONE, "dd-MMM-yyyy HH:mm:ss");

  sheet.appendRow([
    timestamp,
    String(data.name || "").trim(),
    String(data.phone || "").trim(),
    String(data.email || "").trim(),
    String(data.message || "").trim(),
  ]);
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const data = parseRequest_(e);
    verifySecret_(data);
    appendSubmission_(data);

    return jsonResponse_({ success: true, sheet: getTodaySheetName_() });
  } catch (error) {
    return jsonResponse_({ success: false, error: error.message || "Submission failed." });
  }
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: "Enframe contact form endpoint is running.",
    todaySheet: getTodaySheetName_(),
  });
}

/** Run once from the Apps Script editor to verify sheet creation. */
function testCreateTodaySheet() {
  const sheet = getOrCreateTodaySheet_();
  Logger.log("Created or opened sheet: " + sheet.getName());
}
