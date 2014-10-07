window.onload = function(){
    var saveData = getCookie("saveCookie");
    if(saveData!="")
    {
        console.log("Save data get: ")
        console.log(saveData);
        restoreGame(saveData);
    }
    else
    {
        branch = 0;
        score = 0;
        click = 1000000000000;
        hasTen = 0;
        increment = 0;
        numWorkers = 0;
        workerCost = 10;
        workerValue = 1;
        doubleClickCost = 1000;
        doubleWorkerCost = 10000;
        hasHundred = 0;
        createSaveData();
    }
}

function pickBranch(choice)
{
    var initialString = document.getElementById("firstButton");
    var job = document.getElementById("profession");
    var objective = document.getElementById("task");
    if(choice==1)
    {
        branch = 1;
        //initialString.innerHTML = "Sell Lemonade";
        initialString.src = "sellLemonade.png";
        job.innerHTML = "Lemonade Seller!";
        objective.innerHTML = "selling lemonade!";
    }
    else if(choice==2)
    {
        branch = 2;
        //initialString.innerHTML = "Walk Dog";
        initialString.src = "walkDog.png";
        job.innerHTML = "Dog Walker!";
        objective.innerHTML = "walking dogs!";
    }
    else
    {
        branch = 3;
        //initialString.innerHTML = "Deliver Paper";
        initialString.src = "sendPaper.png";
        job.innerHTML = "Paper Boy!";
        objective.innerHTML = "delivering papers!";
    }
    document.getElementById("initialBranches").style.display = 'none';
    document.getElementById("game").style.display = 'inline';
    incScore();
}


function addOne()
{
    score = score + click;
    document.getElementById("hi").innerHTML = "Dollars: $" +  numberWithCommas(score);
    checkValue();    
}

function incScore()
{
    score = score + increment;
    document.getElementById("hi").innerHTML = "Dollars: $" +  numberWithCommas(score);
    t=setTimeout(function(){incScore()}, 1000);
    checkValue();
}

function checkValue()
{
    if(score >= 10 && hasTen == 0)
    {
        hasTen = 1;
        generateButton("Hire Someone",addWorker,"buttonWrapper");
        generateCostNumStub("numWorks", 0, "buttonWrapper", "Workers: ");
        generateCostNumStub("workerCosts", 10, "buttonWrapper", "Cost: $");
        generateInfoStub("addInfo0", "You can now hire workers! Workers will automatically do your job for you at a rate of ", "info", 1);
        generateInfoStub("addInfo1", "1/s!", "info", 0);
    }
}

function addWorker()
{
    if(numWorkers==0)
    {
        createClickerUpgrade();
    }
    if(score>=workerCost)
    {
        numWorkers++;
        increment = increment + workerValue;
        score = score - workerCost;
        workerCost = Math.floor(workerCost * 1.15);
        document.getElementById("hi").innerHTML = "Dollars: $" +  numberWithCommas(score);
        document.getElementById("numWorks").innerHTML = "Workers: " + numberWithCommas(numWorkers);
        document.getElementById("workerCosts").innerHTML = "Cost: $" + numberWithCommas(workerCost);
        document.getElementById("dps").innerHTML = "Automatic dollars per second: $" + numberWithCommas(increment);
        if(numWorkers==10)
        {
        createWorkerUpgrade();
        }
    }
}

function doubleClicks()
{
    if(score>=doubleClickCost)
    {
        score = score - doubleClickCost;
        doubleClickCost = doubleClickCost * 5;
        click = click * 2;
        document.getElementById("clickerUpgradeCost").innerHTML = "Cost: $" + numberWithCommas(doubleClickCost);
        document.getElementById("hi").innerHTML = "Dollars: $" + numberWithCommas(score);
    }
}

function upgradeWorkers()
{
    if(score>=doubleWorkerCost)
    {
        score = score - doubleWorkerCost;
        doubleWorkerCost = doubleWorkerCost * 10;
        increment = increment + (workerValue * numWorkers);
        workerValue = workerValue * 2;
        document.getElementById("dps").innerHTML = "Automatic dollars per second: $" + numberWithCommas(increment);
        document.getElementById("addInfo1").innerHTML = numberWithCommas(workerValue) + "/s!";
        document.getElementById("workerUpgradeCost").innerHTML = "Cost: $" + numberWithCommas(doubleWorkerCost);
        document.getElementById("hi").innerHTML = "Dollars: $" + numberWithCommas(score);
    }
}

