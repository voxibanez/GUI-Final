/*
Name: Tim Barber, Timothy_Barber@student.uml.edu
Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
File: /usr/cs/undergrad/2018/tbarber/public_html/Midterm/script.js Created: 23-oct-2017
*/

var buyModules = [];
var leaseModules = [];
var buyIter = 0;
var leaseIter = 0;

function addCar() {
  //Make sure the placeholder is hidden when adding a module for the first time
  document.getElementById('Modules').style.display = 'none';
  document.getElementById('AddCar').style.display = '';
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

//Class for lease module
function leaseModule(UID) {
  this.markForRemoval = false;

  //Uid to identify the module in the HTML
  this.UID = UID;

  //Title for module
  this.title = document.createElement('input');
  this.title.value = "Lease - Car Name Here";
  this.title.className = "moduleTitle";

  //Close button for module
  this.closeButton = document.createElement("button");
  this.closeButton.innerHTML = "X";
  this.closeButton.className = "closeButton";
  //Put the placeholder back if there are no modules
  this.closeButton.onclick = function() {
    this.markForRemoval = true;
    document.getElementById(UID).remove();
    leaseModules.splice(UID, 1)
    if (buyModules.length == 0 && leaseModules.length == 0) {
      document.getElementById('NothingHere').style.visibility = 'visible';
    }
    calculateBuy();
  }

  //Monthly payment
  this.monthlyPaymentInput = document.createElement('input');
  this.monthlyPaymentInput.type = "text";
  this.monthlyPaymentInput.setAttribute('onkeydown', 'return isNumber(event)');
  this.monthlyPaymentInput.setAttribute('onkeyup', 'calculateBuy()');
  this.monthlyPaymentInput.className = "textbox";


  //Discounts
  this.discounts = [];

  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);

  //Add 2 discount slots
  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);
  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);

  //Down payment
  this.downPayment = document.createElement('input')
  this.downPayment.type = "text";
  this.downPayment.setAttribute('onkeydown', 'return isNumber(event)');
  this.downPayment.setAttribute('onkeyup', 'calculateBuy()');
  this.downPayment.className = "textbox";
  //Radio buttons to select either percent or money for downpayment
  this.downPercent = createRadioElement("downPercentorMoneyLease", false, UID);
  this.downMoney = createRadioElement("downPercentorMoneyLease", true, UID);

  //Alloted miles
  this.allotedMiles = document.createElement('input')
  this.allotedMiles.type = "text";
  this.allotedMiles.setAttribute('onkeydown', 'return isNumber(event)');
  this.allotedMiles.setAttribute('onkeyup', 'calculateBuy()');
  this.allotedMiles.className = "textbox";

  //Cost per mile over alloted miles
  this.mileCost = document.createElement('input')
  this.mileCost.type = "text";
  this.mileCost.setAttribute('onkeydown', 'return isNumber(event)');
  this.mileCost.setAttribute('onkeyup', 'calculateBuy()');
  this.mileCost.className = "textbox";

  //Average miles
  this.averageMiles = document.createElement('input')
  this.averageMiles.type = "text";
  this.averageMiles.setAttribute('onkeydown', 'return isNumber(event)');
  this.averageMiles.setAttribute('onkeyup', 'calculateBuy()');
  this.averageMiles.className = "textbox";

  //Payment length in months
  this.paymentLength = document.createElement('input')
  this.paymentLength.type = "text";
  this.paymentLength.setAttribute('onkeydown', 'return isNumber(event)');
  this.paymentLength.setAttribute('onkeyup', 'calculateBuy()');
  this.paymentLength.className = "textbox";

  //Total
  this.total = document.createElement("Label");
  this.total.className = "money";
  this.total.innerHTML = "-";

  //Monthly Total
  this.monthlyPayment = document.createElement("Label");
  this.monthlyPayment.className = "money";
  this.monthlyPayment.innerHTML = "-";
}

