$(document).ready(function() {
  //  loadCategoryDiv();
  loadCategories();

  // doing the data filter by category name
  $(document).on("click", ".navigation .button", function(e) {
    var name = $(this).attr("data-filter");
    if (name == "all") {
      $(".filter").show(500);
    } else {
      $(".filter")
        .not("." + name)
        .hide(500);
      $(".filter")
        .filter("." + name)
        .show(500);
    }
    e.preventDefault();

  });

  // add event to my order button
  $(document).on("click", ".myOrderBtn", function() {
    var counter = 0;
    var total = 0;
    const totalSpan = document.createElement("span");
    $("input[type=checkbox]").each(function() {
      if (this.checked) {
        counter++;
        var content = this.parentElement.parentElement.children[0].innerText;
        var thePrice = this.parentElement.parentElement.children[1].innerText;
        var theAmount = this.parentElement.parentElement.children[2].children[2]
          .textContent;
        var myPrice = thePrice.replace(/^\D+/g, "");
        total += Number(myPrice) * Number(theAmount);
        addTheOrder(content, myPrice, theAmount);
      }
    });
    totalSpan.append(document.createTextNode("The total cost is: €" + total));
    $(".myOrder").append(totalSpan);
    console.log("The number of Items are " + counter);
    $(".myOrder").show(2000);
    $(".dishesContainer").hide(1000);
  });

  // add event on the icon Plus
  $(document).on("click", ".fa.fa-plus", function(e) {
    var myAmount = Number(e.target.parentElement.children[2].innerHTML) * 1 + 1;
    e.target.parentElement.children[2].innerHTML = myAmount;
    e.preventDefault();
  });

  // add event on the icon Minus
  $(document).on("click", ".fa.fa-minus", function(e) {
    var myAmount = Number(e.target.parentElement.children[2].innerHTML);
    if (myAmount <= 0) {
      myAmount = 0;
    } else {
      myAmount--;
    }
    e.target.parentElement.children[2].innerHTML = myAmount;
    e.preventDefault();
  });
});

// load the categories to the div function
function loadCategories() {
  $.get("api/categories/", function(category) {
    for (var i = 0; i < category.length; i++) {
      const newCategory = document.createElement("a");
      const catId = category[i].id;
      const catName = category[i].name;
      newCategory.setAttribute("href", "#");
      newCategory.setAttribute("class", "button");
      newCategory.setAttribute("data-filter", category[i].name.toLowerCase());
      newCategory.setAttribute("data-value", category[i].id);
      newCategory.innerText = category[i].name.toUpperCase();
      $(".navigation").append(newCategory);
      fetchDishes(catId, catName);
    }
  });
}

// add to the div of the order
function addTheOrder(content, myPrice, theAmount) {
  // $('.myOrder').empty();
  var subPrice = 0;
  const p = document.createElement("p");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const h5 = document.createElement("h5");

  subPrice += Number(myPrice) * Number(theAmount);
  h3.append(content);
  h4.append("€ " + myPrice);
  h5.append("Amount: " + theAmount);
  p.setAttribute("class", "myOrderContent");
  p.append(h3);
  p.append(h4);
  p.append(h5);
  p.append("SubTotal: €" + subPrice);
  $(".myOrder").append(p);
}

// fetching all the items images from database
function fetchDishes(catId, catName) {
  $.get("api/categories/" + catId + "/dishes", function(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].availability) {
        const divFilter = document.createElement("div");
        const divPrice = document.createElement("div");
        const divContent = document.createElement("div");
        const divAmount = document.createElement("div");
        const amountSpan = document.createElement("span");
        const plusIcon = document.createElement("i");
        const minusIcon = document.createElement("i");
        const anchorPlus = document.createElement("a");
        const anchorMinus = document.createElement("a");
        const checkLabel = document.createElement("label");
        plusIcon.setAttribute("class", "fa fa-plus");
        minusIcon.setAttribute("class", "fa fa-minus");
        anchorPlus.setAttribute("href", "#");
        anchorMinus.setAttribute("href", "#");
        checkLabel.setAttribute("class", "checkLabel");
        checkLabel.append("Add");

        // creating the container of checkbox
        ////////////////////////////////////////////////////////////
        const divCheck = document.createElement("div");
        divCheck.setAttribute("class", "check");
        // creating checkbox
        const mycheckbox = document.createElement("input");
        mycheckbox.setAttribute("type", "checkbox");
        mycheckbox.setAttribute("id", "mycheck");
        mycheckbox.setAttribute("text", "addMe");
        // append the checkbox to its container
        divCheck.append(mycheckbox);
        divCheck.append(checkLabel);
        /////////////////////////////////////////////////////////////
        //adding the counter
        amountSpan.setAttribute("id", "counter");
        amountSpan.append(document.createTextNode("0"));
        divAmount.setAttribute("class", "amount");
        divAmount.append(anchorPlus);
        divAmount.append(plusIcon);
        divAmount.append(amountSpan);
        divAmount.append(anchorMinus);
        divAmount.append(minusIcon);

        // adding the content
        const priceHeader = document.createElement("h5");
        const desPar = document.createElement("p");
        const nameHeader = document.createElement("h4");
        divContent.setAttribute("class", "content");

        divPrice.setAttribute("class", "price");
        priceHeader.innerHTML = "€ " + items[i].price;
        divPrice.append(priceHeader);
        desPar.innerHTML = items[i].description;
        nameHeader.style.color = "#fff";
        nameHeader.innerHTML = items[i].name + "-  " + items[i].size;
        divContent.append(nameHeader);
        divContent.append(desPar);

        divFilter.setAttribute("class", "filter " + catName.toLowerCase());
        divFilter.style.display = "none";
        divFilter.append(divContent);
        divFilter.append(divPrice);
        divFilter.append(divAmount);
        divFilter.append(divCheck);

        $(".dishesContainer").append(divFilter);
      }
    }
  });
}
