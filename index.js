const input = document.querySelector("[data-text-field]");
const addTaskButton = document.querySelector("[data-add-task-btn]");
const container = document.querySelector("[data-task-container]");
const STORAGE_KEY = "taskos";
const tasksList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveToLocalStorage = (tasksList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
};

addTaskButton.addEventListener("click", () => {
  const trimmedValue = input.value.trim();
  if (trimmedValue) {
    tasksList.push(trimmedValue);
    input.value = "";

    saveToLocalStorage();
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
  saveToLocalStorage();
  render();
};

const updateTask = (index, newTaskText) => {
  tasksList[index] = newTaskText;
  saveToLocalStorage();
  render();
};

const editTask = (index, taskElement) => {
  const currentTaskText = tasksList[index];

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentTaskText;
  editInput.classList.add("edited-input", "input");

  taskElement.innerHTML = "";
  taskElement.appendChild(editInput);
  editInput.focus();

  const saveButton = document.createElement("button");
  saveButton.classList.add("button", "save-button");

  saveButton.addEventListener("click", () => {
    if (editInput.value.trim()) {
      updateTask(index, editInput.value.trim());
    }
  });

  taskElement.appendChild(saveButton);

  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && editInput.value.trim()) {
      updateTask(index, editInput.value.trim());
    }
  });
};

const render = () => {
  const fragment = document.createDocumentFragment();
  tasksList.forEach((task, index) => {
    const taskElement = createElement("div", task);
    const removeBtn = createElement("button");
    removeBtn.classList.add("delete-button");

    const editTaskButton = createElement("button");
    editTaskButton.classList.add("edit-button");

    editTaskButton.addEventListener("click", () =>
      editTask(index, taskElement)
    );
    removeBtn.addEventListener("click", () => removeTask(index));

    taskElement.append(editTaskButton, removeBtn);
    fragment.append(taskElement);
  });
  container.replaceChildren(fragment);
};

addTaskButton.addEventListener("click", () => {
  const trimmedValue = input.value.trim();
  if (trimmedValue) {
    tasksList.push(trimmedValue);
    input.value = "";
    saveToLocalStorage();
    render();
  }
})

render();
