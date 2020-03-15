var resevationUpdate;
var reservationlist;
var reservationIdtoDelete;
$(document).ready(function() {
    // $('#date').datepicker({
    //     DateFormat: "dd-mm-yy",
    //     changeMonth: true,
    //     changeYear: true
    // });
    $('#edit').click(UpdateReservation);
    $('#delete').click(removeReservation);
    $("#add").click(addName);
    $("#getresavation").click(getNames);
    reservationlist = $("#resvationform").DataTable();
    getNames();
});

function getNames() {
    $.get("/api/resevation", function(resvations) {
        reservationlist.clear();
        for (i = 0; i < resvations.length; i++) {
            const restauRes = resvations[i];
            reservationlist.row.add(
                $(
                    '<tr id="row' + restauRes.id + '"><td>' + restauRes.id + '</td>' +
                    '<td>' + restauRes.guestFirstName + '</td>' +
                    '<td>' + restauRes.guestLastName + '</td>' +
                    '<td>' + restauRes.telefoon + '</td>' +
                    '<td>' + restauRes.date + '</td>' +
                    '<td>' + restauRes.time + '</td>' +
                    '<td>' + restauRes.numberOfGuest + '</td>' +
                    '<td><button class="btn btn-success" onclick="confirmdeleteResevation(' + restauRes.id + ');">Delete</button></td></tr>' +
                    '<td><button class="btn btn-success" onclick="confirmupldateResevation(' + restauRes.id + ');">Edit</button></td></tr>'

                ));
        }
        reservationlist.draw();
    });
}

function confirmdeleteResevation(id) {

    $('#confirm').modal('show');
    reservationIdtoDelete = id;

}

function confirmupldateResevation(id) {

    $('#upload').modal('show');
    resevationUpdate = id;

}





function removeReservation() {


    $.ajax({
        url: 'api/resevation/' + reservationIdtoDelete,
        type: 'DELETE',
        success: function() {
            getNames();
            $('#confirm').modal('hide');

        },
        error: function() {
            alert('Something went wrong!!');
        }
    });
}

function UpdateReservation() {
    $.ajax({
        url: 'api/resevation/addresvation' + resevationUpdate,
        type: 'PUT',
        success: function() {
            getNames();
            $('#upload').modal('hide');

        },
        error: function() {
            alert('Something went wrong!!');
        }
    });
}


function addName() {

    var newresvation = {
        guestFirstName: $("#guestFirstName").val(),
        guestLastName: $("#guestLastName").val(),
        time: $("#time").val(),
        date: $("#date").val(),
        telefoon: $("#telefoon").val(),
        numberOfGuest: $("#numberOfGuest").val(),
    }

    var jsonoject = JSON.stringify(newresvation);
    $.ajax({
        url: "api/resevation/addresvation",
        contentType: "application/json",
        type: "POST",
        data: jsonoject,

        success: function() {
            alert("Done successflly");
            // reservationlist.ajax.reload();
            getNames();
        },
        error: function() {
            alert("Done not successflly");
        }
    });
}