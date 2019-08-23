let pointsElement = document.getElementById("amountOfPoints");
let priceElement = document.getElementsByClassName("priceElement")
document.getElementById("cookie").addEventListener("click", addPointsByClick);
//Adds points when the cookie is clicked

let points = 0;
let pointsToAddByClick = 1;
let pointsToAddByTime = 0;
let pointInterval;

document.getElementById("cookie")
  .addEventListener('mousedown', function (e) { e.preventDefault(); }, false);
/**
*
* @param {MouseEvent} event
*/
function addPointsByTime(pointAmount) {
  points += pointAmount;
  refreshPoints();
}

function addPointsByClick(event) {
  points += pointsToAddByClick;
  refreshPoints();
}

function refreshPoints() {
  pointsElement.innerText = Math.floor(points.toString());
}

const defaultUpgradeCosts = [50, 200, 500, 5000, 100000];
const upgrades = [0, 0, 0, 0, 0]; //How many times an upgrade has been bought

function upgradeNewCost(upgradeIndex) {
  const newUpgradeIndex = upgrades[upgradeIndex] + 1; //Adds 1 to the times-upgraded counter
  const defaultCost = defaultUpgradeCosts[upgradeIndex]; //The default cost of the element given by the argument
  return defaultCost * Math.pow(1.5, newUpgradeIndex - 1); //Changes the default cost
}

function buyUpgrade(upgradeIndex) {
  if (points < upgradeNewCost(upgradeIndex)) {
    return;
  }
  points -= upgradeNewCost(upgradeIndex);
  upgrades[upgradeIndex]++;
  if (upgradeIndex === 0) {
    pointsToAddByClick++;
    priceElement[0].innerText = Math.floor(upgradeNewCost(upgradeIndex));
  } else if (upgradeIndex === 1) {
    clearInterval(pointInterval);
    pointsToAddByTime++;
    pointInterval = setInterval(() => addPointsByTime(pointsToAddByTime), 1000);
    priceElement[1].innerText = Math.floor(upgradeNewCost(upgradeIndex));
  } else if (upgradeIndex === 2) {
    priceElement[2].innerText = Math.floor(upgradeNewCost(upgradeIndex));
  } else if (upgradeIndex === 3) {
    priceElement[3].innerText = Math.floor(upgradeNewCost(upgradeIndex));
  } else if (upgradeIndex === 4) {
    priceElement[4].innerText = Math.floor(upgradeNewCost(upgradeIndex));
  }
  refreshPoints();
  //If you have enough points, the cost of the upgrade will be subtracted from your points. Upgrades index +1
}

document.getElementById("upgrade1").addEventListener("click", () => buyUpgrade(0));
document.getElementById("upgrade2").addEventListener("click", () => buyUpgrade(1));
document.getElementById("upgrade3").addEventListener("click", () => buyUpgrade(2));
document.getElementById("upgrade4").addEventListener("click", () => buyUpgrade(3));
document.getElementById("upgrade5").addEventListener("click", () => buyUpgrade(4));
priceElement[0].innerText = defaultUpgradeCosts[0];
priceElement[1].innerText = defaultUpgradeCosts[1];
priceElement[2].innerText = defaultUpgradeCosts[2];
priceElement[3].innerText = defaultUpgradeCosts[3];
priceElement[4].innerText = defaultUpgradeCosts[4];