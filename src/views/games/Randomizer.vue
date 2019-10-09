<template>
  <div id="randomizer">
    <h2 id="randomizer-header">Randomizer</h2>
    <div class="randomizer-container" id="randomizer-container">
      <div class="header-container">
        <h2>Press the button to randomize!</h2>
      </div>
      <div class="top-img-container">
        <img src="@/assets/images/hamburger-menu-icon.png" id="open-what-to-randomize-menu" />
        <img src="@/assets/images/toggle-fullscreen-icon.png" id="fullscreen" />
      </div>
      <div id="what-to-randomize-menu-container">
        <ul>
          <li class="what-to-randomize">Number Range</li>
          <li class="what-to-randomize">Heads or Tails</li>
          <li class="what-to-randomize">Roll Dice</li>
        </ul>
      </div>
      <div id="num-range-result" class="result"></div>
      <div id="heads-or-tails-result" class="result"></div>
      <div id="roll-dice-result" class="result">
        <img src="@/assets/images/num-1-dice.jpg" class="dice-img-hide" />
        <img src="@/assets/images/num-2-dice.jpg" class="dice-img-hide" />
        <img src="@/assets/images/num-3-dice.jpg" class="dice-img-hide" />
        <img src="@/assets/images/num-4-dice.jpg" class="dice-img-hide" />
        <img src="@/assets/images/num-5-dice.jpg" class="dice-img-hide" />
        <img src="@/assets/images/num-6-dice.jpg" class="dice-img-hide" />
      </div>
      <div class="randomizer-button-container">
        <button id="randomizer-button">Randomize</button>
      </div>
      <div id="randomizer-settings">
        <input type="range" max="1000" min="0" value="10" id="slider" />
        <span id="slider-value"></span>
      </div>
    </div>
    <div id="main-other">
      <div class="description">
        <div class="mainDescription">
          <h3>Description</h3>
          <p>
            Press the button in the bottom to randomize. Click the menu button
            to open a small list of things to randomize. Click on a list item
            and press the randomizer button to randomize.
            <br />
            <br />Number Range: Get a random number from 0 to 10 (with default
            settings). You can move the slider below the randomizer button to
            change the range of numbers to randomize, for example 0 to 100 or 0
            to 255.
            <br />
            <br />Heads or Tails: Get either heads or tails. This could be
            useful if you have to decide between two things. For example, should
            I eat pizza or lasagna? Heads or tails?
            <br />
            <br />Roll Dice: Get a random number (shown on the dice) between 1
            and 6. This could be useful, for example, if you want to play board
            games but don't have a dice with you.
          </p>
        </div>
        <div class="otherDescription">
          <div class="madeWith">
            <h3>Made with:</h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div class="otherInfo">
            <h3>Other Info</h3>
            <p>Dark mode support: no</p>
            <br />
            <p>Fullscreen support: yes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import Vue from "vue";
