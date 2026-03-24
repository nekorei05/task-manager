let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 1. ADD TASK
document.getElementById("addBtn").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return alert("Task cannot be empty");

    const task = {
        id: Date.now(),
        title,
        status: "pending"
    };

    tasks.push(task);
    saveTasks();

    createTaskElement(task);
    input.value = "";
});

// 2. CREATE UI ELEMENT
function createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.draggable = true;
    taskDiv.dataset.id = task.id;

    taskDiv.innerHTML = `
      <span class="task-text">${task.title}</span>
      <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
    `;

  
    if (task.status === "completed") {
        completedList.appendChild(taskDiv);
    } else {
        pendingList.appendChild(taskDiv);
    }

    const editBtn = taskDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const textSpan = taskDiv.querySelector(".task-text");
        const newTitle = prompt("Edit task:", textSpan.innerText);

        if (newTitle && newTitle.trim()) {
            tasks = tasks.map(t =>
                t.id == task.id ? { ...t, title: newTitle.trim() } : t
            );

            saveTasks();
            textSpan.innerText = newTitle.trim();
        }
    });
}

// UPDATE TASK (local)
function updateTask(id, data) {
    tasks = tasks.map(task =>
        task.id == id ? { ...task, ...data } : task
    );
    saveTasks();
}

// 3. DRAG & DROP
let draggedTask = null;

document.addEventListener("dragstart", e => {
    draggedTask = e.target.closest(".task");
});

document.getElementById("completed").addEventListener("dragover", e => e.preventDefault());
document.getElementById("completed").addEventListener("drop", e => {
    e.preventDefault();

    if (draggedTask) {
        const id = draggedTask.dataset.id;

        completedList.appendChild(draggedTask);
        updateTask(id, { status: "completed" });

        draggedTask = null;
    }
});

document.getElementById("pending").addEventListener("dragover", e => e.preventDefault());
document.getElementById("pending").addEventListener("drop", e => {
    e.preventDefault();

    if (draggedTask) {
        const id = draggedTask.dataset.id;

        pendingList.appendChild(draggedTask);
        updateTask(id, { status: "pending" });

        draggedTask = null;
    }
});

document.getElementById("trash").addEventListener("dragover", e => e.preventDefault());
document.getElementById("trash").addEventListener("drop", e => {
    e.preventDefault();

    if (draggedTask) {
        const id = draggedTask.dataset.id;

        tasks = tasks.filter(task => task.id != id);
        saveTasks();

        draggedTask.remove();
        draggedTask = null;
    }
});

window.addEventListener("DOMContentLoaded", () => {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => createTaskElement(task));
});