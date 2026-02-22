const baseUrl = "http://localhost:5000/tasks";

const pendingList = document.getElementById("pending-list");

document.getElementById("addBtn").addEventListener("click", async e => {
    const input = document.getElementById("taskInput");
    const title = input.value;

    if (title.trim() === "") {
        alert("task cannot be empty");
        return;
    }

    // 🔥 Create task in MongoDB first
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, status: "pending" })
    });

    const task = await res.json();

    createTaskElement(task);

    input.value = "";
});

function createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.draggable = true;

    // 🔥 store MongoDB _id
    taskDiv.dataset.id = task._id;

    taskDiv.innerHTML = `
      <span class="task-text">${task.title}</span>
      <button class="edit-btn">
        <i class="fa-duotone fa-solid fa-pen-to-square"
           style="--fa-primary-color: #3f3f46; --fa-secondary-color: #3f3f46;">
        </i>
      </button>
    `;

    // 🔥 EDIT FUNCTIONALITY
    const editBtn = taskDiv.querySelector(".edit-btn");
    const textSpan = taskDiv.querySelector(".task-text");

    editBtn.addEventListener("click", () => {
        const oldTitle = textSpan.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = oldTitle;

        textSpan.replaceWith(input);
        input.focus();

        input.addEventListener("blur", async () => {
            const newTitle = input.value.trim();
            if (!newTitle) return;

            const id = taskDiv.dataset.id;

            // 🔥 Update MongoDB
            await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: newTitle })
            });

            const newSpan = document.createElement("span");
            newSpan.className = "task-text";
            newSpan.innerText = newTitle;

            input.replaceWith(newSpan);
        });
    });

    pendingList.appendChild(taskDiv);
}

let draggedTask = null;

document.addEventListener("dragstart", e => {
    const task = e.target.closest(".task");
    if (task) {
        draggedTask = task;
    }
});

const completed = document.getElementById("completed");
const completedList = document.getElementById("completed-list");

completed.addEventListener("dragover", e => {
    e.preventDefault();
});

completed.addEventListener("drop", async e => {
    e.preventDefault();

    if (draggedTask) {
        completedList.appendChild(draggedTask);

        const id = draggedTask.dataset.id;

        // 🔥 Update status in MongoDB
        await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "completed" })
        });

        draggedTask = null;
    }
});

const trash = document.getElementById("trash");

trash.addEventListener("dragover", e => {
    e.preventDefault();
});

trash.addEventListener("drop", async e => {
    e.preventDefault();

    if (draggedTask) {
        const id = draggedTask.dataset.id;

        // 🔥 Delete from MongoDB
        await fetch(`${baseUrl}/${id}`, {
            method: "DELETE"
        });

        draggedTask.remove();
        draggedTask = null;
    }
});

const pending = document.getElementById("pending");

pending.addEventListener("dragover", e => {
    e.preventDefault();
});

pending.addEventListener("drop", async e => {
    e.preventDefault();

    if (draggedTask) {
        pendingList.appendChild(draggedTask);

        const id = draggedTask.dataset.id;

        // 🔥 Update status in MongoDB
        await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "pending" })
        });

        draggedTask = null;
    }
});