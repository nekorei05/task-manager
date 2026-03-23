const baseUrl = "http://localhost:5000/tasks";

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list"); 

// 1. Add task
document.getElementById("addBtn").addEventListener("click", async () => {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) {
        alert("Task cannot be empty");
        return;
    }

    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status: "pending" })
    });

    const task = await res.json();
    createTaskElement(task);
    input.value = "";
});

// 2. Create ui element
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

    // edit tasks
    const editBtn = taskDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const textSpan = taskDiv.querySelector(".task-text");
        const newTitle = prompt("Edit task:", textSpan.innerText);
        if (newTitle && newTitle.trim()) {
            updateTaskOnServer(task.id, { title: newTitle.trim() });
            textSpan.innerText = newTitle;
        }
    });
}


async function updateTaskOnServer(id, data) {
    await fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

//drag drop
let draggedTask = null;

document.addEventListener("dragstart", e => {
    draggedTask = e.target.closest(".task");
});


document.getElementById("completed").addEventListener("dragover", e => e.preventDefault());
document.getElementById("completed").addEventListener("drop", async e => {
    e.preventDefault();
    if (draggedTask) {
        const id = draggedTask.dataset.id;
        completedList.appendChild(draggedTask); 
        await updateTaskOnServer(id, { status: "completed" });
        draggedTask = null;
    }
});


document.getElementById("pending").addEventListener("dragover", e => e.preventDefault());
document.getElementById("pending").addEventListener("drop", async e => {
    e.preventDefault();
    if (draggedTask) {
        const id = draggedTask.dataset.id;
        pendingList.appendChild(draggedTask);
        await updateTaskOnServer(id, { status: "pending" });
        draggedTask = null;
    }
});


document.getElementById("trash").addEventListener("dragover", e => e.preventDefault());
document.getElementById("trash").addEventListener("drop", async e => {
    e.preventDefault();
    if (draggedTask) {
        await fetch(`${baseUrl}/${draggedTask.dataset.id}`, { method: "DELETE" });
        draggedTask.remove();
        draggedTask = null;
    }
});


window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    pendingList.innerHTML = "";
    completedList.innerHTML = "";
    tasks.forEach(task => createTaskElement(task));
});