//Class for buy module
function buyModule(UID) {
  this.markForRemoval = false;

  //Uid to identify the module in the HTML
  this.UID = UID;

  //Title for module
  this.title = document.createElement('input');
  this.title.value = "Buy - Car Name Here";
  this.title.className = "moduleTitle";

  //Close button for module
  this.closeButton = document.createElement("button");
  this.closeButton.innerHTML = "X";
  this.closeButton.className = "closeButton";
  //Put the placeholder back if there are no modules
  this.closeButton.onclick = function() {
    this.markForRemoval = true;
    document.getElementById(UID).remove();
    buyModules.splice(UID, 1)
    if (buyModules.length == 0 && leaseModules.length == 0) {
      document.getElementById('NothingHere').style.visibility = 'visible';
    }
    calculateBuy();
  }

  //MSRP
  this.MSRP = document.createElement('input');
  this.MSRP.type = "text";
  this.MSRP.setAttribute('onkeydown', 'return isNumber(event)');
  this.MSRP.setAttribute('onkeyup', 'calculateBuy()');
  this.MSRP.className = "textbox";

  //Discounts
  this.discounts = [];

  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);

  //Add 2 discount slots
  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);
  var temp = document.createElement('input');
  temp.type = "text";
  temp.setAttribute('onkeydown', 'return isNumber(event)');
  temp.setAttribute('onkeyup', 'calculateBuy()');
  temp.style = "float: left;";
  temp.className = "textbox";
  this.discounts.push(temp);

  //Down payment
  this.downPayment = document.createElement('input')
  this.downPayment.type = "text";
  this.downPayment.setAttribute('onkeydown', 'return isNumber(event)');
  this.downPayment.setAttribute('onkeyup', 'calculateBuy()');
  this.downPayment.className = "textbox";

  //Radio buttons to choose percent or money for down payment
  this.downPercent = createRadioElement("downPercentorMoneyBuy", false, UID);
  this.downMoney = createRadioElement("downPercentorMoneyBuy", true, UID);

  //Interest
  this.interest = document.createElement('input')
  this.interest.type = "text";
  this.interest.setAttribute('onkeydown', 'return isNumber(event)');
  this.interest.setAttribute('onkeyup', 'calculateBuy()');
  this.interest.className = "textbox";

  //Payment length in months
  this.paymentLength = document.createElement('input')
  this.paymentLength.type = "text";
  this.paymentLength.setAttribute('onkeydown', 'return isNumber(event)');
  this.paymentLength.setAttribute('onkeyup', 'calculateBuy()');
  this.paymentLength.className = "textbox";

  //Total
  this.total = document.createElement("Label");
  this.total.className = "money";
  this.total.innerHTML = "-";

  //Monthly Total
  this.monthlyPayment = document.createElement("Label");
  this.monthlyPayment.className = "money";
  this.monthlyPayment.innerHTML = "-";
}

