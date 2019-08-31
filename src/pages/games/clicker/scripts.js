let pointsElement = document.getElementById("amountOfPoints");
let priceElement = document.getElementsByClassName("priceElement");
let upgradeLevel = document.getElementsByClassName("upgradeLevel");
function resetInterval() {
  pointService.previousTime = performance.now();
  clearInterval(pointService.pointInterval);
  pointService.pointInterval = setInterval(
    () => pointService.addPointsByTime(pointService.pointsToAddByTime),
    Math.max(pointService.timeBetweenPoints, 50)
  );
}
const upgradeService = {
  defaultUpgradeCosts: [50, 250, 500],
  timesUpgraded: [0, 0, 0],

  upgradeLocalStorageSetter() {
    localStorage.setItem("cookie-clicker-points", pointService.points.toString());
    localStorage.setItem("cookie-clicker-upgrades", JSON.stringify(this.timesUpgraded));
  },

  getCost(upgradeIndex) {
    const newUpgradeIndex = this.timesUpgraded[upgradeIndex] + 1; //Adds 1 to the times-upgraded counter
    const defaultCost = this.defaultUpgradeCosts[upgradeIndex]; //The default cost of the element given by the argument
    return defaultCost * Math.pow(1.1, newUpgradeIndex - 1); //Changes the default cost
  },
  buyUpgrade(upgradeIndex) {
    if (pointService.points < this.getCost(upgradeIndex)) {
      return;
    }
    pointService.points -= this.getCost(upgradeIndex);
    this.timesUpgraded[upgradeIndex]++;
    if (upgradeIndex === 0) {
      pointService.pointsToAddByClick++;
      priceElement[0].innerText = Math.floor(this.getCost(upgradeIndex));
      upgradeLevel[0].innerText = this.timesUpgraded[0];
    } else if (upgradeIndex === 1) {
      pointService.timeBetweenPoints *= 0.9;
      resetInterval();
      priceElement[1].innerText = Math.floor(this.getCost(upgradeIndex));
      upgradeLevel[1].innerText = this.timesUpgraded[1];
      refreshPoints();
    } else if (upgradeIndex === 2) {
      pointService.pointsToAddByTime++;
      resetInterval();
      priceElement[2].innerText = Math.floor(this.getCost(upgradeIndex));
      upgradeLevel[2].innerText = this.timesUpgraded[2];
      refreshPoints();
    }
    refreshPoints();
    this.upgradeLocalStorageSetter();
  },
};
const musicService = {
  soundEffectsOn: false,
  musicOn: false,

  toggleMusic() {
    this.musicOn = !this.musicOn;
    if (this.musicOn === true) {
      document.getElementById("musicOnOff").src = "/images/speaker-icon.svg";
      document.getElementById("backgroundMusic").play();
    } else {
      document.getElementById("musicOnOff").src = "/images/muted-speaker-icon.svg";
      document.getElementById("backgroundMusic").pause();
      document.getElementById("backgroundMusic").currentTime = 0;
    }
  },

  toggleSoundEffects() {
    this.soundEffectsOn = !this.soundEffectsOn;
    if (this.soundEffectsOn === true) {
      document.getElementById("soundEffectOnOff").innerText = 'SFX ON';
    } else {
      document.getElementById("soundEffectOnOff").innerText = 'SFX OFF';
    }
  }
};

const pointService = {
  points: 0,
  pointsToAddByClick: 1,
  pointsToAddByTime: 1,
  pointInterval: null,
  timeBetweenPoints: 2000,
  previousTime: performance.now(),

  addPointsByTime(pointAmount) {
    const timeDifference = performance.now() - this.previousTime;
    const timesAdded = Math.floor(timeDifference / this.timeBetweenPoints);
    this.previousTime += timesAdded * this.timeBetweenPoints;

    this.points += timesAdded * pointAmount;
    localStorage.setItem("cookie-clicker-points", this.points.toString());
    refreshPoints();
  },

  addPointsByClick() {
    this.points += this.pointsToAddByClick;
    localStorage.setItem("cookie-clicker-points", this.points.toString());
    refreshPoints();
    if (musicService.soundEffectsOn === true) {
      document.getElementById("soundEffect").currentTime = 0;
      document.getElementById("soundEffect").play();
    }
  },

};

document.getElementById("cookie").addEventListener("click", () => pointService.addPointsByClick());
document.getElementById("cookie").addEventListener('mousedown', function (e) { e.preventDefault(); }, false);

