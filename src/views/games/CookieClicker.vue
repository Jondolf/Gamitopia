<template>
  <div id="cookie-clicker">
    <h2>Cookie Clicker</h2>
    <div id="clickerContainer">
      <ul id="upgradeContainer">
        <li>
          <button class="upgrades" id="upgrade1">
            Amount of points per click
            <br />Level:
            <span class="upgradeLevel"></span>
            <br />Price:
            <span class="priceElement"></span>
          </button>
        </li>
        <li>
          <button class="upgrades" id="upgrade2">
            Speed of automatic cookies
            <br />Level:
            <span class="upgradeLevel"></span>
            <br />Price:
            <span class="priceElement"></span>
          </button>
        </li>
        <li>
          <button class="upgrades" id="upgrade3">
            Amount of automatic cookies
            <br />Level:
            <span class="upgradeLevel"></span>
            <br />Price:
            <span class="priceElement"></span>
          </button>
        </li>
      </ul>
      <div id="resetProgress">
        <h4>Are you sure you want to reset your progress?</h4>
        <ul>
          <button id="resetGame">Confirm reset</button>
          <button id="cancelReset">Cancel</button>
        </ul>
      </div>
      <div class="cookieClickingContainer">
        <div class="audioContainer">
          <div id="toggleMusic">
            <audio loop="true" id="backgroundMusic">
              <source
                src="@/assets/sound/cookie-clicker-background-music.mp3"
                type="audio/mp3"
              />
            </audio>
            <img id="musicOnOff" />
          </div>
          <button id="openResetMenu">Reset</button>
          <div id="toggleSoundEffects">
            <audio id="soundEffect">
              <source
                src="@/assets/sound/cookie-clicker-sound-effect.mp3"
                type="audio/mp3"
              />
            </audio>
            <span id="soundEffectOnOff"></span>
          </div>
        </div>
        <div class="cookieContainer">
          <p id="points">
            Cookies Baked:
            <span id="amountOfPoints"></span>
          </p>
          <img src="@/assets/images/cookie.png" id="cookie" />
        </div>
        <button id="openUpgradesMenu">
          <p>Open upgrades</p>
        </button>
      </div>
    </div>
    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Click the cookie to bake cookies. Use your baked cookies to buy
          upgrades. Upgrades help you bake more cookies faster. Try to bake as
          many cookies as you can!
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: yes</p>
          <br />
          <p>Fullscreen support: no</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "cookie-clicker",
  components: {},
  mounted() {
    let pointsElement = document.getElementById("amountOfPoints");
    let priceElement = document.getElementsByClassName("priceElement");
    let upgradeLevel = document.getElementsByClassName("upgradeLevel");
    function resetInterval() {
      pointService.previousTime = performance.now();
      clearInterval(pointService.pointInterval!);
      pointService.pointInterval = setInterval(
        () => pointService.addPointsByTime(pointService.pointsToAddByTime),
        Math.max(pointService.timeBetweenPoints, 50)
      );
    }
    const upgradeService = {
      defaultUpgradeCosts: [50, 250, 500],
      timesUpgraded: [0, 0, 0],

      upgradeLocalStorageSetter() {
        localStorage.setItem(
          "cookie-clicker-points",
          pointService.points.toString()
        );
        localStorage.setItem(
          "cookie-clicker-upgrades",
          JSON.stringify(this.timesUpgraded)
        );
      },

      getCost(upgradeIndex: number) {
        const newUpgradeIndex = this.timesUpgraded[upgradeIndex] + 1; //Adds 1 to the times-upgraded counter
        const defaultCost = this.defaultUpgradeCosts[upgradeIndex]; //The default cost of the element given by the argument
        return defaultCost * Math.pow(1.1, newUpgradeIndex - 1); //Changes the default cost
      },
      buyUpgrade(upgradeIndex: number) {
        if (pointService.points < this.getCost(upgradeIndex)) {
          return;
        }
        pointService.points -= this.getCost(upgradeIndex);
        this.timesUpgraded[upgradeIndex]++;
        if (upgradeIndex === 0) {
          pointService.pointsToAddByClick++;
          priceElement[0].innerHTML = Math.floor(
            this.getCost(upgradeIndex)
          ).toString();
          upgradeLevel[0].innerHTML = this.timesUpgraded[0].toString();
        } else if (upgradeIndex === 1) {
          pointService.timeBetweenPoints *= 0.9;
          resetInterval();
          priceElement[1].innerHTML = Math.floor(
            this.getCost(upgradeIndex)
          ).toString();
          upgradeLevel[1].innerHTML = this.timesUpgraded[1].toString();
          refreshPoints();
        } else if (upgradeIndex === 2) {
          pointService.pointsToAddByTime++;
          resetInterval();
          priceElement[2].innerHTML = Math.floor(
            this.getCost(upgradeIndex)
          ).toString();
          upgradeLevel[2].innerHTML = this.timesUpgraded[2].toString();
          refreshPoints();
        }
        refreshPoints();
        this.upgradeLocalStorageSetter();
      }
    };
    const musicService = {
      soundEffectsOn: false,
      musicOn: false,

      toggleMusic() {
        this.musicOn = !this.musicOn;
        const bgMusic = document.getElementById(
          "backgroundMusic"
        )! as HTMLAudioElement;
        const musicOnOffImg = document.getElementById(
          "musicOnOff"
        )! as HTMLImageElement;
        if (this.musicOn === true) {
          musicOnOffImg.src = require("@/assets/images/speaker-icon.svg");
          bgMusic.play();
        } else {
          (document.getElementById(
            "musicOnOff"
          )! as HTMLImageElement).src = require("@/assets/images/muted-speaker-icon.svg");
          bgMusic.pause();
          bgMusic.currentTime = 0;
        }
      },

      toggleSoundEffects() {
        this.soundEffectsOn = !this.soundEffectsOn;
        const sfxOnOff = document.getElementById("soundEffectOnOff")!;
        if (this.soundEffectsOn === true) {
          sfxOnOff.innerText = "SFX ON";
        } else {
          sfxOnOff.innerText = "SFX OFF";
        }
      }
    };
    const pointService = {
      points: 0,
      pointsToAddByClick: 1,
      pointsToAddByTime: 1,
      pointInterval: null as number | null,
      timeBetweenPoints: 2000,
      previousTime: performance.now(),

      addPointsByTime(pointAmount: number) {
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
          const sfx = document.getElementById(
            "soundEffect"
          )! as HTMLAudioElement;
          sfx.currentTime = 0;
          sfx.play();
        }
      }
    };

    document
      .getElementById("cookie")!
      .addEventListener("click", () => pointService.addPointsByClick());
    document.getElementById("cookie")!.addEventListener(
      "mousedown",
      function(e) {
        e.preventDefault();
      },
      false
    );

    function refreshPoints() {
      document.getElementById("amountOfPoints")!.innerText = Math.floor(
        pointService.points
      ).toString();
    }

    function refreshUpgrades() {
      upgradeService.timesUpgraded = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        upgradeService.getCost(i);
      }
    }

    const upgradeContainer = document.getElementById("upgradeContainer")!.style;
    const openUpgradeMenuButton = document.getElementById("openUpgradesMenu");
    let toggleUpgradeMenu = false;

    function openUpgradesMenu() {
      toggleUpgradeMenu = !toggleUpgradeMenu;
      if (toggleUpgradeMenu === true) {
        document.getElementById("openUpgradesMenu")!.innerText =
          "Close upgrades";
        upgradeContainer.display = "flex";
      } else if (toggleUpgradeMenu === false) {
        document.getElementById("openUpgradesMenu")!.innerText =
          "Open upgrades";
        upgradeContainer.display = "none";
      }
    }

    openUpgradeMenuButton!.addEventListener("click", openUpgradesMenu);

    pointService.points = +localStorage.getItem("cookie-clicker-points")!;

    document
      .getElementById("openResetMenu")!
      .addEventListener("click", toggleResetMenu);
    document
      .getElementById("cancelReset")!
      .addEventListener("click", closeResetMenu);

    let resetProgressMenu = false;
    function toggleResetMenu() {
      resetProgressMenu = !resetProgressMenu;
      if (resetProgressMenu === false) {
        document.getElementById("resetProgress")!.style.display = "none";
      } else {
        document.getElementById("resetProgress")!.style.display = "block";
      }
    }

    function closeResetMenu() {
      document.getElementById("resetProgress")!.style.display = "none";
    }

    function resetGameData() {
      document.getElementById("resetProgress")!.style.display = "none";
      localStorage.removeItem("cookie-clicker-points");
      localStorage.removeItem("cookie-clicker-upgrades");
      localStorage.removeItem("cookie-clicker-points-to-add-by-click");
      pointService.points = 0;
      upgradeService.timesUpgraded = [0, 0, 0];
      pointService.pointsToAddByClick = 1;
      pointService.pointsToAddByTime = 1;
      pointService.timeBetweenPoints = 2000;
      clearInterval(pointService.pointInterval!);
      refreshPoints();
      refreshDefaultUpgrades();
    }

    upgradeService.timesUpgraded =
      JSON.parse(localStorage.getItem("cookie-clicker-upgrades")!) ||
      upgradeService.timesUpgraded;

    document
      .getElementById("resetGame")!
      .addEventListener("click", resetGameData);
    document
      .getElementById("upgrade1")!
      .addEventListener("click", () => upgradeService.buyUpgrade(0));
    document
      .getElementById("upgrade2")!
      .addEventListener("click", () => upgradeService.buyUpgrade(1));
    document
      .getElementById("upgrade3")!
      .addEventListener("click", () => upgradeService.buyUpgrade(2));

    function refreshDefaultUpgrades() {
      priceElement[0].innerHTML = upgradeService.defaultUpgradeCosts[0].toString();
      priceElement[1].innerHTML = upgradeService.defaultUpgradeCosts[1].toString();
      priceElement[2].innerHTML = upgradeService.defaultUpgradeCosts[2].toString();

      upgradeLevel[0].innerHTML = upgradeService.timesUpgraded[0].toString();
      upgradeLevel[1].innerHTML = upgradeService.timesUpgraded[1].toString();
      upgradeLevel[2].innerHTML = upgradeService.timesUpgraded[2].toString();
    }

    function refreshCurrentUpgrades() {
      document.getElementById("upgrade1")!.innerText;
    }

    document
      .getElementById("toggleMusic")!
      .addEventListener("click", () => musicService.toggleMusic());
    document
      .getElementById("toggleSoundEffects")!
      .addEventListener("click", () => musicService.toggleSoundEffects());
    (document.getElementById(
      "musicOnOff"
    )! as HTMLAudioElement).src = require("@/assets/images/muted-speaker-icon.svg");
    document.getElementById("soundEffectOnOff")!.innerText = "SFX OFF";

    pointService.pointsToAddByClick = upgradeService.timesUpgraded[0] + 1;

    pointService.timeBetweenPoints =
      pointService.timeBetweenPoints *
      Math.pow(0.9, upgradeService.timesUpgraded[1]);
    if (upgradeService.timesUpgraded[1] > 0) {
      resetInterval();
    }

    pointService.pointsToAddByTime = upgradeService.timesUpgraded[2] + 1;

    pointService.pointsToAddByClick;
    pointService.timeBetweenPoints;
    pointService.pointsToAddByTime;
    refreshPoints();

    priceElement[0].innerHTML = Math.round(
      upgradeService.getCost(0)
    ).toString();
    priceElement[1].innerHTML = Math.round(
      upgradeService.getCost(1)
    ).toString();
    priceElement[2].innerHTML = Math.round(
      upgradeService.getCost(2)
    ).toString();

    upgradeLevel[0].innerHTML = upgradeService.timesUpgraded[0].toString();
    upgradeLevel[1].innerHTML = upgradeService.timesUpgraded[1].toString();
    upgradeLevel[2].innerHTML = upgradeService.timesUpgraded[2].toString();
  }
});
</script>

