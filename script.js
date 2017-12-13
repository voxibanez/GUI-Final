/*
Name: Tim Barber, Timothy_Barber@student.uml.edu
Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
File: /usr/cs/undergrad/2018/tbarber/public_html/Midterm/script.js Created: 23-oct-2017
*/

var cars = [];
var carIter = 0;

function bake_cookie() {
  //var newCookie = ["carCookie", '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  //document.cookie = document.cookie + newCookie;
  //document.cookie = newCookie;
  if (cars == undefined || cars.length < 1) {
    $.cookie("carCookie", "");
    return;
  }
  var src = JSON.stringify(cars);
  $.cookie("carCookie", src);


}

function read_cookie() {
  var cookie = $.cookie("carCookie");
  var carCookie = eval(cookie);
  if (carCookie == undefined) {
    return;
  }
  for (i = 0; i < carCookie.length; i++) {
    carCookie[i].expanded = false;
    carCookie[i].editing = false;
    updateLastOilChange(carCookie[i]);
    carCookie[i].UID = "car" + i;
    addCarModule(carCookie[i]);
    cars.push(carCookie[i]);
    carIter = carIter + 1;
  }
}

//Adds a car object to the cars array
function addCar(year, make, model, trim, nickname, milage, estMilage, oilWeight, oilType, lastOilChange) {

  var temp = new carModule("car" + carIter)
  temp.carYear = year;
  temp.carMake = capitalizeFirstLetter(make);
  temp.carModel = model;
  temp.carTrim = trim;
  if (!isNaN(nickname)) {
    temp.title = nickname;
  } else {
    temp.title = year + " " + make + " " + model;
  }
  if (!isNaN(milage)) {
    temp.carMilage = milage;
  } else {
    temp.carMilage = 0;
  }
  if (!isNaN(milage)) {
    temp.carEstMilage = estMilage;
  } else {
    temp.carEstMilage = 10000;
  }
  temp.oilWeight = oilWeight;
  temp.oilType = oilType;
  temp.lastOilChange = lastOilChange;
  updateLastOilChange(temp);
  addCarModule(temp);
  //Push module into array
  cars.push(temp);
  //Write array to home screen
  bake_cookie();
  carIter = carIter + 1;
}

//Class for lease module
function carModule(UID) {
  this.markForRemoval = false;

  //Uid to identify the module in the HTML
  this.UID = UID;

  //Title for module
  this.title = "";
  //this.title.className = "moduleTitle";


  //this.imageURL = "http://www.udriveit.com.au/wp-content/uploads/2016/04/placeholder-350x205.gif";
  //this.imageURL = "https://i.forbesimg.com/images/2002/01/21/test_side_415x277.jpg"
  //Car Year
  this.carYear = "";

  //Car Make
  this.carMake = "";

  //Car Model
  this.carModel = "";

  //Car Trim
  this.carTrim = "";

  //Car Milage
  this.carMilage = "";

  //Car estimated Milage
  this.carEstMilage = "";

  //Car Oil Weight
  this.oilWeight = "";

  //Car Oil Type
  this.oilType = "";

  this.lastOilChange = "";

  this.needsOilChange = false;

  this.expanded = false;

  this.editing = false;


}

