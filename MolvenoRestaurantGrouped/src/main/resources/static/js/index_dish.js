var dish_id;
var category_id;
var dishDataTable;
$(document).ready(function() {
    // retrieve the categories to the select control
    retrivecategories();

    // create datatable
    dishDataTable = $('#dishContainer').DataTable({
        ajax: {
            url: 'api/categories/' + $('#categoryName').val() + '/dishes',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'description' },
            { data: 'price' },
            { data: 'availability' },
            { data: 'size' },
            { data: 'category.name' },

            {
                data: null,
                render: function(data, type, row) {
                    return (
                        '<td><a href="#"><button class="btn btn-danger" categoryid="' +
                        data.category.id +
                        '"dishid="' +
                        data.id +
                        '">Delete</button></a></td>'
                    );
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return (
                        '<td><a href="#"><button class="btn btn-info" categoryid="' +
                        data.category.id +
                        '"dishid="' +
                        data.id +
                        '">Update</button></a></td>'
                    );
                }
            }
        ]
    });

    $('.dataTables_filter').addClass('pull-left');
    // add an event on add dish button
    $('#addDish').click(function() {
        var name = $('#dishName').val();
        var price = $('#price').val();
        var categoryName = $('#categoryName option:selected').text();

        if (name === '' || price === '' || categoryName === '') {
            showAlert('Please fill in the required data', 'error');
        } else {
            addDish();
        }
    });

    // add event when category change
    $('#categoryName').change(function() {
        getAllDishesByCategory();
    });

    // add event when you click on delete icon
    $('#dishContainer').on('click', '.btn.btn-danger', function() {
        dish_id = $(this).attr('dishid');
        category_id = $(this).attr('categoryid');
        $('#confirm').show();
    });

    $('#dishContainer').on('click', '.btn.btn-info', function() {
        dish_id = $(this).attr('dishid');
        category_id = $(this).attr('categoryid');
        var name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
        var description = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
        var price = event.target.parentNode.parentElement.parentElement.children[3].innerHTML;
        var availability = event.target.parentNode.parentElement.parentElement.children[4].innerHTML;
        var size = event.target.parentNode.parentElement.parentElement.children[5].innerHTML;
        var categoryEditName = event.target.parentNode.parentElement.parentElement.children[6].innerHTML;

        // assign values to the edit input
        $('#editName').val(name);
        $('#editDescription').val(description);
        $('#editPrice').val(price);
        $('#editavailability').val(availability);
        $('#editSize').val(size);
        $('#updateModal').show();
    });

    $('.close').click(function() {
        $('.modal').hide();
    });

    $('#dismissbtn').click(function() {
        $('.modal').hide();
    });

    $('#save').click(function() {
        updateDish();
        $('#updateModal').hide();
    });

    $('#closeError').click(function() {
        $('#error').hide();
    });
    $('#closeOK').click(function() {
        $('#error').hide();
    });
    $('.closeBtn').click(function() {
        $('#confirm').hide();
    });
    $('#yesBtn').click(function() {
        deleteDish();
        $('#confirm').hide();
    });
    $('#closeConfirm').click(function() {
        $('#confirm').hide();
    });
});

// add dish data function
function addDish() {
    var dish = {
        name: $('#dishName').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        size: $('#size').val(),
        availability: $('#availability option:selected').val(),
        category: {
            id: $('#categoryName option:selected').val()
        }
    };

    var jsonObject = JSON.stringify(dish);

    $.ajax({
        url: 'api/categories/' + $('#categoryName option:selected').val() + '/dishes',
        type: 'POST',
        contentType: 'application/json',
        data: jsonObject,
        success: function() {
            showAlert('A Dish is Added', 'success');
            // call a function to clear fields
            clearFields();
            getDishes();
        },
        error: function() {
            showAlert('Invalid input or duplicate name!', 'error');
        }
    });
}

// get all dishes by category name function
function getDishes() {
    dishDataTable.ajax.reload();
}