function createClickerUpgrade()
{
    generateButton("Double click value", doubleClicks, "upgrades");
    generateCostNumStub("clickerUpgradeCost", doubleClickCost, "upgrades", "Cost: $");
}

function createWorkerUpgrade()
{   
    generateButton("Double worker production", upgradeWorkers, "upgrades");
    generateCostNumStub("workerUpgradeCost", doubleWorkerCost, "upgrades", "Cost: $");
}

// Generates a button
// value: A string to be displayed on the button
// onclickFunction: Name of function to be called onclick
// parentElementId: A string that holds the id of the parent element to be attached to
// 
function generateButton(value, onclickFunction, parentElementId)
{
    // Create button
    var newButton = document.createElement("button");
    newButton.innerHTML = value;
    newButton.onclick = onclickFunction;

    // Insert a break for beauty
    var br = document.createElement("br");

    // Attach them to the parent element
    var parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(br);
    parentElement.appendChild(newButton);
}

// Generates a cost to be next to a button
// id: A string with the id of the created element
// cost: The variable that holds the cost we will be updating with
// parentElementId: A string that holds the id of the parent element to be attached to
//
function generateCostNumStub(id, cost, parentElementId, prefix)
{
    var element = document.createElement("span");
    element.innerHTML = prefix + numberWithCommas(cost);
    element.id = id;

    // Insert a break for beauty
    var br = document.createElement("br");

    // Attach them to the parent element
    var parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(br);
    parentElement.appendChild(element);
}

function generateInfoStub(id, infoString, parentElementID, newLine)
{
    var aI = document.createElement("span");
    aI.innerHTML = infoString;
    var aIx = document.createElement("span");
    aI.id = id;
    var parentElement = document.getElementById(parentElementID);
    if(newLine==1)
    {
        var br = document.createElement("br");
        parentElement.appendChild(br);
    }
    parentElement.appendChild(aI);
}

//Returns the number input as a string with commas
//Uses crazy regular expressions I don't understand
function numberWithCommas(x) 
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if(c.indexOf(name)==0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*1000*60*60*24));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function createSaveData()
{
    var saveData = branch + " " + score + " " + click + " " + hasTen + " " + increment + " " + numWorkers + " " + workerCost + " " + workerValue + " " + doubleClickCost + " " + doubleWorkerCost;
    setCookie("saveCookie", saveData, 7);
    console.log("Create Save Data:");
    console.log(saveData);
    t=setTimeout(function(){createSaveData()}, (1000*60));
}

function restoreGame(saveData)
{
    var data = saveData.split(" ");
    console.log("Data restore:");
    console.log(data);
    branch = parseInt(data[0]);
    score = parseInt(data[1]);
    click = parseInt(data[2]);
    hasTen = 0;
    increment = parseInt(data[4]);
    numWorkers = parseInt(data[5]);
    workerCost = parseInt(data[6]);
    workerValue = parseInt(data[7]);
    doubleClickCost = parseInt(data[8]);
    doubleWorkerCost = parseInt(data[9]);
    createSaveData("saveCookie", saveData, 7);
    score = score - increment;
    if(branch>0)
    {
        pickBranch(branch);
        if(numWorkers>0)
        {
            createClickerUpgrade();
            document.getElementById("numWorks").innerHTML = "Workers: " + numberWithCommas(numWorkers);
            document.getElementById("workerCosts").innerHTML = "Cost: $" + numberWithCommas(workerCost);
            document.getElementById("dps").innerHTML = "Automatic dollars per second: $" + numberWithCommas(increment);
        }
        if(numWorkers>=10)
        {
            createWorkerUpgrade();
            document.getElementById("addInfo1").innerHTML = numberWithCommas(workerValue) + "/s!";
            document.getElementById("workerUpgradeCost").innerHTML = "Cost: $" + numberWithCommas(doubleWorkerCost);
        }
        if(doubleClickCost>1000)
        {
            document.getElementById("clickerUpgradeCost").innerHTML = "Cost: $" + numberWithCommas(doubleClickCost);
        }
    }
    
}

function clearSave()
{
    document.cookie = "saveCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}