import * as dataModule from "./dataModule.js";

const toDoItemInputText = document.getElementById("toDoItemInputText");
const toDoList = document.getElementById("toDoList");
const status = document.getElementById("status");
const completeAllTasks = document.getElementById("completeAllTasks");
const clearCompleted = document.getElementById("clearCompleted");
const filterAll = document.getElementById("filterAll");
const filterUncomplete = document.getElementById("filterUncomplete");
const filterCompleted = document.getElementById("filterCompleted");

function refreshToDoItems(taskList) {
  toDoList.replaceChildren();
  for (var task of taskList) {
    createTaskListItem(task);
  }
  updateNumberOfPendingTasks();
  if (taskList.length === 0) {
    displayNoTasks();
  }
  updateFilterStyle();
}

function updateFilterStyle() {
  if (dataModule.filterMethod == dataModule.uncomplete) {
    filterAll.setAttribute("style", "text-decoration: none");
    filterUncomplete.setAttribute("style", "text-decoration: underline");
    filterCompleted.setAttribute("style", "text-decoration: none");
  } else if (dataModule.filterMethod == dataModule.completed) {
    filterAll.setAttribute("style", "text-decoration: none");
    filterUncomplete.setAttribute("style", "text-decoration: none");
    filterCompleted.setAttribute("style", "text-decoration: underline");
  } else {
    filterAll.setAttribute("style", "text-decoration: underline");
    filterUncomplete.setAttribute("style", "text-decoration: none");
    filterCompleted.setAttribute("style", "text-decoration: none");
  }
}

function displayNoTasks() {
  const toDoItem = createDivElement("toDoItem");

  const toDoItemText = createDivElement("toDoItemText");
  toDoItemText.textContent = "No tasks to display";

  toDoItem.appendChild(toDoItemText);
  toDoList.appendChild(toDoItem);
}

function createTaskListItem(task) {
  const toDoItem = createDivElement("toDoItem");

  const toDoItemText = createDivElement("toDoItemText");
  toDoItemText.textContent = task.name;

  const toDoItemAction = createDivElement("toDoItemAction");

  const iconCompleted = document.createElement("i");
  iconCompleted.classList.add("fa-solid");
  iconCompleted.classList.add("fa-check-double");
  setStyleForCompleted(iconCompleted, task.isCompleted);
  iconCompleted.addEventListener("click", (event) =>
    markCompleted(task, event)
  );

  const iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid");
  iconTrash.classList.add("fa-trash-can");
  iconTrash.addEventListener("click", () => {
    dataModule.removeTask(task.name);
    refreshToDoItems(dataModule.getFilteredTaskList());
  });

  toDoItemAction.appendChild(iconCompleted);
  toDoItemAction.appendChild(iconTrash);
  toDoItem.appendChild(toDoItemText);
  toDoItem.appendChild(toDoItemAction);

  toDoList.appendChild(toDoItem);
}

function createDivElement(className) {
  var divElement = document.createElement("div");
  divElement.classList.add(className);
  return divElement;
}

function markCompleted(task, event) {
  task.isCompleted = !task.isCompleted;
  dataModule.updateList(task);
  setStyleForCompleted(event.target, task.isCompleted);
  updateNumberOfPendingTasks();
}

function setStyleForCompleted(item, isCompleted) {
  item.setAttribute(
    "style",
    isCompleted
      ? "color: var(--doc-todo-item-completed-color)"
      : "color: var(--doc-body-font-color)"
  );
}

function updateNumberOfPendingTasks() {
  var numOfTasksPending = dataModule.getNumberOfPendingTasks();
  status.textContent = `${numOfTasksPending} tasks left`;
}

export {
  toDoItemInputText,
  completeAllTasks,
  clearCompleted,
  filterAll,
  filterUncomplete,
  filterCompleted,
  refreshToDoItems,
};
