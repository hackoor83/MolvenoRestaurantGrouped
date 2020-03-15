var item_id;
var itemDataTable;

$(document).ready(function() {
    // defining a datatable table -- should be one time
    itemDataTable = $('#itemTable').DataTable({
        ajax: {
            url: 'api/items',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'price' },
            { data: 'quantity' },
            { data: 'unit' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><a href="#"><i class="fas fa-close" itemid="' + data.id + '"></i></a></td>';
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td> <a href="#"> <i class="fas fa-edit" itemid="' + data.id + '"></i></a></td>';
                }
            }
        ]
    });

    // add an event on the add item button
    $('#createItemButton').click(function(e) {
        if ($('#itemNameInput').val() === '') {
            alert('No item name or the name is short too!');
        } else {
            addItem();
        }
        e.preventDefault();
    });

    // add an event on fetch items button
    $('#fetch').click(function(e) {
        getItems();
        e.preventDefault();
    });

    // an event when we click on the delete icon
    $('#itemTable').on('click', '.fas.fa-close', function(e) {
        item_id = $(this).attr('itemid');
        $('#confirm').show();
        e.preventDefault();
    });

    // an event when we click on the edit icon
    $('#itemTable').on('click', '.fas.fa-edit', function() {
        item_id = $(this).attr('itemid');
        const item_name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
        const item_price = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
        const item_quantity = event.target.parentNode.parentElement.parentElement.children[3].innerHTML;
        $('#itemEditName').val(item_name);
        $('#itemEditPrice').val(item_price);
        $('#itemEditQuantity').val(item_quantity);
        $('#updateModal').show();
    });

    // addding an event on the button of close Edit Modal
    $('#closeEditbtn').click(function() {
        $('#updateModal').hide();
    });

    // adding an event on the small button close of update modal
    $('.closeEdit').click(function() {
        $('#updateModal').hide();
    });

    // add an event on the update button of the update Modal
    $('#update').click(function() {
        updateItems(item_id);
        $('#updateModal').hide();
    });

    // add an event on the yes button of the alert delete Modal
    $('#yesBtn').click(function() {
        deleteItems(item_id);
        $('#confirm').hide();
    });

    // adding an event on the small button close of confirm delete alert modal
    $('.close').click(function() {
        $('#confirm').hide();
    });
    // adding an event on the close button of confirm delete modal
    $('#delete').click(function() {
        $('#confirm').hide();
    });
});

// Add item function
function addItem() {
    var item = {
        name: $('#itemNameInput').val(),
        price: Number($('#priceInput').val()),
        quantity: Number($('#quantityInput').val()),
        unit: $('#quantityUnit').val()
    };
    var jsonObject = JSON.stringify(item);
    $.ajax({
        url: 'api/items',
        type: 'POST',
        contentType: 'application/json',
        data: jsonObject,
        success: function() {
            showAlert('A Item has been Added!', 'success');
            getItems();
        },
        error: function() {
            // showAlert('');
            alert('Invalid Input');
        }
    });
}

// get item function
function getItems() {
    itemDataTable.ajax.reload();
}

// update item function
function updateItems(item_id) {
    var item = {
        id: item_id,
        name: $('#itemEditName').val(),
        price: Number($('#itemEditPrice').val()),
        quantity: Number($('#itemEditQuantity').val())

    };

    var jsonObject = JSON.stringify(item);
    $.ajax({
        url: 'api/items/' + item_id,
        type: 'PUT',
        contentType: 'application/json',
        data: jsonObject,
        success: function() {
            alert('A record is updated!', 'success');
            getItems();
        },
        error: function() {
            alert('Invalid Input', 'error');
        }
    });
}

// delete item function
function deleteItems(item_id) {
    $.ajax({
        url: 'api/items/' + item_id,
        type: 'DELETE',
        success: function() {
            alert('A Item has  been deleted!');
            getItems();
        },
        error: function() {
            alert('Invalid input!');
        }
    });
}

// show alert function
function showAlert(msg, myclass) {
    if (myclass === 'error') {
        $('.modal-title').html('');
        $('.modal-title').html('Error');
        $('#error').show();
        $('#message').text('');
        $('#message').append(msg);
    } else {
        $('.modal-title').html('');
        $('.modal-title').html('Success');
        $('#error').show();
        $('#message').text('');
        $('#message').append(msg);
    }
}