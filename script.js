/*
Name: Tim Barber, Timothy_Barber@student.uml.edu
Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
File: /usr/cs/undergrad/2018/tbarber/public_html/Midterm/script.js Created: 23-oct-2017
*/

var cars = [];
var carIter = 0;

//Adds a car object to the cars array
function addCar(year, make, model, nickname, milage, estMilage, oilWeight, oilType, imageURL) {

  var temp = new carModule("car" + carIter)
  temp.carYear.innerHTML = year;
  temp.carMake.innerHTML = make;
  temp.carModel.innerHTML = model;
  temp.title.innerHTML = nickname;
  temp.carMilage.innerHTML = milage;
  temp.carEstMilage.innerHTML = estMilage;
  temp.oilWeight.innerHTML = oilWeight;
  temp.oilType.innerHTML = oilType;
  if (imageURL != "") {
    temp.imageURL = imageURL;
  }

  //Push module into array
  cars.push(temp);
  //Write array to home screen
  addCarModule(temp);
}

//Class for lease module
function carModule(UID) {
  this.markForRemoval = false;

  //Uid to identify the module in the HTML
  this.UID = UID;

  //Title for module
  this.title = document.createElement('Label');
  this.title.className = "moduleTitle";


  //this.imageURL = "http://www.udriveit.com.au/wp-content/uploads/2016/04/placeholder-350x205.gif";
  this.imageURL = "https://i.forbesimg.com/images/2002/01/21/test_side_415x277.jpg"
  //Car Year
  this.carYear = document.createElement('Label');
  this.carYear.className = "text";

  //Car Make
  this.carMake = document.createElement('Label');
  this.carMake.className = "text";

  //Car Model
  this.carModel = document.createElement('Label');
  this.carModel.className = "text";

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

  //Create the module div
  var mainDiv = document.createElement("div");
  mainDiv.className = "module";

  mainDiv.id = mod.UID;

  //Set up the clickable DIV
  var button = document.createElement("div");
  var textDiv = document.createElement("div");
  var secondaryText = document.createElement("div");
  secondaryText.innerHTML = "<br />Est Milage: " + mod.carMilage.innerHTML;
  secondaryText.style.display = 'none';
  textDiv.innerHTML = mod.title.innerHTML;
  button.style.backgroundImage = "url(" + mod.imageURL + ")";
  textDiv.appendChild(secondaryText);
  button.appendChild(textDiv);
  button.className = "carbtn";
  button.onmouseover = function() {
    secondaryText.className = "secondaryTextModuleFadeIn";
    secondaryText.style.display = '';
  }
  button.onmouseleave = function() {
    setTimeout(function() {
      secondaryText.style.display = 'none';
    }, 300);
    secondaryText.className = "secondaryTextModuleFadeOut";
  }
  button.onclick = function() {
    textDiv.className = "moduleTextFadeOut";
    button.className = "carbtnEXPAND";
    setTimeout(function() {
      textDiv.style.display = 'none';
      expandCarModule(mod, button, textDiv, secondaryText)
    }, 300);
  }
  mainDiv.appendChild(button);

  //Append mainDiv to Modules div
  document.getElementById("Modules").appendChild(mainDiv);
}

function expandCarModule(mod, button, textDiv, secondaryText) {
  //Create the module div
  var mainDiv = document.createElement("div");

  mainDiv.id = mod.UID + "details";
  mainDiv.className = "detailsPageFadeIn"

  //Create divs for the 3 sections of the module
  var titleDiv = document.createElement("div");
  titleDiv.className = "title";

  var div = document.createElement("div");
  div.className = "info";
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

    setTimeout(function() {
      button.onclick = mouseClickBack;
      textDiv.style.display = '';
      secondaryText.style.display = 'none';
      secondaryText.className = "secondaryTextModuleFadeIn";
      textDiv.className = "moduleTextFadeIn";
      mainDiv.outerHTML = "";
      delete mainDiv;
    }, 200);

  }

  //Title
  titleDiv.appendChild(mod.title);
  titleDiv.appendChild(closeButton);

  //Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Milage: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.carMilage);
  div.appendChild(tempDiv);

  //Est Milage
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Estimated Yearly Milage: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.carEstMilage);
  div.appendChild(tempDiv);

  //Oil Type
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Oil Type: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.oilType);
  div.appendChild(tempDiv);

  //Oil Weight
  var tempDiv = document.createElement("div");
  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "Oil Weight: ";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(mod.oilWeight);
  div.appendChild(tempDiv);


  //Append all child divs to mainDiv
  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(div);
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
  document.getElementById('Modules').style.display = 'none';
  document.getElementById('AddCar').style.display = '';

  document.forms["tableForm"]["milage"].value = "";
  document.forms["tableForm"]["estMilage"].value = "";
}

//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var year = parseFloat(document.forms["tableForm"]["carYear"].value);
  var make = document.forms["tableForm"]["carMake"].value;
  var model = document.forms["tableForm"]["carModel"].value;

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
  addCar(year, make, model, year + " " + make + " " + model, milage, estMilage, "5W-20", "Synthetic", "");

  cancelAddCar();
  //This is so the page doesn't refresh on submit
  return false;
}

//Cancels the add page and goes back to the homepage
function cancelAddCar() {
  document.getElementById('Modules').style.display = '';
  document.getElementById('AddCar').style.display = 'none';
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
