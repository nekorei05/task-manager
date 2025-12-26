

const pendingList = document.getElementById("pending-list");
document.getElementById("addBtn").addEventListener("click", e=> {
    const input = document.getElementById("taskInput");
    const title = input.value;

    if(title.trim()===""){
        alert("task cannot be empty");
        return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
   
    taskDiv.innerHTML = `
  <span class="task-text">${title}</span>
  <button class="edit-btn">
    <i class="fa-duotone fa-solid fa-pen-to-square"
       style="--fa-primary-color: #3f3f46; --fa-secondary-color: #3f3f46;">
    </i>
  </button>
`;

    taskDiv.draggable = true;

    pendingList.appendChild(taskDiv);
    input.value = "";
});

let draggedTask = null;
document.addEventListener("dragstart", e=>{
    console.log("Drag started on : ",e.target);
const task = e.target.closest(".task");
if (task) {
  draggedTask = task;
}
});

const completed = document.getElementById("completed");
const completedList = document.getElementById("completed-list");

completed.addEventListener("dragover",e=>{
    e.preventDefault();
});

completed.addEventListener("drop",e=>{
    e.preventDefault();

    if(draggedTask){
    completedList.appendChild(draggedTask);
    draggedTask = null;
    }
});


const trash = document.getElementById("trash");
trash.addEventListener("dragover", e=> {
    e.preventDefault();
});

trash.addEventListener("drop", e=>{
    e.preventDefault();

    if(draggedTask){
        draggedTask.remove();
        draggedTask = null;
    }
});

const pending = document.getElementById("pending");

pending.addEventListener("dragover", e => {
  e.preventDefault();
});

pending.addEventListener("drop", e => {
  e.preventDefault();

  if (draggedTask) {
    pendingList.appendChild(draggedTask);
    draggedTask = null;
  }
});
