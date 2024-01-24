document.addEventListener("DOMContentLoaded", function () {
  updateTaskList();
});

function addTask() {
  var taskInput = document.getElementById("taskInput").value;
  var taskPriority = document.getElementById("taskPriority").value;

  if (taskInput.trim() === "") {
    alert("Please enter a valid task!");
    return;
  }

  var task = { name: taskInput, priority: taskPriority, status: "pending" };

  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateTaskList();
  document.getElementById("taskInput").value = ""; // Clear the input field
}

function updateTaskList() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    var li = document.createElement("li");
    li.className = "task-container " + task.priority.toLowerCase();
    li.innerHTML = `
      <div class="task-header">
        <span class="task-name">${task.name}</span>
        <div class="task-actions">
          <button class="complete" onclick="completeTask(${index})"><i class="fas fa-check"></i></button>
          <button class="edit" onclick="editTask(${index})"><i class="fas fa-pencil-alt"></i></button>
          <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="task-info">
        <span class="status ${task.status}">${task.status}</span>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function completeTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].status = "completed";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskList();
}

function editTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var updatedTask = prompt("Edit task:", tasks[index].name);

  if (updatedTask !== null) {
    tasks[index].name = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
  }
}

function deleteTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskList();
}