<style lang="scss">
@import "@/global.scss";
#cookie-clicker {
  padding-top: 66px;
}

body {
  --upgrades: rgb(55, 76, 194);
  --clickingContainer: rgb(100, 181, 246);
}

.darkMode #cookie-clicker {
  --upgrades: #17223b;
  --clickingContainer: #263859;
  #toggleSoundEffects {
    color: black;
  }
}

h2 {
  margin: 30px;
}

#clickerContainer {
  display: flex;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--clickingContainer);
  width: 70%;
  margin: 30px auto;
  padding: 0;
  touch-action: manipulation;
}

#cookieContainer p {
  margin: 20px auto 0px auto;
}

#clickerContainer {
  display: flex;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--clickingContainer);
  width: 70%;
  margin: 30px auto;
  padding: 0;
  touch-action: manipulation;
}

#openResetMenu {
  border: 1px solid black;
  width: 20%;
  height: 35px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#resetProgress {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  background-color: rgb(26, 35, 126);
  color: white;
  z-index: 2;
  padding: 20px, 0, 0, 0;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid black;
}

#resetProgress h4 {
  padding: 10px;
}

#resetProgress button {
  width: 50%;
  color: black;
  border: none;
  font-size: 20px;
  font-family: Nunito;
  background-color: rgb(197, 202, 233);
}

