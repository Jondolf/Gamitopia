let darkModeOnOff = true;
function darkModeOnOffBoolean() {
  if (localStorage.getItem("darkMode") === "true") {
    darkModeOnOff = true
  } else {
    darkModeOnOff = false;
  }
}
let bodyElement = document.getElementsByTagName("body");

function toggleDarkMode() {
  darkModeOnOffBoolean();
  darkModeOnOff = !darkModeOnOff;
  localStorage.setItem("darkMode", darkModeOnOff);

  if (localStorage.getItem("darkMode") === "true") {
    bodyElement[0].classList.add("darkMode");
    document.getElementById("darkModeButton").src = "/images/turnDarkModeOff.png";
  } else if (localStorage.getItem("darkMode") === "false") {
    bodyElement[0].classList.remove("darkMode");
    document.getElementById("darkModeButton").src = "/images/turnDarkModeOn.png";
  }
}

document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);

if (localStorage.getItem("darkMode") === "true") {
  bodyElement[0].classList.add("darkMode");
  document.getElementById("darkModeButton").src = "/images/turnDarkModeOff.png";
} else if (localStorage.getItem("darkMode") === "false") {
  bodyElement[0].classList.remove("darkMode");
  document.getElementById("darkModeButton").src = "/images/turnDarkModeOn.png";
}