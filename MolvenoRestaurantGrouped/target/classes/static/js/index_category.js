var category_id;
var categoryDataTable;
$(document).ready(function() {
  CategoryDataTable = $('#categoryContainer').DataTable({
    ajax: {
      url: 'api/categories',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'description' },

      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><button class="btn btn-danger" categoryid="' + data.id + '">Delete</button></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"> <button class="btn btn-info" categoryid="' + data.id + '">Update</button></a></td>';
        }
      }
    ]
  });

  getCategories();

  // add an event when click on Add Category button

  $('#addCategory').click(function() {
    var name = $('#categoryName').val();
    if (name === '') {
      showAlert('Please fill in Category name', 'error');
    } else {
      addCategory();
    }
  });

  // add event when you click on delete icon
  $('#categoryContainer').on('click', '.btn.btn-danger', function() {
    category_id = $(this).attr('categoryid');
    $('#confirm').show();
  });

  $('#categoryContainer').on('click', '.btn.btn-info', function() {
    category_id = $(this).attr('categoryid');
    var name = event.target.parentNode.parentElement.parentNode.children[1].innerHTML;
    var description = event.target.parentNode.parentElement.parentNode.children[2].innerHTML;
    $('#editName').val(name);
    $('#editDescription').val(description);
    $('#updateModal').show();
  });

  $('.close').click(function() {
    $('.modal').hide();
  });

  $('#updateClose').click(function() {
    $('#updateModal').hide();
  });
  $('#dismissbtn').click(function() {
    $('.modal').hide();
  });

  $('.closeBtn').click(function() {
    $('#confirm').hide();
  });
  $('#save').click(function() {
    updateCategory();
    $('#updateModal').hide();
  });
  $('#closeSmallbtn').click(function() {
    $('#updateModal').hide();
  });
  $('#yesBtn').click(function() {
    deleteCategory();
    $('#confirm').hide();
  });
  $('#closeConfirm').click(function() {
    $('#confirm').hide();
  });

  $('#closeError').click(function() {
    $('#error').hide();
  });

  $('#closeOK').click(function() {
    $('#error').hide();
  });
});

// add category function
function addCategory() {
  var category = {
    name: $('#categoryName').val(),
    description: $('#description').val()
  };

  var jsonObject = JSON.stringify(category);

  $.ajax({
    url: 'api/categories',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      // call a function to clear fields
      clearFields();
      showAlert('A category has been added!', 'success');
      getCategories();
    },
    error: function() {
      showAlert('Invalid input or duplicate name!', 'error');
    }
  });
}

// get categories function
function getCategories() {
  CategoryDataTable.ajax.reload();
}

// update category function
function updateCategory() {
  var category = {
    id: category_id,
    name: $('#editName').val(),
    description: $('#editDescription').val()
  };

  var jsonObject = JSON.stringify(category);

  $.ajax({
    url: 'api/categories/' + category_id,
    type: 'PUT',
    data: jsonObject,
    contentType: 'application/json',
    success: function() {
      showAlert('A category has been updated!', 'success');
      clearFields();
      getCategories();
    },
    error: function() {
      showAlert('Sorry, something went wrong!', 'error');
    }
  });
}

// delete a category function
function deleteCategory() {
  $.ajax({
    url: 'api/categories/' + category_id,
    type: 'DELETE',
    success: function() {
      showAlert('A category has been deleted!', 'success');
      getCategories();
    },
    error: function() {
      showAlert('Sorry, Something wrong went on!', 'error');
    }
  });
}
// clear fields function
function clearFields() {
  $('#categoryName').val('');
  $('#description').val('');
  $('#editName').val('');
  $('#editDescription').val('');
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
  }
  if (myclass === 'success') {
    $('.modal-title').html('');
    $('.modal-title').html('Success');
    $('.modal-header').css('background-color', 'green');
    $('#message').text('');
    $('#message').append(msg);
    $('#error').show();
  }
}
