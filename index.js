const input = document.querySelector("[data-text-field]");
const addTaskButton = document.querySelector("[data-add-task-btn]");
const container = document.querySelector("[data-task-container]");

const tasksList = JSON.parse(localStorage.getItem("taskos")) || [];

const saveToLovalStorage = (key = "taskos") => {
  localStorage.setItem("taskos", JSON.stringify(tasksList));
};

addTaskButton.addEventListener("click", () => {
  if (input.value.trim()) {
    tasksList.push(input.value);
    input.value = "";

    saveToLovalStorage();
    render();
  }
});

const createElement = (tagName, textContent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;

  return element;
};

const removeTask = (index) => {
  tasksList.splice(index, 1);
  saveToLovalStorage();
  render();
};

const render = () => {
  container.innerHTML = "";
  tasksList.forEach((task, index) => {
    const taskElement = createElement("div", task);
    const removeBtn = createElement("button", "Delete task");
    removeBtn.addEventListener('click', () => removeTask(index))
    taskElement.append(removeBtn);
    container.append(taskElement);
  });
};

render();