//Calculate the monthly payments and totals for the lease and buy modules
function calculateBuy() {
  var bestTotalIndexBuy = -1;
  var bestMonthlyIndexBuy = -1;
  var bestTotalIndexLease = -1;
  var bestMonthlyIndexLease = -1;

  var iterLease = 0;
  var iterBuy = 0;

  //Process the Lease Modules in the array
  leaseModules.forEach(function(element) {
    //Initialize Parameters
    var monthlyPayment = 0;
    var total = 0;
    var downPayment = 0;

    //If there is no monthly payment, dont bother calculating
    if (element.monthlyPaymentInput.value == "") {
      element.total.innerHTML = "-";
      element.monthlyPayment.innerHTML = "-";
      return;
    }

    //Get monthly payment
    monthlyPayment = parseFloat(element.monthlyPaymentInput.value);

    //If theres a payment length, calculate the total and subtract the discounts
    if (element.paymentLength.value != "") {
      var total = parseFloat(element.monthlyPaymentInput.value) * parseFloat(element.paymentLength.value);
      //Subtract the discounts
      element.discounts.forEach(function(element1) {
        if (element1.value != "") {
          total = total - parseFloat(element1.value);
        }
      });

      //Check if total is negative, show an error if true
      if (total < 0) {
        element.discounts.forEach(function(element1) {
          element1.style.backgroundColor = "LightCoral";
        });
        element.total.innerHTML = "Error: Discounts can't be more than total";
        element.total.style.color = "darkred";
        element.monthlyPayment.innerHTML = "-";
        element.monthlyPayment.style.color = "darkred";
        return;
      } else {
        element.discounts.forEach(function(element1) {
          element1.style.backgroundColor = "white";
        });
      }

      //If there is a downPayment, process it
      if (element.downPayment.value != "") {

        //If downpayment is in money
        if (element.downMoney.checked) {
          downPayment = parseFloat(element.downPayment.value);
          if ((total - downPayment) < 0) {
            element.downPayment.style.backgroundColor = "LightCoral";
            element.total.innerHTML = "Error: Down Payment more than MSRP - Discounts";
            element.total.style.color = "darkred";
            element.monthlyPayment.innerHTML = "-";
            element.monthlyPayment.style.color = "darkred";
            return;
          } else {
            element.downPayment.style.backgroundColor = "white";
          }

        }

        //If downpayment is in percent of total
        else {
          if (parseFloat(element.downPayment.value) > 100) {
            element.downPayment.style.backgroundColor = "LightCoral";
            element.total.innerHTML = "Error: Down Payment cannot be more than 100%";
            element.total.style.color = "darkred";
            element.monthlyPayment.innerHTML = "-";
            element.monthlyPayment.style.color = "darkred";
            return;
          } else {
            element.downPayment.style.backgroundColor = "white";
          }
          downPayment = total / 100 * parseFloat(element.downPayment.value);
        }
      }

      //If the three mile parameters are filled, process that
      if (element.allotedMiles.value != "" && element.mileCost.value != "" && element.averageMiles.value != "") {
        if (parseFloat(element.allotedMiles.value) < parseFloat(element.averageMiles.value)) {
          total = total + ((parseFloat(element.averageMiles.value) - parseFloat(element.allotedMiles.value)) * parseFloat(element.mileCost.value));
        }
      }

      //Calculate the monthly payment given the total and the paymentLength (instead of just monthly payment parameter)
      var monthlyPayment = total / parseFloat(element.paymentLength.value);
    }
    element.total.style.color = "black";
    element.monthlyPayment.style.color = "black";

    //If the total or monthlyPayment isn't 0, print it out (note total includes the down-payment where as the monthly payment does not)
    total = total + downPayment;
    if (total != 0) {
      element.total.innerHTML = "$" + total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      element.total.innerHTML = "-";
    }
    if (monthlyPayment != 0) {
      element.monthlyPayment.innerHTML = "$" + monthlyPayment.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      element.monthlyPayment.innerHTML = "-";
    }

    //Determine if the current module now has the lowest total and/or monthly payment compared to other lease modules
    //If it is, store the index
    if (total != 0) {
      if (bestTotalIndexLease == -1) {
        bestTotalIndexLease = iterLease;
      } else if (total < parseFloat(leaseModules[bestTotalIndexLease].total.innerHTML.replace('$', '').replace('-', 0).replace(',', ''))) {
        bestTotalIndexLease = iterLease;
      }
    }
    if (monthlyPayment != 0) {
      if (bestMonthlyIndexLease == -1) {
        bestMonthlyIndexLease = iterLease;
      } else if (monthlyPayment < parseFloat(leaseModules[bestMonthlyIndexLease].monthlyPayment.innerHTML.replace('$', '').replace('-', 0).replace(',', ''))) {
        bestMonthlyIndexLease = iterLease;
      }
    }

    iterLease = iterLease + 1;

  });


  //Process all BUY modules
  buyModules.forEach(function(element) {
    //Initialize variables
    var total = 0.0;
    var monthlyPayment = 0.0;
    var downPayment = 0.0;
    var interest = 0.0;

    //If the MSRP is blank, dont bother calculating
    if (element.MSRP.value == "") {
      element.total.innerHTML = "-";
      element.monthlyPayment.innerHTML = "-";
      return;
    }

    //Get the MSRP
    var total = parseFloat(element.MSRP.value);

    //Subtract the discounts
    element.discounts.forEach(function(element1) {
      if (element1.value != "") {
        total = total - parseFloat(element1.value);
      }
    });

    //Check if total is negative, if it is show an error
    if (total < 0) {
      element.discounts.forEach(function(element1) {
        element1.style.backgroundColor = "LightCoral";
      });
      element.total.innerHTML = "Error: Discounts can't be more than total";
      element.total.style.color = "darkred";
      element.monthlyPayment.innerHTML = "-";
      element.monthlyPayment.style.color = "darkred";
      return;
    } else {
      element.discounts.forEach(function(element1) {
        element1.style.backgroundColor = "white";
      });
    }

    //If there is a downpayment
    if (element.downPayment.value != "") {
      //If downpayment is in money
      if (element.downMoney.checked) {
        downPayment = parseFloat(element.downPayment.value);
        if ((total - downPayment) < 0) {
          element.downPayment.style.backgroundColor = "LightCoral";
          element.total.innerHTML = "Error: Down Payment more than MSRP - Discounts";
          element.total.style.color = "darkred";
          element.monthlyPayment.innerHTML = "-";
          element.monthlyPayment.style.color = "darkred";
          return;
        } else {
          element.downPayment.style.backgroundColor = "white";
        }

      }
      //If downpayment is in percent of total
      else {
        if (parseFloat(element.downPayment.value) > 100) {
          element.downPayment.style.backgroundColor = "LightCoral";
          element.total.innerHTML = "Error: Down Payment cannot be more than 100%";
          element.total.style.color = "darkred";
          element.monthlyPayment.innerHTML = "-";
          element.monthlyPayment.style.color = "darkred";
          return;
        } else {
          element.downPayment.style.backgroundColor = "white";
        }
        downPayment = total / 100 * parseFloat(element.downPayment.value);
      }
    }

    //If there is interest, calculate the amount of interest based on the total
    if (element.interest.value != "") {
      if (parseFloat(element.interest.value) > 100) {
        element.interest.style.backgroundColor = "LightCoral";
        element.total.innerHTML = "Error: Interest cannot be more than 100%";
        element.total.style.color = "darkred";
        element.monthlyPayment.innerHTML = "-";
        element.monthlyPayment.style.color = "darkred";
        return;
      }
      element.interest.style.backgroundColor = "white";
      interest = (total / 100 * parseFloat(element.interest.value));
    }

    //Add the interst to the total
    total = total + interest;

    //If there is a payment length, calcualte the monthly payment
    if (element.paymentLength.value != "") {
      if (parseFloat(element.paymentLength.value) == 0) {
        element.paymentLength.style.backgroundColor = "LightCoral";
        element.total.innerHTML = "Error: Payment length cannot be 0";
        element.total.style.color = "darkred";
        element.monthlyPayment.innerHTML = "-";
        element.monthlyPayment.style.color = "darkred";
        return;
      } else {
        monthlyPayment = (total - downPayment) / parseFloat(element.paymentLength.value);
      }
    }
    element.total.style.color = "black";
    element.monthlyPayment.style.color = "black";

    //If total/monthly payment isnt 0, display it
    if (total != 0) {
      element.total.innerHTML = "$" + total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      element.total.innerHTML = "-";
    }
    if (monthlyPayment != 0) {
      element.monthlyPayment.innerHTML = "$" + monthlyPayment.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      element.monthlyPayment.innerHTML = "-";
    }

    //Compare total and monthly payment to see if it is the cheapest in the buy group
    if (total != 0) {
      if (bestTotalIndexBuy == -1) {
        bestTotalIndexBuy = iterBuy;
      } else if (total < parseFloat(buyModules[bestTotalIndexBuy].total.innerHTML.replace('$', '').replace('-', 0).replace(',', ''))) {
        bestTotalIndexBuy = iterBuy;
      }
    }
    if (monthlyPayment != 0) {
      if (bestMonthlyIndexBuy == -1) {
        bestMonthlyIndexBuy = iterBuy;
      } else if (monthlyPayment < parseFloat(buyModules[bestMonthlyIndexBuy].monthlyPayment.innerHTML.replace('$', '').replace('-', 0).replace(',', ''))) {
        bestMonthlyIndexBuy = iterBuy;
      }
    }

    iterBuy = iterBuy + 1;

  });
  //Determine if the lease or buy index is the smallest and set it to green
  //It will independently set the total and monthly payment to limegreen

  //Set to max int
  var bestTotalBuy = 9007199254740992;
  var bestTotalLease = 9007199254740992;
  var bestMonthlyBuy = 9007199254740992;
  var bestMonthlyLease = 9007199254740992;
  if (bestTotalIndexBuy != -1) {
    bestTotalBuy = parseFloat(buyModules[bestTotalIndexBuy].total.innerHTML.replace('$', '').replace('-', 0).replace(',', ''));
  }
  if (bestTotalIndexLease != -1) {
    bestTotalLease = parseFloat(leaseModules[bestTotalIndexLease].total.innerHTML.replace('$', '').replace('-', 0).replace(',', ''));
  }
  if (bestMonthlyIndexBuy != -1) {
    bestMonthlyBuy = parseFloat(buyModules[bestMonthlyIndexBuy].monthlyPayment.innerHTML.replace('$', '').replace('-', 0).replace(',', ''));
  }
  if (bestMonthlyIndexLease != -1) {
    bestMonthlyLease = parseFloat(leaseModules[bestMonthlyIndexLease].monthlyPayment.innerHTML.replace('$', '').replace('-', 0).replace(',', ''));
  }

  if (bestTotalLease < bestTotalBuy) {
    if (bestTotalIndexLease != -1) {
      leaseModules[bestTotalIndexLease].total.style.color = "limegreen";
    }
  } else {
    if (bestTotalIndexBuy != -1) {
      buyModules[bestTotalIndexBuy].total.style.color = "limegreen";
    }
  }

  if (bestMonthlyLease < bestMonthlyBuy) {
    if (bestMonthlyIndexLease != -1) {
      leaseModules[bestMonthlyIndexLease].monthlyPayment.style.color = "limegreen";
    }
  } else {
    if (bestMonthlyIndexBuy != -1) {
      buyModules[bestMonthlyIndexBuy].monthlyPayment.style.color = "limegreen";
    }
  }


}