function refreshPoints() {
  document.getElementById("amountOfPoints").innerText = Math.floor(pointService.points).toString();
}

function refreshUpgrades() {
  upgradeService.timesUpgraded = [0, 0, 0]
  upgradeService.getCost();
}


const upgradeContainer = document.getElementById("upgradeContainer").style;
const openUpgradeMenuButton = document.getElementById("openUpgradesMenu");
let toggleUpgradeMenu = false;

function openUpgradesMenu() {
  toggleUpgradeMenu = !toggleUpgradeMenu;
  if (toggleUpgradeMenu === true) {
    upgradeContainer.display = "flex";
  } else if (toggleUpgradeMenu === false) {
    upgradeContainer.display = "none";
  }
}

openUpgradeMenuButton.addEventListener("click", openUpgradesMenu);

pointService.points = +localStorage.getItem("cookie-clicker-points");

document.getElementById("openResetMenu").addEventListener("click", toggleResetMenu);
document.getElementById("cancelReset").addEventListener("click", closeResetMenu);

let resetProgressMenu = false;
function toggleResetMenu() {
  resetProgressMenu = !resetProgressMenu;
  if (resetProgressMenu === false) {
    document.getElementById("resetProgress").style.display = "none";
  } else {
    document.getElementById("resetProgress").style.display = "block";
  }
}

function closeResetMenu() {
  document.getElementById("resetProgress").style.display = "none";
}

function resetGameData() {
  document.getElementById("resetProgress").style.display = "none";
  localStorage.removeItem("cookie-clicker-points");
  localStorage.removeItem("cookie-clicker-upgrades");
  localStorage.removeItem("cookie-clicker-points-to-add-by-click");
  pointService.points = 0;
  upgradeService.timesUpgraded = [0, 0, 0];
  pointService.pointsToAddByClick = 1;
  pointService.pointsToAddByTime = 1;
  pointService.timeBetweenPoints = 2000;
  clearInterval(pointService.pointInterval);
  refreshPoints();
  refreshDefaultUpgrades();
}

upgradeService.timesUpgraded = JSON.parse(localStorage.getItem("cookie-clicker-upgrades")) || upgradeService.timesUpgraded;

document.getElementById("resetGame").addEventListener("click", resetGameData);
document.getElementById("upgrade1").addEventListener("click", () => upgradeService.buyUpgrade(0));
document.getElementById("upgrade2").addEventListener("click", () => upgradeService.buyUpgrade(1));
document.getElementById("upgrade3").addEventListener("click", () => upgradeService.buyUpgrade(2));

function refreshDefaultUpgrades() {
  priceElement[0].innerText = upgradeService.defaultUpgradeCosts[0];
  priceElement[1].innerText = upgradeService.defaultUpgradeCosts[1];
  priceElement[2].innerText = upgradeService.defaultUpgradeCosts[2];

  upgradeLevel[0].innerText = upgradeService.timesUpgraded[0];
  upgradeLevel[1].innerText = upgradeService.timesUpgraded[1];
  upgradeLevel[2].innerText = upgradeService.timesUpgraded[2];
}

function refreshCurrentUpgrades() {
  document.getElementById("upgrade1").innerText;
}


document.getElementById("toggleMusic").addEventListener("click", () => musicService.toggleMusic());
document.getElementById("toggleSoundEffects").addEventListener("click", () => musicService.toggleSoundEffects());
document.getElementById("musicOnOff").src = "/images/muted-speaker-icon.svg";
document.getElementById("soundEffectOnOff").innerText = "SFX OFF";

pointService.pointsToAddByClick = upgradeService.timesUpgraded[0] + 1;

pointService.timeBetweenPoints = pointService.timeBetweenPoints * Math.pow(0.9, upgradeService.timesUpgraded[1]);
if (upgradeService.timesUpgraded[1] > 0) {
  resetInterval();
}

pointService.pointsToAddByTime = upgradeService.timesUpgraded[2] + 1;

pointService.pointsToAddByClick;
pointService.timeBetweenPoints;
pointService.pointsToAddByTime;
refreshPoints();

priceElement[0].innerText = Math.round(upgradeService.getCost(0)).toString();
priceElement[1].innerText = Math.round(upgradeService.getCost(1)).toString();
priceElement[2].innerText = Math.round(upgradeService.getCost(2)).toString();

upgradeLevel[0].innerText = upgradeService.timesUpgraded[0].toString();
upgradeLevel[1].innerText = upgradeService.timesUpgraded[1].toString();
upgradeLevel[2].innerText = upgradeService.timesUpgraded[2].toString();