console.log("JS is connected")
document.addEventListener("click", (e)=>{
    console.log("CLicked");
    console.log(e);
});

document.addEventListener("click", (e)=> {
    if(e.target.id=== "addBtn")
    console.log("You clicked on add");
    
});

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
    taskDiv.textContent = title;
    taskDiv.draggable = true;

    pendingList.appendChild(taskDiv);
    input.value = "";
});

let draggedTask = null;
document.addEventListener("dragstart", e=>{
    console.log("Drag started on : ",e.target);

    if(e.target.classList.contains("task")){
        draggedTask = e.target;
    }
});

const completedList = document.getElementById("completed-list");
completedList.addEventListener("dragover",e=>{
    e.preventDefault();
});

completedList.addEventListener("drop",e=>{
    e.preventDefault();

    if(draggedTask){
    completedList.appendChild(draggedTask);
    draggedTask = null;
    }
});