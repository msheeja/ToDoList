class task {
  name;
  isCompleted;

  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
}

const all = "All";
const uncomplete = "Uncomplete";
const completed = "Completed";

var taskList = [];
var filterMethod = all;

function setFilterMethod(method) {
  filterMethod = method;
}

function removeTask(taskName) {
  taskList = taskList.filter((item) => item.name !== taskName);
}

function isContains(taskName) {
  return taskList.filter((item) => item.name === taskName).length > 0;
}

function updateList(task) {
  taskList.filter((item) => item.name === task.name).isCompleted =
    task.isCompleted;
}
function getNumberOfPendingTasks() {
  return getAllPendingTasks().length;
}

function getAllCompletedTasks() {
  return taskList.filter((item) => item.isCompleted);
}

function getAllPendingTasks() {
  return taskList.filter((item) => !item.isCompleted);
}

function getFilteredTaskList() {
  if (filterMethod === uncomplete) {
    return getAllPendingTasks();
  } else if (filterMethod === completed) {
    return getAllCompletedTasks();
  }
  return taskList;
}

function markAllTasksCompleted() {
  for (var i = 0; i < taskList.length; i++) {
    taskList[i].isCompleted = true;
  }
}

function clearAllCompleted() {
  for (var item of getAllCompletedTasks()) {
    removeTask(item.name);
  }
}

export {
  all,
  uncomplete,
  completed,
  task,
  taskList,
  filterMethod,
  removeTask,
  isContains,
  updateList,
  getNumberOfPendingTasks,
  markAllTasksCompleted,
  clearAllCompleted,
  getFilteredTaskList,
  setFilterMethod,
};