function updateLastOilChange(mod) {
  mod.needsOilChange = false;
  if (!isNaN(Date.parse(mod.lastOilChange))) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var last = new Date(mod.lastOilChange);
    var d1Y = now.getFullYear();
    var d2Y = last.getFullYear();
    var d1M = now.getMonth();
    var d2M = last.getMonth();

    var res = Math.abs((d2M + 12 * d2Y) - (d1M + 12 * d1Y));
    if (res >= 6) {
      mod.needsOilChange = true;
    }

  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addCarModule(mod) {
  //Make sure the placeholder is hidden when adding a module for the first time
  document.getElementById('NothingHere').style.visibility = 'hidden';
  var searchEles = document.getElementById("Modules").children;

  //Create the module div

  var mainDiv = document.createElement("div");

  mainDiv.className = "module";

  mainDiv.id = mod.UID;


  //Set up the clickable DIV
  var button = document.createElement("div");
  var textDiv = document.createElement("div");
  var secondaryText = document.createElement("label");
  var secondTextDiv = document.createElement("div");
  secondaryText.innerHTML = "Est Milage: " + mod.carMilage;
  if (mod.needsOilChange) {
    secondaryText.innerHTML = secondaryText.innerHTML + "<br>Need Oil Change";
  }
  secondTextDiv.appendChild(secondaryText);
  secondTextDiv.style.display = 'none';
  textDiv.innerHTML = mod.title;
  searchImage(mod.carYear + "," + mod.carMake.replace(/[ ,]+/g, ",") + "," + mod.carModel.replace(/[ ,]+/g, ","), function(data) {
    $.each(data.items, function(i, item) {
      button.style.backgroundImage = "url(" + item.media.m + ")";
      return;
    })
  });
  //button.style.backgroundImage = "url(" + mod.imageURL + ")";
  textDiv.appendChild(secondTextDiv);
  button.appendChild(textDiv);
  button.className = "carbtn";
  button.id = "btn";
  if (mod.needsOilChange) {
    button.style.border = "thick solid red";
  } else {
    button.style.border = "";
  }
  button.onmouseover = function() {
    secondTextDiv.className = "secondaryTextModuleFadeIn";
    secondTextDiv.style.display = '';
  }
  button.onmouseleave = function() {
    setTimeout(function() {
      secondTextDiv.style.display = 'none';
    }, 300);
    secondTextDiv.className = "secondaryTextModuleFadeOut";
  }
  button.onclick = function() {
    //If already expanded dont do it again
    if (mod.expanded) {
      return;
    }
    document.getElementById("addCarBtn").className = "dropbtnFadeOut";
    document.getElementById('addCarBtn').style.visibility = 'hidden';
    mod.expanded = true;
    textDiv.className = "moduleTextFadeOut";
    button.className = "carbtnEXPAND";
    var width = window.innerWidth - 100 + "px";
    var height = window.innerHeight - 200 + "px";
    button.style.width = width;
    button.style.height = height;
    var searchEles = document.getElementById("Modules").children;
    for (var i = 0; i < searchEles.length; i++) {
      if (searchEles[i].id != mod.UID) {
        var searchEles1 = searchEles[i].childNodes;
        for (var j = 0; j < searchEles1.length; j++) {
          searchEles1[j].style.width = "0px";
          searchEles1[j].style.height = "0px";
        }

      }
    }

    setTimeout(function() {
      textDiv.style.display = 'none';
      var searchEles = document.getElementById("Modules").children;
      for (var i = 0; i < searchEles.length; i++) {
        if (searchEles[i].id != mod.UID) {
          searchEles[i].style.display = 'none'
        }
      }
      expandCarModule(mod, button, textDiv, secondTextDiv, secondaryText)
    }, 300);
  }
  mainDiv.appendChild(button);

  //Append mainDiv to Modules div
  document.getElementById("Modules").appendChild(mainDiv);
}

function expandCarModule(mod, button, textDiv, secondTextDiv, secondaryText) {

  //Disable the clicking and hovering functionality for now
  var mouseLeaveBack = button.onmouseleave;
  var mouseOverBack = button.onmouseover;
  var mouseClickBack = button.onclick;
  button.onmouseover = function() {}
  button.onmouseleave = function() {}
  button.onclick = function() {}
  //Create the module div
  var mainDiv = document.createElement("div");

  mainDiv.id = mod.UID + "details";
  mainDiv.className = "detailsPageFadeIn"

  var readDiv = document.createElement("div");
  var writeDiv = document.createElement("div");
  writeDiv.style.display = "none";
  deleteButton = document.createElement("IMG");
  deleteButton.src = "Images/delete.svg";
  deleteButton.className = "deleteButton";
  deleteButton.onclick = function() {
    document.getElementById("addCarBtn").className = "dropbtnFadeIn";
    document.getElementById('addCarBtn').style.visibility = 'visible';
    mainDiv.className = "detailsPageFadeOut"
    button.className = "carbtn";
    button.style.width = "0px";
    button.style.height = "0px";
    setTimeout(function() {
      var searchEles = document.getElementById("Modules").children;
      for (var i = 0; i < searchEles.length; i++) {
        if (searchEles[i].id == mod.UID) {
          searchEles[i].outerHTML = ""
        }
      }
      const index = cars.indexOf(mod);
      cars.splice(index, 1);
      if (cars.length < 1) {
        document.getElementById('NothingHere').style.visibility = 'visible';
        document.getElementById('NothingHere').style.display = '';
      }
      bake_cookie();
    }, 300);
    var searchEles = document.getElementById("Modules").children;
    for (var i = 0; i < searchEles.length; i++) {
      if (searchEles[i].id != mod.UID) {
        searchEles[i].style.display = '';
        searchEles[i].className = 'moduleFadeIn';
      }
    }

    setTimeout(function() {
      var searchEles = document.getElementById("Modules").children;
      for (var i = 0; i < searchEles.length; i++) {
        if (searchEles[i].id != mod.UID) {
          var searchEles1 = searchEles[i].childNodes;
          for (var j = 0; j < searchEles1.length; j++) {
            searchEles1[j].style.width = "";
            searchEles1[j].style.height = "";
          }
        }
      }
    }, 50);
    setTimeout(function() {
      button.onclick = mouseClickBack;
      textDiv.style.display = '';
      secondTextDiv.style.display = 'none';
      secondTextDiv.className = "secondaryTextModuleFadeIn";
      textDiv.className = "moduleTextFadeIn";
      mainDiv.outerHTML = "";
      delete mainDiv;
      mod.expanded = false;
    }, 200);

  }
  //Close button for module
  closeButton = document.createElement("IMG");
  closeButton.src = "Images/back_button.jpg";
  closeButton.className = "closeButton";

  //Close Button OnClick method
  closeButton.onclick = function() {
    if (mod.editing) {
      mod.title = titleEdit.value;
      mod.carMilage = carMilageEdit.value;
      mod.carEstMilage = carEstMilageEdit.value;
      mod.oilWeight = oilWeightEdit.options[oilWeightEdit.selectedIndex].text;
      mod.oilType = oilTypeEdit.options[oilTypeEdit.selectedIndex].text;
      mod.lastOilChange = lastOilChangeEdit.value;
      secondaryText.innerHTML = "Est Milage: " + mod.carMilage;
      if (mod.needsOilChange) {
        secondaryText.innerHTML = secondaryText.innerHTML + "<br>Need Oil Change";
      }
      if (mod.title == "") {
        mod.title = mod.carYear + " " + mod.carMake + " " + mod.carModel;
      }
      textDiv.innerHTML = mod.title;
      textDiv.appendChild(secondTextDiv);

      //Update read-only fields
      titleLabel.innerHTML = mod.title;
      carMilageLabel.innerHTML = mod.carMilage;
      carEstMilageLabel.innerHTML = mod.carEstMilage;
      oilTypeLabel.innerHTML = mod.oilType;
      oilWeightLabel.innerHTML = mod.oilWeight;
      updateLastOilChange(mod);
      bake_cookie();

      //Hide edit, show read only
      readDiv.style.display = "";
      writeDiv.style.display = "none";
    }
    mod.editing = false;
    mainDiv.className = "detailsPageFadeOut"
    button.className = "carbtn";
    button.onclick = "";
    button.onmouseover = mouseOverBack;
    button.onmouseleave = mouseLeaveBack;
    button.style.width = "";
    button.style.height = "";
    document.getElementById("addCarBtn").className = "dropbtnFadeIn";
    document.getElementById('addCarBtn').style.visibility = 'visible';
    var searchEles = document.getElementById("Modules").children;
    for (var i = 0; i < searchEles.length; i++) {
      if (searchEles[i].id != mod.UID) {
        searchEles[i].style.display = '';
        searchEles[i].className = 'moduleFadeIn';
      }
    }

    setTimeout(function() {
      var searchEles = document.getElementById("Modules").children;
      for (var i = 0; i < searchEles.length; i++) {
        if (searchEles[i].id != mod.UID) {
          var searchEles1 = searchEles[i].childNodes;
          for (var j = 0; j < searchEles1.length; j++) {
            searchEles1[j].style.width = "";
            searchEles1[j].style.height = "";
          }
        }
      }
    }, 50);
    setTimeout(function() {
      textDiv.style.display = '';
      secondTextDiv.style.display = 'none';
      secondTextDiv.className = "secondaryTextModuleFadeIn";
      textDiv.className = "moduleTextFadeIn";
      mainDiv.outerHTML = "";
      delete mainDiv;
      button.onclick = mouseClickBack;
      mod.expanded = false;
    }, 100);

  }

  //
  //read section
  //
  editButton = document.createElement("IMG");
  editButton.src = "Images/edit.png";
  editButton.className = "deleteButton";
  editButton.onclick = function() {
    if (!mod.editing) {
      mod.editing = true;
      readDiv.style.display = "none";
      writeDiv.style.display = "";
      mod.editing = true;
      return;
    }
    if (mod.editing) {
      mod.title = titleEdit.value;
      mod.carMilage = carMilageEdit.value;
      mod.carEstMilage = carEstMilageEdit.value;
      mod.oilWeight = oilWeightEdit.options[oilWeightEdit.selectedIndex].text;
      mod.oilType = oilTypeEdit.options[oilTypeEdit.selectedIndex].text;
      mod.lastOilChange = lastOilChangeEdit.value;
      secondaryText.innerHTML = "Est Milage: " + mod.carMilage;
      if (mod.needsOilChange) {
        secondaryText.innerHTML = secondaryText.innerHTML + "<br>Need Oil Change";
      }
      if (mod.title == "") {
        mod.title = mod.carYear + " " + mod.carMake + " " + mod.carModel;
      }
      textDiv.innerHTML = mod.title;
      textDiv.appendChild(secondTextDiv);

      //Update read-only fields
      titleLabel.innerHTML = mod.title;
      carMilageLabel.innerHTML = mod.carMilage;
      carEstMilageLabel.innerHTML = mod.carEstMilage;
      oilTypeLabel.innerHTML = mod.oilType;
      oilWeightLabel.innerHTML = mod.oilWeight;
      updateLastOilChange(mod);

      bake_cookie();

      //Hide edit, show read only
      readDiv.style.display = "";
      writeDiv.style.display = "none";
      if (!isNaN(Date.parse(mod.lastOilChange))) {
        var oilDate = new Date(mod.lastOilChange);
        oilDate.setMonth(oilDate.getMonth() + 6);
        if (mod.needsOilChange) {
          nextOilChange.style.color = "red";
        } else {
          nextOilChange.style.color = "white";
        }
        nextOilChange.innerHTML = oilDate.toLocaleDateString("en-US");
      }
      if (isNaN(Date.parse(mod.lastOilChange))) {
        tempDiv.visibility = "hidden"
      } else {
        tempDiv.visibility = "visible"
      }
      mod.editing = false;
      return;
    }
  }
  //Title
  var titleLabel = document.createElement("Label");
  titleLabel.innerHTML = mod.title;
  readDiv.appendChild(titleLabel);
  mainDiv.appendChild(closeButton);
  mainDiv.appendChild(deleteButton);
  mainDiv.appendChild(editButton);
  var tempDiv = document.createElement("div");

  readDiv.appendChild(tempDiv);
  //Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Milage: ";
  tempDiv.appendChild(MSRPLabel);
  var carMilageLabel = document.createElement("Label");
  carMilageLabel.innerHTML = mod.carMilage;
  tempDiv.appendChild(carMilageLabel);
  readDiv.appendChild(tempDiv);

  //Est Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Estimated Yearly Milage: ";
  tempDiv.appendChild(MSRPLabel);
  var carEstMilageLabel = document.createElement("Label");
  carEstMilageLabel.innerHTML = mod.carEstMilage;
  tempDiv.appendChild(carEstMilageLabel);
  readDiv.appendChild(tempDiv);

  //Oil Type
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Oil Type: ";
  var oilTypeLabel = document.createElement("Label");
  oilTypeLabel.innerHTML = mod.oilType;
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(oilTypeLabel);
  readDiv.appendChild(tempDiv);

  //Oil Weight
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  var oilWeightLabel = document.createElement("Label");
  oilWeightLabel.innerHTML = mod.oilWeight;
  MSRPLabel.innerHTML = "Oil Weight: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(oilWeightLabel);
  readDiv.appendChild(tempDiv);

  //Next Oil Change

  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Next Oil Change: ";
  var oilDate = new Date(mod.lastOilChange);
  var nextOilChange = document.createElement("Label");
  oilDate.setMonth(oilDate.getMonth() + 6)
  nextOilChange.innerHTML = oilDate.toLocaleDateString("en-US");
  if (mod.needsOilChange) {
    nextOilChange.style.color = "red";
  } else {
    nextOilChange.style.color = "white";
  }
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(nextOilChange);
  if (isNaN(Date.parse(mod.lastOilChange))) {
    tempDiv.style.visibility = "hidden"
  } else {
    tempDiv.style.visibility = "visible"
  }
  readDiv.appendChild(tempDiv);

  //
  //Write section
  //
  //Title
  var titleEdit = document.createElement("input");
  titleEdit.className = "title";
  titleEdit.value = mod.title;
  writeDiv.appendChild(titleEdit);
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  writeDiv.appendChild(tempDiv);
  //Milage
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Milage: ";
  MSRPLabel.className = "editText";
  var carMilageEdit = document.createElement("input");
  carMilageEdit.value = mod.carMilage;
  carMilageEdit.className = "editBox";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(carMilageEdit);
  writeDiv.appendChild(tempDiv);

  //Est Milage
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Estimated Yearly Milage: ";
  MSRPLabel.className = "editText";
  var carEstMilageEdit = document.createElement("input");
  carEstMilageEdit.value = mod.carEstMilage;
  carEstMilageEdit.className = "editBox";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(carEstMilageEdit);
  writeDiv.appendChild(tempDiv);

  //Oil Type
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  var MSRPLabel = document.createElement("Label");
  var oilTypeEdit = document.createElement("select");
  oilTypeEdit.value = mod.oilType;
  oilTypeEdit.className = "editBox";
  MSRPLabel.innerHTML = "Oil Type: ";
  var oilTypes = "Conventional,Blend,Synthetic";
  var array = oilTypes.split(',');
  array.forEach(function(item) {
    var option = document.createElement("option");
    option.text = item;
    oilTypeEdit.add(option);
  })
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(oilTypeEdit);
  writeDiv.appendChild(tempDiv);

  //Oil Weight
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  var MSRPLabel = document.createElement("Label");
  var oilWeightEdit = document.createElement("select");
  var oilWeights = "0W-20,5W-20,10W-20,0W-30,5W-30,10W-30,0W-40,5W-40,10W-40,0W-50,5W-50,10W-50";
  var array = oilWeights.split(',');
  array.forEach(function(item) {
    var option = document.createElement("option");
    option.text = item;
    oilWeightEdit.add(option);
  })
  oilWeightEdit.value = mod.oilWeight;
  oilWeightEdit.className = "editBox";
  MSRPLabel.innerHTML = "Oil Weight: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(oilWeightEdit);
  writeDiv.appendChild(tempDiv);

  //Next Oil Change
  var tempDiv = document.createElement("div");
  tempDiv.style.padding = "5px 0px";
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Last Oil Change: ";
  MSRPLabel.className = "editText";
  var lastOilChangeEdit = document.createElement("input");
  lastOilChangeEdit.type = "text";
  lastOilChangeEdit.className = "editBox";
  lastOilChangeEdit.value = mod.lastOilChange;
  lastOilChangeEdit.id = "carDate";
  $(function() {
    $(lastOilChangeEdit).datepicker();
  });
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(lastOilChangeEdit);
  writeDiv.appendChild(tempDiv);


  writeDiv.appendChild(tempDiv);




  //Append all child divs to mainDiv
  mainDiv.appendChild(readDiv);
  mainDiv.appendChild(writeDiv);
  button.appendChild(mainDiv);

  //Hide modules when displaying details
  //document.getElementById('Modules').style.display = 'none';
  //document.getElementById('carDetails').style.display = '';

  //Append mainDiv to Modules div
  //document.getElementById("carDetails").innerHTML = "";
  //document.getElementById("carDetails").appendChild(mainDiv);
}

function showAddCar() {
  //Make sure the placeholder is hidden when adding a module for the first time
  document.getElementById("addCarBtn").className = "dropbtnFadeOut";
  document.getElementById('addCarBtn').style.visibility = 'hidden';
  document.getElementById('AddCar').className = 'FormFadeIn';
  document.getElementById('Modules').style.display = 'none';
  document.getElementById('Title').style.display = 'none';
  document.getElementById('NothingHere').style.display = 'none';
  document.getElementById('AddCar').style.display = '';

  document.forms["tableForm"]["milage"].value = "";
  document.forms["tableForm"]["estMilage"].value = "";
}

//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var year = document.forms["tableForm"]["carYear"].value;
  var make = document.forms["tableForm"]["carMake"].value;
  var model = document.forms["tableForm"]["carModel"].value;
  var trim = document.forms["tableForm"]["carModelTrim"].value;

  var milage = parseFloat(document.forms["tableForm"]["milage"].value);
  var estMilage = parseFloat(document.forms["tableForm"]["estMilage"].value);

  var oilWeight = "5W-20";
  var oilType = "Synthetic";
  var lastOilChange = document.forms["tableForm"]["lastOilChange"].value;

  //Check to make sure no numbers are less than 0
  if (milage < 0) {
    alert("Milage cannot be less than 0");
    return false;
  }
  if (estMilage < 0) {
    alert("Milage Price cannot be less than 0");
    return false;
  }


  //Create new module
  addCar(year, make, model, trim, year + " " + make + " " + model, milage, estMilage, oilWeight, oilType, lastOilChange);

  cancelAddCar();
  //This is so the page doesn't refresh on submit
  return false;
}

//Cancels the add page and goes back to the homepage
function cancelAddCar() {
  document.getElementById("addCarBtn").className = "dropbtnFadeIn";
  document.getElementById('addCarBtn').style.visibility = 'visible';
  document.getElementById('AddCar').className = 'FormFadeOut';
  setTimeout(function() {
    document.getElementById('Modules').style.display = '';
    document.getElementById('AddCar').style.display = 'none';
    document.getElementById('Title').style.display = '';
  }, 300);

}

//Create a radio button with a given name
function createRadioElement(name, checked, UID) {
  var radioHtml = '<input type="radio" name="' + name + UID + '"';
  if (checked) {
    radioHtml += ' checked="checked"';
  }
  radioHtml += ' onclick="calculateBuy()"'
  radioHtml += '/>';

  var radioFragment = document.createElement('div');
  radioFragment.innerHTML = radioHtml;

  return radioFragment.firstChild;
}
