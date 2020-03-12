var resTable;
$(document).ready(function () {
$("#delete").click(deleteResTable);
    $("#addTable").click(addTable);
    $("#getTables").click(getTables);
    resTable = $("#resTable").DataTable();
});

//function (tablelist is name only name)
function getTables(){
$.get("/api/tables",function (tablesList){
resTable.clear();
for(i=0; i<tablesList.length; i++){
    const restauTable = tablesList[i];
    resTable.row.add(
    $(
        '<tr id="row'+restauTable.tableNum+'"><td>'+restauTable.tableNum+ '</td>'+
        '<td>'+restauTable.shape+'</td>'+
        '<td>'+restauTable.numOfSeats+'</td>'+
        '<td><button class="btn btn-primary" onclick="confirmDelete('+restauTable.id+');">Delete</button></td></tr>'
    )).draw();
}
});

}

function addTable() {

    var newREsTable = {
        shape: $("#shape").val(),
        numOfSeats: Number($("#numOfSeats").val()),
        tableNum: $("#tableNum").val()
//        availability: $("#availability").attr("checked", true)
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
            $("#numOfSeats").val(''),
             $("#tableNum").val('');
            // $("#availability").val('');
            getTables();
        },
        error: function () {
            alert("NOT well!");
        }
    });


}
function confirmDelete(id){
$('#confirm').modal('show');
tableIdDelete=id
}

function deleteResTable() {
    $.ajax({
        url: "api/tables/" + tableIdDelete,
        type: "DELETE",
        success: function () {
            $("#row" + tableIdDelete).remove();
            getTables();
            $('#confirm').modal('hide');

        },
        error: function () {
            alert("The table is not deleted!");
        }
    });
}


