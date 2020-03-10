var dishMakerIngredientsTable;

$(document).ready(function() {
    $("#dishMakerMainButton").click(showDishMakerForm);
    $("#restartNewDishButton").click(clearIngredientForm);
    $("#dishMakerSaveDishButton").click(saveNewDishToDb);
    $(".toggleShow").hide();
    $("#mainWindowAndButtons").show();
    dishMakerIngredientsTable = $('#dishMakerIngredientsTable').DataTable();

});


//>>>> Dish maker form
function showDishMakerForm() {

    $(".toggleShow").hide();
    $("#dishMakerForm").show();

    //To collect the list of ingredients from DB and showing it in the dropdown menu:
    $.get("api/ingredientsDb", function(items) {
        console.log(items);
        for (i = 0; i < items.length; i++) {
            const item = items[i];
            $("#addIngredientNameInput").append(
                new Option(item.name, item.id)
            );
        }

        //To dynamically change the unit of the amount based on the item name.
        $("#addIngredientNameInput").change(function() {
            for (i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.name == $("#addIngredientNameInput option:selected").text()) {
                    switch (item.unit) {
                        case "Kilogram" || "Gram":
                            $("#addIngredientAmountUnitPresentation").text('');
                            $("#addIngredientAmountUnitPresentation").append('<option>Gram</option>' +
                                '<option>Kilogram</option>'
                            );
                            break;

                        case "Liter":
                            $("#addIngredientAmountUnitPresentation").text('');
                            $("#addIngredientAmountUnitPresentation").append('<option>MilliLiter</option>' +
                                '<option>Liter</option>'
                            );
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
        let pricePerAmount = 0;

        function listIngredientToDish() {
            let ingredientAmount = $("#addIngredientAmountInput").val();
            let inputUnitOption = $("#addIngredientAmountUnitPresentation option:selected").text();
            let inputIngredientName = $("#addIngredientNameInput option:selected").text();

            //To access item properties from its id:
            for (i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.name == inputIngredientName) {
                    //Calculate the price per unit from the db:
                    const pricePerUnit = item.cost / item.amount;
                    //Calculate the price per the dish-specific amount:
                    pricePerAmount = (unitConverter(ingredientAmount, item.unit, inputUnitOption) * pricePerUnit);

                    dishMakerIngredientsTable.row.add(
                        $(
                            '<tr id="row' + item.id + '"><td>' + item.id + '</td>' +
                            '<td>' + inputIngredientName + '</td>' +
                            '<td>' + ingredientAmount + '</td>' +
                            '<td>' + inputUnitOption + '</td>' +
                            '<td>' + (Math.round(pricePerAmount * Math.pow(10, 2)) / Math.pow(10, 2)) + '</td>' +
                            '<td><button class="btn btn-danger" onclick="removeIngredient(' + item.id + "," + pricePerAmount + ');">Remove</button></td></tr>'
                            // '<td><button class="btn btn-danger delete" priceperamount="' + pricePerAmount + '">Remove</button></td></tr>'
                        )).draw();

                    totalCostCalculated += pricePerAmount;
                    sellingPrice = totalCostCalculated + (totalCostCalculated * ($("#profitMarginInput").val() / 100));
                }
            }
            updateCostAndPrice();
            $("#addIngredientNameInput").val('');
            $("#addIngredientAmountInput").val('');

        }

        //To update the cost and selling price alert box:
        function updateCostAndPrice() {
            $("#totalCostCalculated").text(Math.round(totalCostCalculated * Math.pow(10, 2)) / Math.pow(10, 2));
            $("#sellingPriceAtSpan").text($("#profitMarginInput").val());
            $("#sellingPrice").text((Math.round(sellingPrice * Math.pow(10, 2)) / Math.pow(10, 2)));
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
function removeIngredient(id, pricePerAmountOfItem) {
    console.log(pricePerAmountOfItem);
    let totalRecalculated = 0;
    // dishMakerIngredientsTable.row($(this).parents('tr')).remove().draw();
    $("#row" + id).remove();
    let totalCostCalculated = Number($("#totalCostCalculated").text());
    totalCostCalculated -= pricePerAmountOfItem;
    totalRecalculated = totalCostCalculated;
    totalCostCalculated = 0;
    $("#totalCostCalculated").text(totalRecalculated);

    alert('Ingredient removed!');
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
        price: $("#sellingPrice").text(),
        // ingredients: [{
        //     id: ,
        //     name: ,
        //     amount: ,
        //     unit: ,
        //     cost:
        // }]
    }

    let jsonObject = JSON.stringify(newDish);

    $.ajax({
        url: "api/dishMaker",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function() {
            $("#saveDishModal").modal('hide');
            alert('New dish added to Dish of the Day database');
        },
        error: function() {
            alert('ERROR: Could not add the new dish!');
        }
    });
}