#resetProgress ul {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(197, 202, 233);
}

.audioContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  padding: 10px;
}

#musicOnOff,
#soundEffectOnOff {
  width: 70%;
  border-radius: 50%;
}

#toggleMusic,
#toggleSoundEffects {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
}

#points {
  font-size: 20px;
}

#cookie {
  width: 60%;
  border-radius: 33%;
  margin: 20px auto 10px auto;
}

.cookieClickingContainer {
  width: 60%;
  position: relative;
}

.cookieContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
}

#upgradeContainer {
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
  width: 40%;
  text-align: left;
}

#upgradeContainer li {
  list-style: none;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
}

.upgrades {
  color: white;
  width: 100%;
  height: 100%;
  border: none;
  text-align: left;
  line-height: 25px;
  font-size: 16px;
  padding: 0 10px 0 10px;
  background-color: var(--upgrades);
}

#openUpgradesMenu {
  display: none;
}

.description {
  width: 70%;
  display: flex;
  background-color: var(--secondary-color);
  border-radius: 5px;
  margin: 50px auto;
  color: white;
  text-align: left;
  position: relative;
}

.description h3 {
  margin-bottom: 15px;
}

.mainDescription,
.otherDescription {
  padding: 20px;
  list-style: none;
  box-sizing: border-box;
}

