export const input = document.querySelector("[data-text-field]");
export const addTaskButton = document.querySelector("[data-add-task-btn]");
export const container = document.querySelector("[data-task-container]");
export const searchWrapper = document.querySelector("[data-search-wrapper]");
export const searchButton = document.querySelector("[data-search-button]");
export const searchInput = document.querySelector("[data-search-input]");
export const fragment = document.createDocumentFragment();
const STORAGE_KEY = "taskos";
export const tasksList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const toggleButton = document.querySelector("[data-toggle-button]");
export const toggleImage = document.querySelector("[data-day-static]");
export const body = document.body;

export const dayToNightAnim = "./img/toggle--day-to-night.gif";
export const nightToDayAnim = "./img/toggle--night-to-day.gif";
export const dayStatic = "./img/day-static.webp";
export const nightStatic = "./img/night-static.webp";
export const ANIMATION_DURATION = 700;
export const intervalCheck = 7000;

export const userCurrentTheme = localStorage.getItem("theme");

export const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
};


