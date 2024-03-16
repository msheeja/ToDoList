import * as uiModule from "./uiModule.js";
import * as dataModule from "./dataModule.js";

uiModule.toDoItemInputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    var userEnteredText = uiModule.toDoItemInputText.value;
    if (userEnteredText !== "" && !dataModule.isContains(userEnteredText)) {
      dataModule.taskList.push(new dataModule.task(userEnteredText));
      uiModule.refreshToDoItems(dataModule.taskList);
    }
    uiModule.toDoItemInputText.value = "";
  }
});

uiModule.completeAllTasks.addEventListener("click", () => {
  dataModule.markAllTasksCompleted();
  uiModule.refreshToDoItems(dataModule.taskList);
});

uiModule.clearCompleted.addEventListener("click", () => {
  dataModule.clearAllCompleted();
  uiModule.refreshToDoItems(dataModule.taskList);
});

uiModule.filterAll.addEventListener("click", () => {
  dataModule.setFilterMethod(dataModule.all);
  var filteredTaskList = dataModule.getFilteredTaskList(dataModule.all);
  uiModule.refreshToDoItems(filteredTaskList);
});

uiModule.filterUncomplete.addEventListener("click", () => {
  dataModule.setFilterMethod(dataModule.uncomplete);
  var filteredTaskList = dataModule.getFilteredTaskList(dataModule.uncomplete);
  uiModule.refreshToDoItems(filteredTaskList);
});

uiModule.filterCompleted.addEventListener("click", () => {
  dataModule.setFilterMethod(dataModule.completed);
  var filteredTaskList = dataModule.getFilteredTaskList(dataModule.completed);
  uiModule.refreshToDoItems(filteredTaskList);
});