.mainDescription {
  width: 60%;
  border-right: 1px solid;
}

.otherDescription {
  width: 40%;
  height: 100%;
}

.otherDescription li {
  list-style: none;
}

.madeWith {
  padding: 20px;
  height: 100%;
}

.otherInfo {
  padding: 20px;
  height: 100%;
}

@media only screen and (max-width: 800px) {
  #upgradeContainer {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    z-index: 2;
  }
  .cookieClickingContainer {
    width: 100%;
  }
  #cookie {
    margin-bottom: 70px;
  }
  #openUpgradesMenu {
    display: block;
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--secondary-color);
    border: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
    font-size: 16px;
    font-family: Nunito, sans-serif;
  }
}

@media only screen and (max-width: 620px) {
  .description {
    flex-direction: column;
    padding: 10px;
  }
  .mainDescription {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid;
    padding: 20px;
  }
  .otherDescription {
    width: 100%;
    padding: 0;
  }
}

@media only screen and (max-width: 550px) {
  #resetProgress ul button {
    font-size: 16px;
  }
}

@media only screen and (max-width: 500px) {
  #toggleMusic,
  #toggleSoundEffects {
    width: 40px;
    height: 40px;
  }
  #soundEffectOnOff {
    font-size: 12px;
  }
  #openResetMenu {
    font-size: 12px;
    width: 25%;
  }
  #resetProgress {
    font-size: 14px;
  }
}

@media only screen and (max-width: 460px) {
  #resetProgress ul button {
    font-size: 12px;
  }
  #openResetMenu {
    font-size: 12px;
    width: 25%;
  }
  .description p {
    font-size: 14px;
  }
}

@media only screen and (max-width: 360px) {
  .upgrades {
    font-size: 14px;
  }
}
</style>
