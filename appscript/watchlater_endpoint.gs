function doPost(event) {
  var string=JSON.parse(event.postData.contents);
  var videoid= string.videoid
  var video_title= string.video_title
  var answer= myFunction(videoid, video_title)
  var json={
    status:answer
  }
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);

}

function myFunction(videoid, video_title) {
  const spreadsheetId = "the_id_of_your_gsheet_spreadsheet"
  const range = "Sheet1!A1:D1"
  const valueInputOption = "USER_ENTERED"
  // const videoid = videoid
  // const video_title = video_title
  const ddate = new Date();
  ddate.toDateString();
  // const testnode= "adsaewfam pdsaojsapsa"
    let values = [
    [
      "=ROW()", videoid, video_title, ddate
    ]
  ];
  try {
    let valueRange = Sheets.newRowData();
    valueRange.values = values;

    let appendRequest = Sheets.newAppendCellsRequest();
    appendRequest.sheetId = spreadsheetId;
    appendRequest.rows = [valueRange];

    const result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId,
      range, {valueInputOption: valueInputOption});
    return result;
  }
   catch (e) {
    Logger.log('Error adding to sheet: ' + e.message);
    return 'Error adding to sheet: ' + e.message
    }
}
