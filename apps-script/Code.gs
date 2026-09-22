const SHEET_NAME = "Leads";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Lead endpoint is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    const headers = [
      "Timestamp",
      "Full Name",
      "Phone",
      "Email",
      "City",
      "Qualification",
      "Course",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "UTM Content",
      "UTM Term",
      "Page URL",
      "Client Submitted At",
      "Lead Status",
      "Counsellor",
      "Follow-up Date",
      "Notes"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const p = e.parameter || {};

    sheet.appendRow([
      new Date(),
      p.full_name || "",
      p.phone || "",
      p.email || "",
      p.city || "",
      p.qualification || "",
      p.course || "",
      p.utm_source || "",
      p.utm_medium || "",
      p.utm_campaign || "",
      p.utm_content || "",
      p.utm_term || "",
      p.page_url || "",
      p.submitted_at_client || "",
      "New Lead",
      "",
      "",
      ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
