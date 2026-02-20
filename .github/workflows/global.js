// GLOBAL SETTINGS LOADER

const defaultSettings = {
  darkMode: false,
  fontSize: 18
};

function applyGlobalSettings(){
  const saved = JSON.parse(localStorage.getItem("vnSettings")) || defaultSettings;

  // Apply dark mode
  document.body.classList.toggle("dark-mode", saved.darkMode);

  // Apply font size
  document.documentElement.style.setProperty("--vnFontSize", saved.fontSize + "px");
}

document.addEventListener("DOMContentLoaded", applyGlobalSettings);