export default Vue.extend({
  name: "randomizer",
  components: {},
  mounted() {
    let whatToRandomize = document.getElementsByClassName("what-to-randomize");
    let numRangeResult = document.getElementById("num-range-result");
    let headsOrTailsResult = document.getElementById("heads-or-tails-result");
    let rollDiceResult = document.getElementById("roll-dice-result");
    let randomizerButton = document.getElementById("randomizer-button");

    let numberRange = document.getElementById("randomizer-settings");

    function removeHighlightsFromWhatToRandomizeMenu() {
      whatToRandomize[0].classList.remove("highlight");
      whatToRandomize[1].classList.remove("highlight");
      whatToRandomize[2].classList.remove("highlight");
    }

    function highlightWhatToRandomizeMenuElement(index) {
      whatToRandomize[index].classList.add("highlight");
    }

    function showNumberRange() {
      removeHighlightsFromWhatToRandomizeMenu();
      highlightWhatToRandomizeMenuElement(0);
      numRangeResult.className = "result";
      headsOrTailsResult.className = "hide";
      rollDiceResult.className = "hide";
      numberRange.style.display = "flex";
      randomizerButton.addEventListener("click", getRandomNumber);
      let sliderElement = document.getElementById("slider");
      let sliderValue = sliderElement.value;
      document.getElementById("slider-value").innerText = sliderValue;

      let numRange = +document.getElementById("slider-value").innerText;

      function getRandomNumber() {
        const randomNumber = Math.floor(Math.random() * (numRange + 1));
        numRangeResult.innerHTML = randomNumber;
      }

      sliderElement.oninput = function() {
        document.getElementById("slider-value").innerText = this.value;
        numRange = +this.value;
      };
    }

    function showHeadsOrTails() {
      removeHighlightsFromWhatToRandomizeMenu();
      highlightWhatToRandomizeMenuElement(1);
      randomizerButton.addEventListener("click", getRandomNumber);
      numRangeResult.className = "hide";
      headsOrTailsResult.className = "result";
      rollDiceResult.className = "hide";
      numberRange.style.display = "none";
      document.getElementById("randomizer-button").style.display = "block";
      function getRandomNumber() {
        let randomNum = Math.round(Math.random());
        if (randomNum === 0) {
          headsOrTailsResult.innerText = "Heads";
        } else {
          headsOrTailsResult.innerText = "Tails";
        }
      }
    }

    function rollDice() {
      removeHighlightsFromWhatToRandomizeMenu();
      highlightWhatToRandomizeMenuElement(2);
      numRangeResult.className = "hide";
      headsOrTailsResult.className = "hide";
      rollDiceResult.className = "result";
      numberRange.style.display = "none";
      randomizerButton.addEventListener("click", getRandomNumber);
      function getRandomNumber() {
        function setImg() {
          let diceImg = document.getElementsByClassName("dice-img-hide");
          let randomNum = Math.round(Math.random() * 5 + 1);
          function hideDice(one, two, three, four, five) {
            diceImg[one].className = "dice-img-hide";
            diceImg[two].className = "dice-img-hide";
            diceImg[three].className = "dice-img-hide";
            diceImg[four].className = "dice-img-hide";
            diceImg[five].className = "dice-img-hide";
          }
          if (randomNum === 1) {
            hideDice(1, 2, 3, 4, 5);
            diceImg[0].classList.add("dice-img-show");
          } else if (randomNum === 2) {
            hideDice(0, 2, 3, 4, 5);
            diceImg[1].classList.add("dice-img-show");
          } else if (randomNum === 3) {
            hideDice(0, 1, 3, 4, 5);
            diceImg[2].classList.add("dice-img-show");
          } else if (randomNum === 4) {
            hideDice(0, 1, 2, 4, 5);
            diceImg[3].classList.add("dice-img-show");
          } else if (randomNum === 5) {
            hideDice(0, 1, 2, 3, 5);
            diceImg[4].classList.add("dice-img-show");
          } else if (randomNum === 6) {
            hideDice(0, 1, 2, 3, 4);
            diceImg[5].classList.add("dice-img-show");
          }
        }
        setTimeout(function() {
          setImg();
          setTimeout(function() {
            setImg();
            setTimeout(function() {
              setImg();
              setTimeout(function() {
                setImg();
                setTimeout(function() {
                  setImg();
                }, 250);
              }, 150);
            }, 100);
          }, 100);
        }, 100);
      }
    }

    whatToRandomize[0].addEventListener("click", showNumberRange);
    whatToRandomize[1].addEventListener("click", showHeadsOrTails);
    whatToRandomize[2].addEventListener("click", rollDice);
    showNumberRange();

    let openWhatToRandomizeMenuToggle = true;
    function openWhatToRandomizeMenu() {
      openWhatToRandomizeMenuToggle = !openWhatToRandomizeMenuToggle;
      if (openWhatToRandomizeMenuToggle === true) {
        document.getElementById(
          "what-to-randomize-menu-container"
        ).style.display = "block";
      } else {
        document.getElementById(
          "what-to-randomize-menu-container"
        ).style.display = "none";
      }
    }

    let fullscreenToggle = false;
    function toggleFullscreen() {
      fullscreenToggle = !fullscreenToggle;
      if (fullscreenToggle === true) {
        document.getElementById("randomizer-container").className =
          "fullscreen-randomizer";
      } else {
        document.getElementById("randomizer-container").className =
          "randomizer-container";
      }
    }

    document
      .getElementById("open-what-to-randomize-menu")
      .addEventListener("click", openWhatToRandomizeMenu);
    document
      .getElementById("fullscreen")
      .addEventListener("click", toggleFullscreen);
    openWhatToRandomizeMenu();
  }
});
</script>

<style lang="scss">
@import "@/global.scss";
#randomizer {
  padding-top: 66px;
}

h2 {
  margin: 30px;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.fullscreen-randomizer {
  position: fixed;
  z-index: 15;
  margin: 0;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0;
  touch-action: manipulation;
  font-family: Nunito;
  background: linear-gradient(135deg, #1099bb, #2c2e83);
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hide {
  display: none;
}

.highlight {
  font-weight: 900;
  color: black;
}

.randomizer-container {
  text-align: left;
  border: 1px solid black;
  border-radius: 5px;
  width: 70%;
  margin: 30px auto;
  padding: 0;
  touch-action: manipulation;
  font-family: Nunito;
  background: linear-gradient(135deg, #1099bb, #2c2e83);
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-container {
  position: absolute;
  left: 50%;
  width: 71%;
  margin-top: 30px;
}

.top-img-container {
  display: flex;
  justify-content: space-between;
}

.top-img-container img {
  width: 40px;
  height: 40px;
  margin: 30px;
  z-index: 2;
}

.dice-img-hide {
  display: none;
}

.dice-img-show {
  display: flex;
}

#randomizer-container h2 {
  left: -50%;
  position: relative;
  text-align: center;
  margin: auto;
  color: white;
  width: 100%;
}

#what-to-randomize-menu-container {
  display: none;
  position: absolute;
  padding: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 30%;
  background-color: rgba(255, 255, 255, 0.5);
  font-weight: lighter;
  color: #505050;
  box-sizing: border-box;
  margin-top: 15%;
}

#what-to-randomize-menu-container:hover {
  cursor: default;
}

#what-to-randomize-menu-container ul li {
  list-style: none;
}

.result {
  width: 60%;
  height: 330px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 100px;
}

.result:hover {
  cursor: default;
}

.result img {
  width: 20%;
  border: 3px solid black;
  border-radius: 15%;
}

#randomizer-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 40px;
  margin: 0 auto 10px auto;
  width: 100%;
}

