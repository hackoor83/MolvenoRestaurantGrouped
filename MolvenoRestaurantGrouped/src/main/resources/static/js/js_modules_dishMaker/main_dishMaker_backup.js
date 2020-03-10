//Define variables that are equal to the html element datatable.
var listItemsDataTable;
var dishMakerIngredientsTable;
var listDishOfTheDayTable;

//To run as soon as the page is fully loaded:
$(document).ready(function() {
    listItemsDataTable = $('#listItemsTable').DataTable();
    dishMakerIngredientsTable = $('#dishMakerIngredientsTable').DataTable();
    listDishOfTheDayTable = $("#listDishOfTheDayTable").DataTable();
    $("#dishMakerMainButton").click(showDishMakerForm);
    $(".toggleShow").hide();
    $("#mainWindowAndButtons").show();
    $("#ingredientsManagerMainButton").click(function() {
        $(".toggleShow").hide();
        $("#ingredientsManagerMenuButtons").show();
    });
    $("#addItemIngredientsManagerMenuButton").click(showAddItemToDbForm);
    $("#listItemsIngredientsManagerMenuButton").click(showListItemsForm);
    $("#saveNewDishToDbButton").click(saveNewDishToDb);
    $("#listDishOfTheDayButton").click(showListDishOfTheDay);
    $("#restartNewDishButton").click(clearIngredientForm);
    // $("#addIngredientAddButton").click(listIngredientToDish);

});


//To show a list of Dish of the Day:

function showListDishOfTheDay() {
    $(".toggleShow").hide();
    $("#listDishOfTheDayForm").show();

    $.get("api/dishMaker", function(dishes) {
        console.log(dishes);

        //To clear the contents of the table, this is instead of: $("#listItemsTableBody").empty();
        listDishOfTheDayTable.clear();

        for (i = 0; i < dishes.length; i++) {
            const dish = dishes[i];

            //To append new row that can be controlled by datatables. This is instead of: $("#listItemsTableBody").append(...)
            listDishOfTheDayTable.row.add(
                $(
                    '<tr id="row' + dish.id + '"><td>' + dish.id + '</td>' +
                    '<td>' + dish.dishName + '</td>' +
                    '<td>' + dish.cost + '</td>' +
                    '<td>' + dish.price + '</td>' +
                    '<td><button class="btn btn-danger" onclick="deleteDish(' + dish.id + ');">Delete</button></td></tr>'
                )).draw();
        }
    });

}

//>>> To delete a dish from the database
function deleteDish(id) {
    console.log('dish id: ' + id);
    $.ajax({
        url: "api/dishMaker/" + id,
        type: "DELETE",
        success: function() {
            $("#row" + id).remove();
            alert('Dish removed from database!');
        },
        error: function() {
            alert('ERROR: Not deleted!');
        }
    });
}


//>>>> Dish maker form
function showDishMakerForm() {
    $(".toggleShow").hide();
    $("#dishMakerForm").show();

    $.get("api/ingredientsDb", function(items) {
        console.log(items);
        // $("#listItemsTableBody").empty();
        for (i = 0; i < items.length; i++) {
            const item = items[i];
            $("#addIngredientNameInput").append(
                new Option(item.name, item.id)
            );
        }

        //To dynamically change the unit of the amount based on the item name.
        // let inputAmount = 0;
        // let unitInput = 0;
        $("#addIngredientNameInput").change(function() {
            // console.log('inputAmount BEFORE the for loop: ' + inputAmount);
            // console.log("unit input selected option BEFORE for loop: " + unitInput);

            for (i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.name == $("#addIngredientNameInput option:selected").text()) {
                    switch (item.unit) {
                        case "Kilogram" || "Gram":
                            $("#addIngredientAmountUnitPresentation").text('');
                            $("#addIngredientAmountUnitPresentation").append('<option>Gram</option>' +
                                '<option>Kilogram</option>'
                            );
                            // inputAmount = $("#addIngredientAmountInput").val();
                            // unitInput = $("#addIngredientAmountUnitPresentation option:selected").text();
                            // unitConverter(inputAmount, item.unit, unitInput);
                            // console.log("input Amount after the function: " + inputAmount);
                            // console.log("item unit: " + item.unit);
                            break;

                        case "Liter":
                            $("#addIngredientAmountUnitPresentation").text('');
                            $("#addIngredientAmountUnitPresentation").append('<option>MilliLiter</option>' +
                                '<option>Liter</option>'
                            );
                            // unitConverter(inputAmount, item.unit, unitInput);
                            break;

                        case "Stuk":
                            $("#addIngredientAmountUnitPresentation").text('');
                            $("#addIngredientAmountUnitPresentation").append("<option>Stuk</option>");
                            break;
                    }

                    console.log(item);
                }
            }
        });


        //To sum up the total amount of ingredients
        $("#addIngredientAddButton").click(listIngredientToDish);
        let totalCostCalculated = 0;
        let sellingPrice = 0;

        function listIngredientToDish() {
            let ingredientAmount = $("#addIngredientAmountInput").val();
            let inputUnitOption = $("#addIngredientAmountUnitPresentation option:selected").text();
            console.log('total cost calculated before for: ' + totalCostCalculated);
            console.log('type of totalCostcalculated variable: ' + typeof(totalCostCalculated));

            // dishMakerIngredientsTable.clear().draw();
            for (i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.name == $("#addIngredientNameInput option:selected").text()) {
                    const pricePerUnit = item.cost / item.amount;
                    const pricePerAmount = (unitConverter(ingredientAmount, item.unit, inputUnitOption) / pricePerUnit);
                    console.log("unit converter returned amount: " + unitConverter(ingredientAmount, item.unit, inputUnitOption));

                    dishMakerIngredientsTable.row.add(
                        $(
                            '<tr id="row' + item.id + '"><td>' + item.id + '</td>' +
                            '<td>' + $("#addIngredientNameInput option:selected").text() + '</td>' +
                            '<td>' + ingredientAmount + '</td>' +
                            '<td>' + $("#addIngredientAmountUnitPresentation option:selected").text() + '</td>' +
                            '<td>' + Number(pricePerAmount).toFixed(2) + '</td>' +
                            // '<td>' + unitConverter(ingredientAmount, item.unit, inputUnitOption) + '</td>' +
                            // '<td><button class="btn btn-danger" onclick="removeIngredient(' + (pricePerAmount, sellingPrice) + ');">Remove</button></td></tr>'
                            '<td><button class="btn btn-danger" onclick="removeIngredient(' + item.id + "," + pricePerAmount + ');">Remove</button></td></tr>'
                        )).draw();
                    totalCostCalculated += pricePerAmount;
                    sellingPrice = totalCostCalculated + (totalCostCalculated * ($("#profitMarginInput").val() / 100));
                    console.log('total cost calculated in if statement: ' + totalCostCalculated);
                }
            }
            updateCostAndPrice();
            // $("#totalCostCalculated").text(Math.round(totalCostCalculated * Math.pow(10, 2)) / Math.pow(10, 2));
            // $("#sellingPriceAtSpan").text($("#profitMarginInput").val());
            // $("#sellingPrice").text((Math.round(sellingPrice * Math.pow(10, 2)) / Math.pow(10, 2)));

        }

        //To update the cost and selling price alert box:
        function updateCostAndPrice() {
            $("#totalCostCalculated").text(Math.round(totalCostCalculated * Math.pow(10, 2)) / Math.pow(10, 2));
            $("#sellingPriceAtSpan").text($("#profitMarginInput").val());
            $("#sellingPrice").text((Math.round(sellingPrice * Math.pow(10, 2)) / Math.pow(10, 2)));
            alert('recalculated via updateCostAndPrice method');
        }

        //To convert unit:
        function unitConverter(inputAmount, itemDbUnit, unitInput) {
            if (unitInput == "Kilogram" & itemDbUnit == "Gram") {
                return inputAmount * 1000;
            } else if (unitInput == "Gram" & itemDbUnit == "Kilogram") {
                return inputAmount / 1000;
            } else if (unitInput == "Kilogram") {
                return inputAmount;
            } else if (unitInput == "MilliLiter" & itemDbUnit == "Liter") {
                return inputAmount / 1000;
            } else if (unitInput == "Liter") {
                return inputAmount;
            } else if (unitInput == "Stuk") {
                return inputAmount;
            }

        }



    });
}

