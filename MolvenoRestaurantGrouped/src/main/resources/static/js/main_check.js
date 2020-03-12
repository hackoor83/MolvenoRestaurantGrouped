var availableTables;
$(document).ready(function () {
  $("#check").click(getAvailableTables);
  availableTables = $("#availableTables").DataTable();

});

function getAvailableTables() {
  $.get("/api/tables", function (tablesList) {
    availableTables.clear();
    for (i = 0; i < tablesList.length; i++) {
      const restauTable = tablesList[i];
      availableTables.row.add(
        $(
          '<tr id="row' + restauTable.available + '"><td><input type="checkbox" id="myCheck" onclick="checkAvailable(' + restauTable.availability + ');"></td>' +
          '<td>' + restauTable.tableNum + '</td>' +
          '<td>' + restauTable.shape + '</td>' +
          '<td>' + restauTable.numOfSeats + '</td></tr>'
        )).draw();
    }
  });

}


function updateReserved(updated_id) {
  var resTableReserved = {
    id: updated_id,
    available: $('#myCheck').val()
  };

  var jsonObject = JSON.stringify(resTable);
  $.ajax({
    url: '/api/tables' + updated_id,
    type: 'PUT',
    contentType: 'application/json',
    data: jsonObject,
    success: function () {
      alert('success');
    },
    error: function () {

    }
  });
}

function checkAvailable() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  //      var text = document.getElementById("text");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    resTable.available = false;
  }

}

