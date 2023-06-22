
var spreadsheetId = "the_spreadsheet_id_of_your_gsheet"

function doGet(event) {

  var answer= readColumnData()
  var jsonans = JSON.stringify(answer)
  var json={
    status:jsonans
  }
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {

  var answer= readColumnData()
  var jsonans = JSON.stringify(answer)
  var json={
    status:jsonans
  }
  
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
}


function deleteRow(rowNumber) {
  try{
  var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  sheet.deleteRow(rowNumber);
  }
  catch (e) {
  Logger.log('Error deletingfrom sheet: ' + e.message);
  return 'Error deleting from sheet: ' + e.message
  }
}



function readDataFromRange(rownum) {
  try{

  var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();

  range= "Sheet1!"+"A"+rownum+":D"+rownum
  var data = sheet.getRange(range).getValues();

  for (var i = 0; i < data.length; i++) {
    var rowData = data[i];
    // Logger.log(rowData);
    return rowData
  }
  }
  catch (e) {
  Logger.log('Error reading from sheet: ' + e.message);
  return 'Error reading from sheet: ' + e.message
  }
}



function readColumnData() {

  try{
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    var columnData = sheet.getRange('A:A').getValues();

    var columnValues = columnData.map(function(row) {
      return row[0];
    });

    // Logger.log((columnValues)); 

    var maxindx=2
    
    for (i in columnValues ) {
      // Logger.log(columnValues[i])
      
      if (parseInt(columnValues[i])>2){
        maxindx = parseInt(columnValues[i]).toFixed(0)
      }

    }
    // Logger.log(maxindx)
    
    if (maxindx == 2){
      Logger.log("no more videos left")
      var datta = readDataFromRange(maxindx.toFixed(0));

      // continue to send data to user
//       Logger.log(datta)
      // continue to send data to user
    }
    else{
      var datta = readDataFromRange(maxindx);

      // continue to send data to user
//       Logger.log(datta)
//       Logger.log(datta[0])
//       Logger.log(datta[1])
//       Logger.log(datta[2])
//       Logger.log(datta[3])
            
//       Logger.log(typeof(datta[0]))    
//       Logger.log("done")  
      // proceed to delete the row that was just retrieved

      deleteRow(parseInt(datta[0]).toFixed(0))
      
    }
    var jsonfin={
      "indx": datta[0],
      "vidid": datta[1],
      "vidtitle": datta[2],
      "savedate": datta[3]
    }
    return jsonfin
  }
  catch (e) {
  Logger.log('Error reading from sheet: ' + e.message);
  return 'Error reading from sheet: ' + e.message
  }


}
