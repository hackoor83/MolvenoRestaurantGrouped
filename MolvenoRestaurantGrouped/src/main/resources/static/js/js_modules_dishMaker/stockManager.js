var listItemsDataTable;
// var deleteConfirmationModal = $("#deleteConfirmationModal");
$(document).ready(function() {
    listItemsDataTable = $('#listItemsTable').DataTable({
        ajax: {
            url: 'api/ingredientsDb',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'amount' },
            { data: 'unit' },
            { data: 'cost' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td>' + (Math.round((data.cost / data.amount) * Math.pow(10, 2)) / Math.pow(10, 2)) + '</td>'
                        // (Math.round(sellingPrice * Math.pow(10, 2)) / Math.pow(10, 2))
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-danger delete" rowid="' + data.id + '">Delete</button>' +
                        // '<button class="btn btn-warning edit" rowid="' + data.id + '">Edit</button></td>';
                        '<button class="btn btn-warning edit" itemId="' + data.id + '" itemName="' + data.name + '" itemAmount="' + data.amount + '" itemUnit="' + data.unit + '" itemCost="' + data.cost + '" >Edit</button></td>';
                }
            }
        ]
    });

    //To define the rowId as an attribute to the row then to delete the row (i.e. the stock item):
    $("#listItemsTable").on('click', 'button.delete', function() {
        let rowId = $(this).attr('rowid');
        $("#deleteConfirmationModal").modal('show');
        $("#confirmDeleteModalButton").click(function() {
            $("#deleteConfirmationModal").modal('hide');
            deleteItem(rowId);
        });
        // >>>To delete an item from the Stock Management List
        function deleteItem(id) {
            $.ajax({
                url: "api/ingredientsDb/" + id,
                type: "DELETE",
                success: function() {
                    // $("#row" + id).remove();
                    listItemsDataTable.ajax.reload();
                },
                error: function() {
                    alert('ERROR: Not deleted!');
                }
            });
        }
    });


    //To define the rowId as an attribute to the row then to edit the row:
    $("#listItemsTable").on('click', 'button.edit', function() {
        let itemId = $(this).attr('itemId');
        let itemName = $(this).attr('itemName');
        let itemAmount = $(this).attr('itemAmount');
        let itemUnit = $(this).attr('itemUnit');
        let itemCost = $(this).attr('itemCost');

        $("#stockItemEditModal").modal('show');
        $("#itemNameEditInput").val(itemName),
            $("#itemAmounEditInput").val(itemAmount),
            $("#itemUnitEditInput option:selected").text(itemUnit),
            $("#itemCostEditInput").val(itemCost)
        $("#itemEditFormSaveButton").click(function() {
            $("#stockItemEditModal").modal('hide');
            editItem(itemId);
        });
    });

    //To edit the row in database
    function editItem(rowid) {

        let updatedItem = {
            id: rowid,
            name: $("#itemNameEditInput").val(),
            amount: $("#itemAmounEditInput").val(),
            unit: $("#itemUnitEditInput option:selected").text(),
            cost: $("#itemCostEditInput").val()
        }

        let jsonObject = JSON.stringify(updatedItem);

        $.ajax({
            url: "api/ingredientsDb/update/" + rowid,
            type: "PUT",
            contentType: "application/json",
            data: jsonObject,
            success: function() {
                listItemsDataTable.ajax.reload();
                alert('Item updated successfully!');
            },
            error: function() {
                alert('Item could not be updated!');
            }
        });
    }


    $("#stockItemsManagerMainButton").click(function() {
        $(".toggleShow").hide();
        $("#stockItemsManagerMenuButtons").show();
    });
    $("#addItemStockManagerMenuButton").click(showAddItemToDbForm);
    $("#listItemsStockManagerMenuButton").click(showListItemsForm);

});

//>>>> Stock Management form: To list the stock items
function showListItemsForm() {
    $(".toggleShow").hide();
    $("#listItemsForm").show();
    listItemsDataTable.ajax.reload();
}


//To show the Add Item Form:
function showAddItemToDbForm() {
    $(".toggleShow").hide();
    $("#addItemToDbForm").show();
    $("#addItemSubmitButton").click(function() {
        let newItem = {
            name: $("#addItemItemNameInput").val(),
            amount: $("#addItemItemAmountInput").val(),
            unit: $("#addItemItemAmountUnit").val(),
            cost: $("#addItemItemCostInput").val()
        }

        let jsonObject = JSON.stringify(newItem);

        $.ajax({
            url: "api/ingredientsDb",
            type: "POST",
            contentType: "application/json",
            data: jsonObject,
            success: function() {
                console.log('Item added successfully!');
                $("#addItemItemNameInput").val(''),
                    $("#addItemItemAmountInput").val(''),
                    $("#addItemItemAmountUnit").val(''),
                    $("#addItemItemCostInput").val('')
            },
            error: function() {
                alert('Item could not be added!');
            }
        });
    });
}