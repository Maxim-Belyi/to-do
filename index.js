const input = document.querySelector("[data-text-field]");
const addTaskButton = document.querySelector("[data-add-task-btn]");
const container = document.querySelector("[data-task-container]");
const STORAGE_KEY = "taskos";
const tasksList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
};

const handleAddTask = () => {
  const trimmedValue = input.value.trim();
  if (trimmedValue) {
    const newTask = {
    text: trimmedValue,
    completed: false,
  };
  
  tasksList.push(newTask);
  input.value = "";
  
  saveToLocalStorage();
  render();
  }
}

addTaskButton.addEventListener("click", handleAddTask);
addTaskButton.addEventListener("touchstart", (event) => {
  event.preventDefault;
  handleAddTask();
})


const toggleTaskCompleted = (index) => {

  tasksList[index].completed = !tasksList[index].completed;
  saveToLocalStorage();

  const taskElement = container.querySelector(`[data-index="${index}"]`);

  if (taskElement) {
    const checkbox = taskElement.querySelector(".checkbox-hidden");
    checkbox.checked = tasksList[index].completed;
    taskElement.classList.toggle("completed", tasksList[index].completed);
  }
};



const createElement = (tagName, textContent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;

  return element;
};

const updateTask = (index, newTaskText) => {
  tasksList[index].text = newTaskText;
  saveToLocalStorage();
  render();
};

const removeTask = (index) => {
  tasksList.splice(index, 1);
  saveToLocalStorage();
  render();
};

const editTask = (index, taskElement) => {
  const currentTaskText = tasksList[index].text;
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
    if (typeof task !== "object" || task === null) {
      console.error(
        `Ошибка данных! Задача с индексом ${index} не является объектом.`
      );
      return;
    }

    const taskElement = createElement("div");
    taskElement.classList.add("task-item");
    taskElement.dataset.index = index;

    const uniqueId = `task-${index}`;
    const label = createElement("label");
    label.classList.add("checkbox-custom-label");

    label.htmlFor = uniqueId;
    const checkbox = createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-hidden");
    checkbox.id = uniqueId;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskCompleted(index));

    const customCheckbox = createElement("span");
    customCheckbox.classList.add("checkbox-custom");

    label.append(customCheckbox);

    const taskTextElement = createElement("span", task.text);
    taskTextElement.classList.add("task-text");

    const removeBtn = createElement("button");
    removeBtn.classList.add("delete-button");
    const editTaskButton = createElement("button");
    editTaskButton.classList.add("edit-button");

    editTaskButton.addEventListener("click", () =>
      editTask(index, taskElement)
    );
    removeBtn.addEventListener("click", () => removeTask(index));

    if (task.completed) {
      taskElement.classList.add("completed");
    }

    taskElement.append(checkbox, label, taskTextElement, editTaskButton, removeBtn);
    fragment.append(taskElement);
  });
  container.replaceChildren(fragment);
};
  render();
