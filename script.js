/*
Name: Tim Barber, Timothy_Barber@student.uml.edu
Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
File: /usr/cs/undergrad/2018/tbarber/public_html/Midterm/script.js Created: 23-oct-2017
*/

var cars = [];
var carIter = 0;

function bake_cookie(name, value) {
  var newCookie = JSON.stringify(value);
  document.cookie = document.cookie + newCookie;
}

function read_cookie() {
  var result = document.cookie;
  result && (result = JSON.parse(result[1]));
  return result;
}

//Adds a car object to the cars array
function addCar(year, make, model, trim, nickname, milage, estMilage, oilWeight, oilType) {

  var temp = new carModule("car" + carIter)
  temp.carYear.innerHTML = year;
  temp.carMake.innerHTML = make;
  temp.carModel.innerHTML = model;
  temp.carTrim.innerHTML = trim;
  if (!isNaN(nickname)) {
    temp.title.innerHTML = nickname;
  } else {
    temp.title.innerHTML = year + " " + make + " " + model;
  }
  if (!isNaN(milage)) {
    temp.carMilage.innerHTML = milage;
  } else {
    temp.carMilage.innerHTML = 0;
  }
  if (!isNaN(milage)) {
    temp.carEstMilage.innerHTML = estMilage;
  } else {
    temp.carEstMilage.innerHTML = 10000;
  }
  temp.oilWeight.innerHTML = oilWeight;
  temp.oilType.innerHTML = oilType;
  bake_cookie("test", temp);
  read_cookie();
  addCarModule(temp);
  //Push module into array
  cars.push(temp);
  //Write array to home screen

  carIter = carIter + 1;
}