// >>>> To remove an ingredient from the dish
function removeIngredient(id) {
    $("#row" + id).remove();
    // totalCostCalculated -= pricePerAmoutOfItem;
    alert('Ingredient removed!');
    console.log("update cost and price function called");
    // $("#sellingPrice").text('');
    // $("#sellingPrice").text((Math.round(sellingPrice * Math.pow(10, 2)) / Math.pow(10, 2)) + " € ");
}

//To clear up the ingredients table:
function clearIngredientForm() {
    dishMakerIngredientsTable.clear().draw();
    $("#newDishName").val('');
    $("#profitMarginInput").val('');
    $("#addIngredientNameInput").val('');
    $("#addIngredientAmountInput").val('');
    $("#totalCostCalculated").text('');
    $("#sellingPrice").text('');
}



//>>> To add the new Dish to the database
function saveNewDishToDb() {
    let newDish = {
        dishName: $("#newDishName").val(),
        cost: $("#totalCostCalculated").text(),
        price: $("#sellingPrice").text()
    }

    let jsonObject = JSON.stringify(newDish);

    $.ajax({
        url: "api/dishMaker",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function() {
            alert('New dish added to Dish of the Day database');
        },
        error: function() {
            alert('ERROR: Could not add the new dish!');
        }
    });
}






//>>>> Stock Management form: To list the stock items
function showListItemsForm() {
    $(".toggleShow").hide();
    $("#listItemsForm").show();

    $.get("api/ingredientsDb", function(items) {
        console.log(listItemsDataTable);
        console.log(items);

        //To clear the contents of the table, this is instead of: $("#listItemsTableBody").empty();
        listItemsDataTable.clear();

        for (i = 0; i < items.length; i++) {
            const item = items[i];

            //To append new row that can be controlled by datatables. This is instead of: $("#listItemsTableBody").append(...)
            listItemsDataTable.row.add(
                $(
                    '<tr id="row' + item.id + '"><td>' + item.id + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.amount + '</td>' +
                    '<td>' + item.unit + '</td>' +
                    '<td>' + item.cost + '</td>' +
                    '<td>' + Number(item.cost / item.amount).toFixed(2) + '</td>' +
                    '<td><button class="btn btn-danger" onclick="deleteItem(' + item.id + ');">Delete</button></td></tr>'
                )).draw();
        }
    });
}

//>>>To delete an item from the Stock Management List
function deleteItem(id) {
    $.ajax({
        url: "api/ingredientsDb/" + id,
        type: "DELETE",
        success: function() {
            $("#row" + id).remove();
            alert('Item removed from database!');
        },
        error: function() {
            alert('ERROR: Not deleted!');
        }
    });
}

//To show the Add Item to the database form:
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
                alert('Item added successfully!');
            },
            error: function() {
                alert('Item could not be added!');
            }
        });
    });
}