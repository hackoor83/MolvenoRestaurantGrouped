var listDishOfTheDayTable;
$(document).ready(function() {
    $("#listDishOfTheDayButton").click(showListDishOfTheDay);
    listDishOfTheDayTable = $("#listDishOfTheDayTable").DataTable({
        ajax: {
            url: 'api/dishMaker',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'dishName' },
            { data: 'cost' },
            { data: 'price' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-outline-success show" rowId="' + data.id + '">Show</button></td>'
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-danger delete" rowid="' + data.id + '">Delete</button>' +
                        '<button class="btn btn-warning edit" dishId="' + data.id + '" dishName="' + data.dishName + '" dishCost="' + data.cost + '" dishPrice="' + data.price + '" dishCost="' + data.cost + '" dishIngredients="' + data.ingredients + '" >Edit</button></td>';
                }
            }
        ]
    });

    $.get("api/dishMaker", function(dishes) {
        console.log(dishes);
    });

    //>>> To delete a dish from the database
    $("#listDishOfTheDayTable").on('click', 'button.delete', function() {
        let rowId = $(this).attr('rowid');
        $("#deleteConfirmationModal").modal('show');
        $("#confirmDeleteModalButton").click(function() {
            $("#deleteConfirmationModal").modal('hide');
            deleteDish(rowId);
        });

        function deleteDish(id) {
            console.log('dish id: ' + id);
            $.ajax({
                url: "api/dishMaker/" + id,
                type: "DELETE",
                success: function() {
                    alert('Dish removed from database!');
                    listDishOfTheDayTable.ajax.reload();
                },
                error: function() {
                    alert('ERROR: Not deleted!');
                }
            });
        }
    });

    //To edit dish details:
    $("#listDishOfTheDayTable").on('click', 'button.edit', function() {
        let dishId = $(this).attr('dishId');
        let dishName = $(this).attr('dishName');
        let dishCost = $(this).attr('dishCost');
        let dishPrice = $(this).attr('dishPrice');
        let dishIngredients = $(this).attr('dishIngredients');

        $("#dishMakerForm").show(showDishMakerForm);
        $("#newDishName").val(dishName);
        console.log('Dish ingredients' + dishIngredients);

    });

    //To show the ingredients of a specific dish
    $("#listDishOfTheDayTable").on('click', 'button.show', function() {
        let rowId = $(this).attr('rowId');
        console.log('show button clicked, the row id is: ' + rowId);

        $.get("api/dishMaker/" + rowId + "/ingredients", function(ingredientsAmounts) {
            console.log('the ingredients amounts of row id: ' + rowId + " is: " + ingredientsAmounts);
        });
    });


});


//To show a list of Dish of the Day:
function showListDishOfTheDay() {
    $(".toggleShow").hide();
    $("#listDishOfTheDayForm").show();
    listDishOfTheDayTable.ajax.reload();
}