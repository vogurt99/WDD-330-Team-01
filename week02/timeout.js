const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');

let timeLeft = 10;
let intervalId = null;

startButton.addEventListener('click', () => {

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (timeLeft >= 0) {
      countdownDisplay.textContent = timeLeft;
      timeLeft--;
    } else {
      clearInterval(intervalId);
      countdownDisplay.textContent = "Time's up! :)";
    }
  }, 1000);
});
