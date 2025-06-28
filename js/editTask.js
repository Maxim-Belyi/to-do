import { tasksList } from "./variables.js";
import { updateTask } from "../main.js";

export const editTask = (index, taskElement) => {
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
