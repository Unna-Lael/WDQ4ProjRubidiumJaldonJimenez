document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // LOAD SAVED SETTINGS
  // =========================

  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const savedFontSize = localStorage.getItem("fontSize") || "18";
  const savedTextSpeed = localStorage.getItem("textSpeed") || "50";
  const savedAutoSpeed = localStorage.getItem("autoSpeed") || "3";

  // Apply dark mode
  if (savedDarkMode) {
    document.body.classList.add("dark-mode");
  }

  // Apply font size globally
  document.documentElement.style.setProperty("--vnFontSize", savedFontSize + "px");

  // =========================
  // SETTINGS PAGE CONTROLS
  // =========================

  const darkToggle = document.getElementById("darkModeToggle");
  const fontSlider = document.getElementById("fontSizeSlider");
  const textSpeedSlider = document.getElementById("textSpeedSlider");
  const autoSpeedSlider = document.getElementById("autoSpeedSlider");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  // Demo boxes
  const fontDemo = document.getElementById("fontDemo");
  const textDemo = document.getElementById("textSpeedDemo");
  const autoDemo = document.getElementById("autoSpeedDemo");

  function hideAllDemos() {
    if (fontDemo) fontDemo.classList.remove("active");
    if (textDemo) textDemo.classList.remove("active");
    if (autoDemo) autoDemo.classList.remove("active");
  }

  // =========================
  // DARK MODE
  // =========================

  if (darkToggle) {
    darkToggle.checked = savedDarkMode;

    darkToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
  }

  // =========================
  // FONT SIZE
  // =========================

  if (fontSlider) {
    fontSlider.value = savedFontSize;

    fontSlider.addEventListener("input", function () {
      document.documentElement.style.setProperty("--vnFontSize", this.value + "px");
      localStorage.setItem("fontSize", this.value);

      hideAllDemos();
      if (fontDemo) {
        fontDemo.style.fontSize = this.value + "px";
        fontDemo.classList.add("active");
      }
    });
  }

  // =========================
  // TEXT SPEED DEMO
  // =========================

  function runTextSpeedDemo(speed) {
    if (!textDemo) return;

    hideAllDemos();
    textDemo.classList.add("active");

    const lines = [
      "Hello!",
      "If you are seeing this, you are adjusting text speed!",
      "I hope you like the game!"
    ];

    let index = 0;

    function showNextLine() {
      textDemo.style.opacity = 0;

      setTimeout(() => {
        textDemo.textContent = lines[index];
        textDemo.style.opacity = 1;
        index = (index + 1) % lines.length;
      }, 300);
    }

    showNextLine();
    clearInterval(textDemo.interval);
    textDemo.interval = setInterval(showNextLine, 2000 - speed * 15);
  }

  if (textSpeedSlider) {
    textSpeedSlider.value = savedTextSpeed;

    textSpeedSlider.addEventListener("input", function () {
      localStorage.setItem("textSpeed", this.value);
      runTextSpeedDemo(parseInt(this.value));
    });
  }

  // =========================
  // AUTO SPEED DEMO
  // =========================

  function runAutoDemo(speed) {
    if (!autoDemo) return;

    hideAllDemos();
    autoDemo.classList.add("active");

    const messages = [
      "Auto mode enabled...",
      "Dialogue progressing automatically...",
      "Next line incoming..."
    ];

    let i = 0;

    function nextMessage() {
      autoDemo.style.opacity = 0;

      setTimeout(() => {
        autoDemo.textContent = messages[i];
        autoDemo.style.opacity = 1;
        i = (i + 1) % messages.length;
      }, 300);
    }

    nextMessage();
    clearInterval(autoDemo.interval);
    autoDemo.interval = setInterval(nextMessage, speed * 1000);
  }

  if (autoSpeedSlider) {
    autoSpeedSlider.value = savedAutoSpeed;

    autoSpeedSlider.addEventListener("input", function () {
      localStorage.setItem("autoSpeed", this.value);
      runAutoDemo(parseInt(this.value));
    });
  }

  // =========================
  // FULLSCREEN
  // =========================

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }

});