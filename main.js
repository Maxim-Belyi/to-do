import {
  input,
  addTaskButton,
  container,
  tasksList,
  saveToLocalStorage,
  searchButton,
  searchWrapper,
  searchInput,
} from "./js/variables.js";

import { createElement } from "./js/createElement.js";
import { editTask } from "./js/editTask.js";
import { Sounds } from "./js/sounds.js";

searchButton.addEventListener("click", () => {
  searchWrapper.classList.toggle("active");
  if (searchWrapper.classList.contains("active")) {
    searchInput.focus();
  }

  document.addEventListener("click", (event) => {
    if (!searchWrapper.contains(event.target)) {
      searchWrapper.classList.remove("active");
    }
  });
});

const handleAddTask = () => {
  const trimmedValue = input.value.trim();
  if (trimmedValue) {
    const newTask = {
      text: trimmedValue,
      completed: false,
      createdAt: new Date(),
    };

    tasksList.push(newTask);
    input.value = "";

    Sounds.play("addTask");
    saveToLocalStorage();
    render();
  }
};

addTaskButton.addEventListener("click", handleAddTask);
addTaskButton.addEventListener("touchstart", (event) => {
  event.preventDefault;
  handleAddTask();
});

const toggleTaskCompleted = (index) => {
  tasksList[index].completed = !tasksList[index].completed;
  saveToLocalStorage();

  const taskElement = container.querySelector(`[data-index="${index}"]`);

  if (taskElement) {
    const checkbox = taskElement.querySelector(".checkbox-hidden");
    checkbox.checked = tasksList[index].completed;
    taskElement.classList.toggle("completed", tasksList[index].completed);
    Sounds.play("completedTask");
  }
};

export const updateTask = (index, newTaskText) => {
  tasksList[index].text = newTaskText;
  saveToLocalStorage();
  render();
};

const removeTask = (index) => {
  tasksList.splice(index, 1);
  saveToLocalStorage();
  Sounds.play("deleteTask");
  render();
};

const render = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredTasks = tasksList.filter((task) => {
    return task.text.toLowerCase().includes(searchTerm);
  });
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  filteredTasks.forEach((task, index) => {
    if (typeof task !== "object" || task === null) {
      console.error(
        `Ошибка данных! Задача с индексом ${index} не является объектом.`
      );
      return;
    }
    const originalIndex = tasksList.findIndex(
      (originalTask) => originalTask === task
    );

    const taskElement = createElement("div");
    taskElement.classList.add("task-item");
    taskElement.dataset.index = originalIndex;

    const uniqueId = `task-${originalIndex}`;
    const label = createElement("label");
    label.classList.add("checkbox-custom-label");

    label.htmlFor = uniqueId;
    const checkbox = createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-hidden");
    checkbox.id = uniqueId;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () =>
      toggleTaskCompleted(originalIndex)
    );

    const customCheckbox = createElement("span");
    customCheckbox.classList.add("checkbox-custom");
    label.append(customCheckbox);

    const taskTextElement = createElement("span", task.text);
    taskTextElement.classList.add("task-text");

    const dateElement = createElement("span");
    dateElement.classList.add("task-date");
    if (task.createdAt) {
      dateElement.textContent = new Date(task.createdAt).toLocaleString("eng", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

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

    taskTextElement.append(dateElement);

    taskElement.append(
      checkbox,
      label,
      taskTextElement,
      editTaskButton,
      removeBtn
    );
    fragment.append(taskElement);
  });
  container.replaceChildren(fragment);
};
render();
searchInput.addEventListener("input", render);
