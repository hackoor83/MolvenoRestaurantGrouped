var reservationlist;
var reservationIdtoDelete;
var reservedTable;
$(document).ready(function () {
getReservations();
//getReservedTables();
    $('#delete').click(removeReservation);
    $("#add").click(addReservation);
    $("#getresavation").click(getReservations);
    reservationlist = $("#resvationform").DataTable();
});
function getReservedTables(){
$.get("/api/tables",function (tablesList){
reservedTable.empty();
$.each(resTable, function (index, resTable) {
if(resTable.available==false){

        $('#reservedTable').append(
            '<tr ><td scope="row">' + resTable.tableNum + '</td>' +
            '<td scope="row">' + resTable.shape + '</td>' +
            '<td scope="row">' + resTable.numOfSeats + '</td></tr>');
            }
            }
                                                                      }
});

function getReservations() {
    $.get('api/reservation', function (reservations) {
        displayReservations(reservations);
    });
}
function displayReservations(reservations) {
    //first select reservation container element
    var reservationContainer = $('#resvationform');

    //Empty it so we can start over
    reservationContainer.empty();

    //Now we loop over all reservations
    $.each(reservations, function (index, reservation) {

        $('#resvationform').append(
            '<tr class="table table-bordered table-hover"><td scope="row">' + reservation.id + '</td>' +
            '<td scope="row">' + reservation.guestFirstName + '</td>' +
            '<td scope="row">' + reservation.guestLastName + '</td>' +
             '<td scope="row">' + reservation.telephone + '</td>' +
             '<td scope="row">' + reservation.date + '</td>' +
           '<td scope="row">' + (reservation.resTable ? reservation.resTable.tableNum : 'None') + '</td>' +
            '<td scope="row"><button class="btn btn-success" onclick="confirmDeleteReservation(' + reservation.id + ');">Delete</button</td></tr>');

    });
    $('#resvationform .remove-button').click(removeReservation);

}

function confirmDeleteReservation(id) {
    $('#confirm').modal('show');
    reservationIdToDelete = id;
}
function removeReservation() {
        $.ajax({
            url: 'api/reservation/' + reservationIdToDelete,
            type: 'DELETE',
            success: function () {
                getReservations();
                $('#confirm').modal('hide');
            },
            error: function () {
                alert('Something went wrong!!');
            }
        });
}
function addReservation() {

    var newresvation = {
        guestFirstName: $("#guestFirstName").val(),
        guestLastName: $("#guestLastName").val(),
         telephone: $("#telephone").val(),
        date: $("#date").val(),
         resTable: {
            id: $("#tableNumSelect").val()
         }
//        numberOfGuest: $("#numberOfGuest").val(),
    }

    var jsonoject = JSON.stringify(newresvation);
    $.ajax({
        url: "api/reservation",
        contentType: "application/json",
        type: "POST",
        data: jsonoject,

        success: function () {
            alert("done successfully");
             $("#guestFirstName").val(''),
             $("#guestLastName").val(''),
             $("#telephone").val(''),
             $("#date").val(''),
             $("#tableNum").val('')
            getReservations();
        },
        error: function () {
            alert("not done  successfully");
        }
    });
}
function createReservation(){
var reservationGuest = $('#guestLastName').val();
if (!reservationGuest) {
        alert('You have to put name');
        return;
    }
reservation = {
guestLastName : reservationGuest,
resTable :{
id:$('#tableNumSelect').val(),
}
};
addReservation();
};