//If the key press isnt a number/backspace/period, ignore it
function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  //If the char code doesnt represent a number
  if (charCode >= 48 && charCode <= 57 || charCode == 8 || charCode == 190) {
    return true;
  } else {
    return false;
  }
}

function addLeaseModule() {
  //Make sure the placeholder is hidden when adding a module for the first time
  document.getElementById('NothingHere').style.visibility = 'hidden';

  //Create a new leasemodule object and push it onto list
  leaseModules.push(new leaseModule("lease" + leaseIter));
  leaseIter = leaseIter + 1;

  //Create the module div
  var mainDiv = document.createElement("div");
  mainDiv.className = "module";
  mainDiv.id = leaseModules[leaseModules.length - 1].UID;

  //Create divs for the 3 sections of the module
  var titleDiv = document.createElement("div");
  titleDiv.className = "title";

  var div = document.createElement("div");
  div.className = "info";

  var ddiv = document.createElement("div");
  ddiv.className = "discounts";

  //Title
  titleDiv.appendChild(leaseModules[leaseModules.length - 1].title);
  titleDiv.appendChild(leaseModules[leaseModules.length - 1].closeButton);

  //Monthly payment
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var monthlyPaymentLabel = document.createElement("Label");
  monthlyPaymentLabel.innerHTML = "Monthly Payment ($/month):";
  tempDiv.appendChild(monthlyPaymentLabel);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].monthlyPaymentInput);
  div.appendChild(tempDiv);

  //discounts
  var discountsLabel = document.createElement("Label");
  discountsLabel.style.textAlign = "center";
  discountsLabel.innerHTML = discountsLabel.innerHTML + "Discounts ($)";

  ddiv.appendChild(discountsLabel);
  var brk = document.createElement("br");
  ddiv.appendChild(brk);
  var brk = document.createElement("br");
  ddiv.appendChild(brk);
  leaseModules[leaseModules.length - 1].discounts.forEach(function(element) {
    ddiv.appendChild(element);
    var brk = document.createElement("br");
    ddiv.appendChild(brk);
    var brk = document.createElement("br");
    ddiv.appendChild(brk);
  });

  var brk = document.createElement("br");
  div.appendChild(brk);

  //Down payment
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var downPaymentLabel = document.createElement("Label");
  downPaymentLabel.innerHTML = "Down Payment:";
  var percentSign = document.createElement("Label");
  percentSign.innerHTML = "%";
  var dollarSign = document.createElement("Label");
  dollarSign.innerHTML = "$";
  tempDiv.appendChild(downPaymentLabel);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].downPayment);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].downPercent);
  tempDiv.appendChild(percentSign);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].downMoney);
  tempDiv.appendChild(dollarSign);
  div.appendChild(tempDiv);


  var brk = document.createElement("br");
  div.appendChild(brk);

  //Alloted miles
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var allotedMilesLabel = document.createElement("Label");
  allotedMilesLabel.innerHTML = "Alloted Miles:";
  tempDiv.appendChild(allotedMilesLabel);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].allotedMiles);
  div.appendChild(tempDiv);

  var brk = document.createElement("br");
  div.appendChild(brk);

  //Cost per mile
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var costPerMileLabel = document.createElement("Label");
  costPerMileLabel.innerHTML = "Cost Per Mile ($):";
  tempDiv.appendChild(costPerMileLabel);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].mileCost);
  div.appendChild(tempDiv);

  var brk = document.createElement("br");
  div.appendChild(brk);

  //Estimated milage
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var averageMilesLabel = document.createElement("Label");
  averageMilesLabel.innerHTML = "Esimated Mileage:";
  tempDiv.appendChild(averageMilesLabel);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].averageMiles);
  div.appendChild(tempDiv);

  var brk = document.createElement("br");
  div.appendChild(brk);

  //Payment length in months
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var paymentLength = document.createElement("Label");
  paymentLength.innerHTML = "Payment Length (Months): ";
  tempDiv.appendChild(paymentLength);
  tempDiv.appendChild(leaseModules[leaseModules.length - 1].paymentLength);

  div.appendChild(tempDiv);

  var outDiv = document.createElement("div");
  outDiv.className = "total";

  //Total
  var totalText = document.createElement("Label");
  totalText.innerHTML = "<br>Total<br>";
  outDiv.appendChild(totalText);
  outDiv.appendChild(leaseModules[leaseModules.length - 1].total);

  //Monthly Total
  var monthlyText = document.createElement("Label");
  monthlyText.innerHTML = "<br><br><br><br>Monthly Payment<br>";
  var perMonth = document.createElement("Label");
  perMonth.style = "font-size: 75%; font-style: italic;";
  perMonth.innerHTML = "<br>Per Month";
  outDiv.appendChild(monthlyText);
  outDiv.appendChild(leaseModules[leaseModules.length - 1].monthlyPayment);
  outDiv.appendChild(perMonth);

  //Append all child divs to mainDiv
  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(div);
  mainDiv.appendChild(ddiv);
  mainDiv.appendChild(outDiv);

  //Append mainDiv to Modules div
  document.getElementById("Modules").appendChild(mainDiv);
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function addBuyModule() {
  //Make sure the placeholder is hidden when adding a module for the first time
  document.getElementById('NothingHere').style.visibility = 'hidden';

  //Create a new leasemodule object and push it onto list
  buyModules.push(new buyModule("buy" + buyIter));
  buyIter = buyIter + 1;

  //Create the module div
  var mainDiv = document.createElement("div");
  mainDiv.className = "module";
  mainDiv.id = buyModules[buyModules.length - 1].UID;

  //Create divs for the 3 sections of the module
  var titleDiv = document.createElement("div");
  titleDiv.className = "title";

  var div = document.createElement("div");
  div.className = "info";

  var ddiv = document.createElement("div");
  ddiv.className = "discounts";

  //Title
  titleDiv.appendChild(buyModules[buyModules.length - 1].title);
  titleDiv.appendChild(buyModules[buyModules.length - 1].closeButton);

  //MSRP
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var MSRPLabel = document.createElement("Label");
  MSRPLabel.innerHTML = "MSRP ($):";
  tempDiv.appendChild(MSRPLabel);
  tempDiv.appendChild(buyModules[buyModules.length - 1].MSRP);
  div.appendChild(tempDiv);

  //Discounts
  var discountsLabel = document.createElement("Label");
  discountsLabel.style.textAlign = "center";
  discountsLabel.innerHTML = discountsLabel.innerHTML + "Discounts ($)";

  ddiv.appendChild(discountsLabel);
  var brk = document.createElement("br");
  ddiv.appendChild(brk);
  var brk = document.createElement("br");
  ddiv.appendChild(brk);
  buyModules[buyModules.length - 1].discounts.forEach(function(element) {
    ddiv.appendChild(element);
    var brk = document.createElement("br");
    ddiv.appendChild(brk);
    var brk = document.createElement("br");
    ddiv.appendChild(brk);
  });

  var brk = document.createElement("br");
  div.appendChild(brk);

  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  //Down payment
  var downPaymentLabel = document.createElement("Label");
  downPaymentLabel.innerHTML = "Down Payment:";
  var percentSign = document.createElement("Label");
  percentSign.innerHTML = "%";
  var dollarSign = document.createElement("Label");
  dollarSign.innerHTML = "$";
  tempDiv.appendChild(downPaymentLabel);
  tempDiv.appendChild(buyModules[buyModules.length - 1].downPayment);
  tempDiv.appendChild(buyModules[buyModules.length - 1].downPercent);
  tempDiv.appendChild(percentSign);
  tempDiv.appendChild(buyModules[buyModules.length - 1].downMoney);
  tempDiv.appendChild(dollarSign);
  div.appendChild(tempDiv);


  var brk = document.createElement("br");
  div.appendChild(brk);

  //Interest
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var interestLabel = document.createElement("Label");
  interestLabel.innerHTML = "Interest (%):";
  tempDiv.appendChild(interestLabel);
  tempDiv.appendChild(buyModules[buyModules.length - 1].interest);

  div.appendChild(tempDiv);

  var brk = document.createElement("br");
  div.appendChild(brk);

  //Payment length in months
  var tempDiv = document.createElement("div");
  tempDiv.className = "section";

  var paymentLength = document.createElement("Label");
  paymentLength.innerHTML = "Payment Length (Months): ";
  tempDiv.appendChild(paymentLength);
  tempDiv.appendChild(buyModules[buyModules.length - 1].paymentLength);

  div.appendChild(tempDiv);

  var outDiv = document.createElement("div");
  outDiv.className = "total";

  //Total
  var totalText = document.createElement("Label");
  totalText.innerHTML = "<br>Total<br>";
  outDiv.appendChild(totalText);
  outDiv.appendChild(buyModules[buyModules.length - 1].total);

  //Monthly Total
  var monthlyText = document.createElement("Label");
  monthlyText.innerHTML = "<br><br><br><br>Monthly Payment<br>";
  var perMonth = document.createElement("Label");
  perMonth.style = "font-size: 75%; font-style: italic;";

  perMonth.innerHTML = "<br>Per Month";
  outDiv.appendChild(monthlyText);
  outDiv.appendChild(buyModules[buyModules.length - 1].monthlyPayment);
  outDiv.appendChild(perMonth);

  //Append all child divs to mainDiv
  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(div);
  mainDiv.appendChild(ddiv);
  mainDiv.appendChild(outDiv);

  //Append mainDiv to Modules div
  document.getElementById("Modules").appendChild(mainDiv);
}

// Toggle between hiding and showing dropdown
function showMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
