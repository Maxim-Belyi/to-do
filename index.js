const input = document.querySelector("[data-text-field]");
const addTaskButton = document.querySelector("[data-add-task-btn]");
const container = document.querySelector("[data-task-container]");
const tasksList = JSON.parse(localStorage.getItem("taskos")) || [];

const saveToLocalStorage = tasksList => {
  localStorage.setItem(tasksList, JSON.stringify(tasksList));
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

  // editInput.addEventListener = ("blur", () => {
  //   setTimeout(() => {
  //     if (document.body.contains(editInput)) {
  //       render();
  //     }
  //   }, 100);
  // });

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
  container.innerHTML = "";
  tasksList.forEach((task, index) => {
    const taskElement = createElement("div", task);
    const removeBtn = createElement("button");
    const editTaskButton = createElement("button");

    editTaskButton.classList.add("edit-button");
    removeBtn.classList.add("delete-button");

    editTaskButton.addEventListener("click", () => editTask(index, taskElement));
    removeBtn.addEventListener("click", () => removeTask(index));

    taskElement.append(editTaskButton, removeBtn);
    container.append(taskElement);
  });
};

render();