#slider,
#slider:focus {
  -webkit-appearance: none;
  width: 50%;
  height: 10px;
  opacity: 0.5;
  border-radius: 10px;
  outline: none;
}

#slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background: rgb(16, 34, 133);
  cursor: pointer;
  border-radius: 50%;
}

#slider-value {
  color: white;
}

.randomizer-button-container {
  text-align: center;
  margin-bottom: 30px;
}

#randomizer-button {
  width: 30%;
  border: none;
  margin: auto;
  padding: 10px;
  border-radius: 8px;
  font-size: 17px;
  font-family: Nunito;
  background-color: rgba(255, 255, 255, 0.5);
}

#randomizer-button,
#randomizer-button:focus,
#randomizer-button:active {
  outline: none;
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

@media only screen and (max-width: 850px) {
  #randomizer-container .header-container {
    font-size: 13px;
    margin-top: 20px;
  }
  .top-img-container img {
    width: 30px;
    height: 30px;
    margin: 20px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 14px;
  }
  .result {
    font-size: 70px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 22px;
    margin-bottom: 25px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 35px;
    height: 35px;
    margin: 25px;
  }
  .fullscreen-randomizer .result {
    font-size: 90px;
  }
}

@media only screen and (max-width: 675px) {
  .header-container {
    font-size: 12px;
  }
  .top-img-container img {
    width: 25px;
    height: 25px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 12px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 28px;
    margin-bottom: 22px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 35px;
    height: 35px;
    margin: 22px;
  }
  .fullscreen-randomizer .result {
    font-size: 85px;
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
  #randomizer-container .header-container {
    font-size: 12px;
    margin-top: 18px;
  }
  .top-img-container img {
    margin: 18px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 11px;
  }
  .result {
    font-size: 65px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 30px;
    height: 30px;
    margin: 20px;
  }
  .fullscreen-randomizer .result {
    font-size: 80px;
  }
}

@media only screen and (max-width: 550px) {
  #randomizer-container .header-container {
    font-size: 10px;
    margin-top: 18px;
  }
  .top-img-container img {
    width: 23px;
    height: 23px;
    margin: 18px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 12px;
    border-radius: 0;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 12px;
  }
  .result {
    font-size: 55px;
    height: 250px;
  }
}

@media only screen and (max-width: 500px) {
  #randomizer-container .header-container {
    font-size: 9px;
    margin-top: 16px;
  }
  .top-img-container img {
    width: 20px;
    height: 20px;
    margin: 16px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 11px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 11px;
  }
  .result {
    font-size: 50px;
    height: 225px;
  }
  #randomizer-button {
    font-size: 15px;
    padding: 6px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 16px;
    margin-bottom: 18px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 28px;
    height: 28px;
    margin: 18px;
  }
  .fullscreen-randomizer .result {
    font-size: 75px;
  }
}

@media only screen and (max-width: 440px) {
  #randomizer-container .header-container {
    font-size: 8px;
    margin-top: 10px;
  }
  .top-img-container img {
    width: 18px;
    height: 18px;
    margin: 8px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 10px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 10px;
  }
  .result {
    font-size: 45px;
    height: 220px;
  }
  #randomizer-button {
    font-size: 12px;
    padding: 5px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 14px;
    margin-top: 18px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 28px;
    height: 28px;
    margin: 18px;
  }
  .fullscreen-randomizer .result {
    font-size: 75px;
  }
}

@media only screen and (max-width: 360px) {
  #randomizer-container .header-container {
    font-size: 7px;
    margin-top: 6px;
  }
  .top-img-container img {
    width: 16px;
    height: 16px;
    margin: 6px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 8px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 10px;
  }
  .result {
    font-size: 30px;
    height: 200px;
  }
  #randomizer-button {
    font-size: 10px;
    padding: 5px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 26px;
    height: 26px;
    margin: 16px;
  }
  .fullscreen-randomizer .result {
    font-size: 70px;
  }
}
</style>
