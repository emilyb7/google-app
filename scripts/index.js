function myFunction() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var s1 = ss.getSheetByName(SHEET_NAME);
  var rows = ss.getLastRow();
  var data = s1.getRange(2, 1, rows - 1, 2).getValues();
  var code = data[0][0].toLowerCase().replace(" ", "");
  var getUrl = URL + "?text=" + code;
  var response = UrlFetchApp.fetch(getUrl, {
    method: "get"
  });
  Logger.log(response);
}
