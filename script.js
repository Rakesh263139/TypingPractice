// Select elements
const bgMusic = document.getElementById("bg-music");
const playMusicBtn = document.getElementById("play-music-btn");
const pauseMusicBtn = document.getElementById("pause-music-btn");
const restartBtn = document.getElementById("restart-btn");

// Screens
const welcomeScreen = document.getElementById("welcome-screen");
const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");

// Typing Test Inputs
const nameInput = document.getElementById("name-input");
const timerSelect = document.getElementById("timer-select");
const typingInput = document.getElementById("typing-input");
const textToType = document.getElementById("text-to-type");
const timerDisplay = document.getElementById("timer-display");

// Typing Test Results
const resultName = document.getElementById("result-name");
const resultSpeed = document.getElementById("result-speed");
const resultAccuracy = document.getElementById("result-accuracy");

// Audio controls
playMusicBtn.addEventListener("click", () => {
  bgMusic.play();
  playMusicBtn.classList.add("hidden");
  pauseMusicBtn.classList.remove("hidden");
});

pauseMusicBtn.addEventListener("click", () => {
  bgMusic.pause();
  pauseMusicBtn.classList.add("hidden");
  playMusicBtn.classList.remove("hidden");
});

// Restart Typing Test
restartBtn.addEventListener("click", () => {
  // Reset inputs
  nameInput.value = "";
  timerSelect.value = "15";
  typingInput.value = "";
  textToType.textContent = "Loading a fun text for you...";
  timerDisplay.textContent = "Time Left: 0s";

  // Hide result screen and show welcome screen
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
});

// Start Typing Test
document.getElementById("start-test-btn").addEventListener("click", () => {
  const userName = nameInput.value;
  const timerValue = parseInt(timerSelect.value);
  const timerMaxValue = timerValue;
  
  if (userName === "") {
    alert("Please enter your name.");
    return;
  }

  welcomeScreen.classList.add("hidden");
  testScreen.classList.remove("hidden");

  let timer = timerMaxValue;
  let timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      finishTest();
    }
    timer--;
  }, 1000);

  // Example text for typing
  textToType.textContent = "The quick brown fox jumps over the lazy dog.";
  
  // Track typing speed and accuracy
  let startTime = Date.now();
  let charCount = 0;
  let correctChars = 0;
  
  typingInput.addEventListener("input", () => {
    const typedText = typingInput.value;
    charCount = typedText.length;

    // Update speedometer
    const timePassed = (Date.now() - startTime) / 1000; // in seconds
    const wpm = Math.round((charCount / 5) / (timePassed / 60)); // words per minute
    document.getElementById("wpm-display").textContent = `${wpm} WPM`;
    
    // Accuracy calculation
    let correctText = textToType.textContent.slice(0, charCount);
    correctChars = typedText.split("").filter((char, index) => char === correctText[index]).length;
    const accuracy = Math.round((correctChars / charCount) * 100);
    resultAccuracy.querySelector("span").textContent = `${accuracy}%`;
  });
});

// End Test
function finishTest() {
  testScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const userName = nameInput.value;
  resultName.textContent = `Well done, ${userName}!`;
  resultSpeed.querySelector("span").textContent = document.getElementById("wpm-display").textContent;
}
