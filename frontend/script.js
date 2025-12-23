
const baseUrl = "http://localhost:5000/tasks";

async function getTasks(){
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    displayTasks(tasks);
}

function displayTasks(tasks){
    const pendinglist = document.getElementById("pending-list");
    const completedlist = document.getElementById("completed-list");

    pendinglist.innerHTML = "";
    completedlist.innerHTML = "";


    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.draggable = true;
        div.dataset.id = task._id;
                div.innerHTML = `
        <span>${task.title}</span>
        <button class="edit"> 0 </button>
        `;
        if (task.status==="completed"){
            completedlist.appendChild(div);
        } else {
            pendinglist.appendChild(div);
        }
    });
}

//Add task
document.getElementById("addBtn").addEventListener("click",addTask);
async function addTask(){
    const input = document.getElementById("taskTitle");
    const title = input.value.trim();

    if(!title){
        alert("Task cannot be empty");
        return;
    }

    await fetch(baseUrl, {
        method : "POST",
        headers: { "Content-Type": "application/json"},
        body : JSON.stringify({ title, status : "pending"})
    });

    input.value = "";
    getTasks();
}

let draggedTask = null;
document.addEventListener("dragstart", e => {
    if(e.target.classList.contains("task")){
        draggedTask = e.target;
    }
});



//delete task
const trash = document.getElementById("trash");
trash.addEventListener("dragover", e=> e.preventDefault());
trash.addEventListener("drop", async()=> {
    const taskId = draggedTask.dataset.id;
    await fetch(`${baseUrl}/${taskId}`, { method : "DELETE"});
    draggedTask.remove();
});

