let pointsElement = document.getElementById("amountOfPoints");
let priceElement = document.getElementsByClassName("priceElement");
let upgradeLevel = document.getElementsByClassName("upgradeLevel");
/**
 * @type {HTMLAudioElement}
 */
const audio = document.getElementById("soundEffect");
document.getElementById("cookie").addEventListener("click", addPointsByClick);
//Adds points when the cookie is clicked

let points = 0;
let pointsToAddByClick = 1;
let pointsToAddByTime = 1;
let pointInterval;
let time = 1000;

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
  audio.currentTime = 0;
  audio.play();
}

function refreshPoints() {
  pointsElement.innerText = Math.floor(points.toString());
}

const defaultUpgradeCosts = [50, 200, 500, 5000, 100000];
const upgrades = [0, 0, 0, 0, 0]; //How many times an upgrade has been bought

function upgradeNewCost(upgradeIndex) {
  const newUpgradeIndex = upgrades[upgradeIndex] + 1; //Adds 1 to the times-upgraded counter
  const defaultCost = defaultUpgradeCosts[upgradeIndex]; //The default cost of the element given by the argument
  return defaultCost * Math.pow(1.3, newUpgradeIndex - 1); //Changes the default cost
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
    upgradeLevel[0].innerText = upgrades[0];
  } else if (upgradeIndex === 1) {
    clearInterval(pointInterval);
    time -= 100;
    pointInterval = setInterval(() => addPointsByTime(pointsToAddByTime), time);
    priceElement[1].innerText = Math.floor(upgradeNewCost(upgradeIndex));
    upgradeLevel[1].innerText = upgrades[1];
  } else if (upgradeIndex === 2) {
    clearInterval(pointInterval);
    pointsToAddByTime++;
    pointInterval = setInterval(() => addPointsByTime(pointsToAddByTime), time);
    priceElement[2].innerText = Math.floor(upgradeNewCost(upgradeIndex));
    upgradeLevel[2].innerText = upgrades[2];
  } else if (upgradeIndex === 3) {
    priceElement[3].innerText = Math.floor(upgradeNewCost(upgradeIndex));
    upgradeLevel[3].innerText = upgrades[3];
  } else if (upgradeIndex === 4) {
    priceElement[4].innerText = Math.floor(upgradeNewCost(upgradeIndex));
    upgradeLevel[4].innerText = upgrades[4];
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


upgradeLevel[0].innerText = upgrades[0];
upgradeLevel[1].innerText = upgrades[1];
upgradeLevel[2].innerText = upgrades[2];
upgradeLevel[3].innerText = upgrades[3];
upgradeLevel[4].innerText = upgrades[4];