// update dish data function
function updateDish() {
    var dish = {
        id: dish_id,
        name: $('#editName').val(),
        description: $('#editDescription').val(),
        price: $('#editPrice').val(),
        availability: $('#editavailability').val(),
        size: $('#editSize').val(),
        category: {
            id: $('#categoryName option:selected').val()
        }
    };

    var jsonObject = JSON.stringify(dish);

    $.ajax({
        url: 'api/categories/' + category_id + '/dishes/' + dish_id,
        type: 'PUT',
        data: jsonObject,
        contentType: 'application/json',
        success: function() {
            showAlert('A Dish is Upated', 'success');
            getDishes($('#categoryName option:selected').val());
            clearFields();
        },
        error: function() {
            showAlert('Sorry, something went wrong!', 'error');
        }
    });
}
// delete dish function
function deleteDish() {
    $.ajax({
        url: 'api/categories/' + category_id + '/dishes/' + dish_id,
        type: 'DELETE',
        success: function() {
            showAlert('A Dish is Deleted!', 'success');
            getDishes();
        },
        error: function() {
            showAlert('Sorry, Something wrong went on!', 'error');
        }
    });
}

// clear fields function
function clearFields() {
    $('#dishName').val('');
    $('#price').val('');
    $('#description').val('');
    // $("#categoryName").prop('selectedIndex', 0);
    $('#size').val('');
    $('#availability').prop('selectedIndex', 0);

    // clear edit fields
    $('#editName').val();
    $('#editDescription').val();
    $('#editPrice').val();
    $('#editavailability').val();
    $('#editSize').val();
}
// retrive categories to the select controller function
function retrivecategories() {
    $.get('api/categories', function(category) {
        if (category) {
            $('#categoryName').empty();
            $('#categoryEditName').empty();
            var select = document.getElementById('categoryName');
            var select2 = document.getElementById('categoryEditName');
            select.append(new Option());
            for (var i = 0; i < category.length; i++) {
                select.append(new Option(`${category[i].name}`, `${category[i].id}`));
                select2.append(new Option(`${category[i].name}`, `${category[i].id}`));
            }
        }
    });
}

// retirve all the dishes

function getAllDishes() {
    var counter = 0;
    $('#dishContainer').empty();
    $.get('api/categories/dishes', function(dishes) {
        for (var i = 0; i < dishes.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `
        <td>${dishes[i].id}</td>
        <td>${dishes[i].name}</td>
        <td>${dishes[i].description}</td>
        <td>${dishes[i].price}</td>
        <td>${dishes[i].availability}</td>
        <td>${dishes[i].size}</td>
        <td>${dishes[i].category.name}</td>
        <td><a href="#"><i class="fas fa-trash-alt"></i></a></td>
        <td><a href="#"><i class="fas fa-edit"></i></a></td>
        `;
            $('#dishContainer').append(row);
            counter++;
        }
        $('.counterlabel').empty();
        $('.counterlabel').append(counter + ' Dish(s)');
    });
}

function getAllDishesByCategory() {
    var categoryId = $('#categoryName').val();
    $.get('api/categories/' + categoryId + '/dishes', function(dishes) {
        dishDataTable.clear().draw();
        for (var i = 0; i < dishes.length; i++) {
            const row = dishes[i];
            dishDataTable.row
                .add(
                    $(
                        '<tr id="row' +
                        row.id +
                        '"><td> ' +
                        row.id +
                        '</td>' +
                        '<td>' +
                        row.name +
                        '</td>' +
                        '<td>' +
                        row.description +
                        '</td>' +
                        '<td>' +
                        row.price +
                        '</td>' +
                        '<td>' +
                        row.availability +
                        '</td>' +
                        '<td>' +
                        row.size +
                        '</td>' +
                        '<td>' +
                        row.category.name +
                        '</td>' +
                        '<td><a href="#"><button class="btn btn-danger" categoryid="' +
                        row.category.id +
                        '"dishid="' +
                        row.id +
                        '">Delete</button></a></td>' +
                        '<td><a href="#"><button class="btn btn-info" categoryid="' +
                        row.category.id +
                        '"dishid="' +
                        row.id +
                        '">Update</button></a></td></tr>'
                    )
                )
                .draw();
        }
    });
}
//show alert function
function showAlert(msg, myclass) {
    if (myclass === 'error') {
        $('.modal-title').html('');
        $('.modal-title').html('Error');
        $('.modal-header').css('background-color', 'red');
        $('#error').show();
        $('#message').text('');
        $('#message').append(msg);
    } else {
        $('.modal-title').html('');
        $('.modal-title').html('Success');
        $('.modal-header').css('background-color', 'green');
        $('#message').text('');
        $('#message').append(msg);
        $('#error').show();
    }
}