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
  removeHighlightsFromWhatToRandomizeMenu()
  highlightWhatToRandomizeMenuElement(0);
  numRangeResult.className = "result";
  headsOrTailsResult.className = "hide";
  rollDiceResult.className = "hide";
  numberRange.style.display = "flex";
  randomizerButton.addEventListener("click", getRandomNumber);
  sliderElement = document.getElementById("slider");
  sliderValue = sliderElement.value;
  document.getElementById("slider-value").innerText = sliderValue;

  numRange = +document.getElementById("slider-value").innerText

  function getRandomNumber() {
    randomNumber = Math.floor(Math.random() * (numRange + 1));
    numRangeResult.innerHTML = randomNumber;
  }

  sliderElement.oninput = function () {
    document.getElementById("slider-value").innerText = this.value;
    numRange = +this.value;
  }
}


function showHeadsOrTails() {
  removeHighlightsFromWhatToRandomizeMenu()
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
      headsOrTailsResult.innerText = "Tails"
    }
  }
}

function rollDice() {
  removeHighlightsFromWhatToRandomizeMenu()
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
        diceImg[one].className = "dice-img-hide"
        diceImg[two].className = "dice-img-hide";
        diceImg[three].className = "dice-img-hide";
        diceImg[four].className = "dice-img-hide";
        diceImg[five].className = "dice-img-hide";
      }
      if (randomNum === 1) {
        hideDice(1, 2, 3, 4, 5);
        diceImg[0].classList.add("dice-img-show")
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
    setTimeout(function () {
      setImg();
      setTimeout(function () {
        setImg();
        setTimeout(function () {
          setImg();
          setTimeout(function () {
            setImg();
            setTimeout(function () {
              setImg();
            }, 250)
          }, 150)
        }, 100)
      }, 100)
    }, 100)
  }
}

whatToRandomize[0].addEventListener("click", showNumberRange);
whatToRandomize[1].addEventListener("click", showHeadsOrTails)
whatToRandomize[2].addEventListener("click", rollDice);
showNumberRange();

openWhatToRandomizeMenuToggle = true;
function openWhatToRandomizeMenu() {
  openWhatToRandomizeMenuToggle = !openWhatToRandomizeMenuToggle;
  if (openWhatToRandomizeMenuToggle === true) {
    document.getElementById("what-to-randomize-menu-container").style.display = "block";
  } else {
    document.getElementById("what-to-randomize-menu-container").style.display = "none";
  }
}

fullscreenToggle = false;
function toggleFullscreen() {
  fullscreenToggle = !fullscreenToggle;
  if (fullscreenToggle === true) {
    document.getElementById("randomizer-container").className = "fullscreen-randomizer";
  } else {
    document.getElementById("randomizer-container").className = "randomizer-container";
  }
}

document.getElementById("open-what-to-randomize-menu").addEventListener("click", openWhatToRandomizeMenu);
document.getElementById("fullscreen").addEventListener("click", toggleFullscreen);
openWhatToRandomizeMenu();