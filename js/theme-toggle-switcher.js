import {
    toggleButton,
    toggleImage,
    body,
    nightToDayAnim,
    dayToNightAnim,
    dayStatic,
    nightStatic,
    ANIMATION_DURATION,
    userCurrentTheme,
  } from "./variables.js";

  if (userCurrentTheme === "dark") {
    body.classList.add("dark-theme");
    toggleImage.src = nightStatic;
  } else {
    toggleImage.src = dayStatic;
  }
  
  toggleButton.addEventListener("click", () => {
    if (toggleButton.disabled) {
      return;
    }
    toggleButton.disabled = true;
    const cacheBuster = "?t=" + new Date().getTime();
    const isDarkMode = body.classList.contains("dark-theme");
    if (isDarkMode) {
      
      toggleImage.src = nightToDayAnim + cacheBuster;
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
  
      setTimeout(() => {
        toggleImage.src = dayStatic;
        toggleButton.disabled = false;
      }, ANIMATION_DURATION);
    } else {
      toggleImage.src = dayToNightAnim + cacheBuster;
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
  
      setTimeout(() => {
        toggleImage.src = nightStatic;
        toggleButton.disabled = false;
      }, ANIMATION_DURATION);
    }
  });