//Class for lease module
function carModule(UID) {
  this.markForRemoval = false;

  //Uid to identify the module in the HTML
  this.UID = UID;

  //Title for module
  this.title = document.createElement('Label');
  this.title.className = "title";
  //this.title.className = "moduleTitle";


  //this.imageURL = "http://www.udriveit.com.au/wp-content/uploads/2016/04/placeholder-350x205.gif";
  //this.imageURL = "https://i.forbesimg.com/images/2002/01/21/test_side_415x277.jpg"
  //Car Year
  this.carYear = document.createElement('Label');
  this.carYear.className = "text";

  //Car Make
  this.carMake = document.createElement('Label');
  this.carMake.className = "text";

  //Car Model
  this.carModel = document.createElement('Label');
  this.carModel.className = "text";

  //Car Trim
  this.carTrim = document.createElement('Label');
  this.carTrim.className = "text";

  //Car Milage
  this.carMilage = document.createElement('Label');
  this.carMilage.className = "text";

  //Car estimated Milage
  this.carEstMilage = document.createElement('Label');
  this.carEstMilage.className = "text";

  //Car Oil Weight
  this.oilWeight = document.createElement('Label');
  this.oilWeight.className = "text";

  //Car Oil Type
  this.oilType = document.createElement('Label');
  this.oilType.className = "text";


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
  secondaryText.innerHTML = "Est Milage: " + mod.carMilage.innerHTML;
  secondTextDiv.appendChild(secondaryText);
  secondTextDiv.style.display = 'none';
  textDiv.innerHTML = mod.title.innerHTML;
  searchImage(mod.carYear.innerHTML + "," + mod.carMake.innerHTML.replace(/[ ,]+/g, ",") + "," + mod.carModel.innerHTML.replace(/[ ,]+/g, ","), function(data) {
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


  //Create the module div
  var mainDiv = document.createElement("div");

  mainDiv.id = mod.UID + "details";
  mainDiv.className = "detailsPageFadeIn"

  var readDiv = document.createElement("div");
  var writeDiv = document.createElement("div");
  writeDiv.style.display = "none";
  //Close button for module
  closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.className = "closeButton";
  var mouseLeaveBack = button.onmouseleave;
  var mouseOverBack = button.onmouseover;
  var mouseClickBack = button.onclick;
  button.onmouseover = function() {}
  button.onmouseleave = function() {}
  button.onclick = function() {}

  //Close Button OnClick method
  closeButton.onclick = function() {
    mainDiv.className = "detailsPageFadeOut"
    button.className = "carbtn";

    button.onmouseover = mouseOverBack;
    button.onmouseleave = mouseLeaveBack;
    button.style.width = "";
    button.style.height = "";
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
    }, 200);

  }

  //
  //read section
  //
  editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.onclick = function() {
    readDiv.style.display = "none";
    writeDiv.style.display = "";
  }
  //Title
  readDiv.appendChild(mod.title);
  readDiv.appendChild(closeButton);
  var tempDiv = document.createElement("div");
  tempDiv.appendChild(editButton);
  readDiv.appendChild(tempDiv);
  //Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Milage: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.carMilage);
  readDiv.appendChild(tempDiv);

  //Est Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Estimated Yearly Milage: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.carEstMilage);
  readDiv.appendChild(tempDiv);

  //Oil Type
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Oil Type: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.oilType);
  readDiv.appendChild(tempDiv);

  //Oil Weight
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Oil Weight: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.oilWeight);
  readDiv.appendChild(tempDiv);

  //
  //Write section
  //
  doneEditButton = document.createElement("button");
  //Title
  var titleEdit = document.createElement("input");
  titleEdit.className = "title";
  titleEdit.value = mod.title.innerHTML;
  writeDiv.appendChild(titleEdit);
  var tempDiv = document.createElement("div");
  tempDiv.appendChild(doneEditButton);
  writeDiv.appendChild(tempDiv);
  //Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Milage: ";
  var carMilageEdit = document.createElement("input");
  carMilageEdit.value = mod.carMilage.innerHTML;
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(carMilageEdit);
  writeDiv.appendChild(tempDiv);

  //Est Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Estimated Yearly Milage: ";
  var carEstMilageEdit = document.createElement("input");
  carEstMilageEdit.value = mod.carEstMilage.innerHTML;
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(carMilageEdit);
  writeDiv.appendChild(tempDiv);

  //Oil Type
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  var oilTypeEdit = document.createElement("select");
  oilTypeEdit.value = mod.oilType.innerHTML;
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
  var MSRPLabel = document.createElement("Label");
  var oilWeightEdit = document.createElement("select");
  var oilWeights = "0W-20,5W-20,10W-20,0W-30,5W-30,10W-30,0W-40,5W-40,10W-40,0W-50,5W-50,10W-50";
  var array = oilWeights.split(',');
  array.forEach(function(item) {
    var option = document.createElement("option");
    option.text = item;
    oilWeightEdit.add(option);
  })
  oilWeightEdit.value = mod.oilWeight.innerHTML;
  MSRPLabel.innerHTML = "Oil Weight: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(oilWeightEdit);
  writeDiv.appendChild(tempDiv);
  doneEditButton.innerHTML = "Done Editing";
  doneEditButton.onclick = function() {
    mod.title.innerHTML = titleEdit.value;
    mod.carMilage.innerHTML = carMilageEdit.value;
    mod.carEstMilage.innerHTML = carEstMilageEdit.value;
    mod.oilWeight.innerHTML = oilWeightEdit.options[oilWeightEdit.selectedIndex].text;
    mod.oilType.innerHTML = oilTypeEdit.options[oilTypeEdit.selectedIndex].text;
    secondaryText.innerHTML = "Est Milage: " + mod.carMilage.innerHTML;
    if (mod.title.innerHTML == "") {
      mod.title.innerHTML = mod.carYear.innerHTML + " " + mod.carMake.innerHTML + " " + mod.carModel.innerHTML;
    }
    textDiv.innerHTML = mod.title.innerHTML;
    textDiv.appendChild(secondTextDiv);
    readDiv.style.display = "";
    writeDiv.style.display = "none";
  }



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
  addCar(year, make, model, trim, year + " " + make + " " + model, milage, estMilage, "5W-20", "Synthetic");

  cancelAddCar();
  //This is so the page doesn't refresh on submit
  return false;
}

//Cancels the add page and goes back to the homepage
function cancelAddCar() {
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
