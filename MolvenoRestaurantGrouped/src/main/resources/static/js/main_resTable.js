var resTable;
$(document).ready(function () {
    $("#addTable").click(addTable);
    $("#getTables").click(getTables);
    // $("#available").switch();
    resTable = $("#resTable").DataTable();
});

//function (tablelist is name only name)
function getTables() {
    $.get("/api/tables", function (tablesList) {
        resTable.clear();
        for (i = 0; i < tablesList.length; i++) {
            const restauTable = tablesList[i];
            resTable.row.add(
                $(
                    '<tr id="row' + restauTable.tableNum + '"><td>' + restauTable.tableNum + '</td>' +
                    '<td>' + restauTable.shape + '</td>' +
                    '<td>' + restauTable.numOfSeats + '</td>' +
                    '<td>' + restauTable.availability + '</td>' +
                    '<td><button id="delete" class="btn btn-info" onclick="deleteResTable(' + restauTable.id + ');">Delete</button></td></tr>'
                )).draw();
        }
    });

}

function addTable() {

    var newREsTable = {
        shape: $("#shape").val(),
        numOfSeats: Number($("#numOfSeats").val()),
        availability: $("#availability").attr("checked", true),
        tableNum: $("#tableNum").val()

    }

    if (!numOfSeats) {
        alert('You have to put number');
        return;
    }
    if (numOfSeats < 0) {
        alert('You have to put valid number');
        return;
    }
    if (!tableNum) {
        alert('You have to put number');
        return;
    }
    if (numOfSeats < 0) {
        alert('You have to put valid number');
        return;
    }

    const jsonObject = JSON.stringify(newREsTable);

    $.ajax({
        url: "api/tables",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert("Done very well!");
            // $("#numOfSeats").val(''),
            //     $("#tableNum").val('')
            // $("#availability").val('');
        },
        error: function () {
            alert("NOT well!");
        }
    });


}

function deleteResTable(id) {
    $.ajax({
        url: "api/tables/" + id,
        type: "DELETE",
        success: function () {
            $("#row" + id).remove();
            alert("Table deleted!");
        },
        error: function () {
            alert("The table is not deleted!");
        }
    });
}


