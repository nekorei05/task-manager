
const baseUrl = "http://localhost:5000/tasks";

async function getTasks(){
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    displayTasks(tasks);
}

function displayTasks(tasks){
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
        <span>${task.title}(${task.status})</span>
        <button onclick="deleteTask('${task._id}')">Delete</button>
        `;

        list.appendChild(div);
    });
}
async function deleteTask(id) {
    await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
    getTasks(); // refresh list
}

getTasks();

document.getElementById("addBtn").addEventListener("click",addTask);
async function addTask(){
    const title = document.getElementById("taskTitle").value;

    if(title.trim()===""){
        alert(" Task cannot be empty");
        return;
    }

    await fetch(baseUrl, {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({
            title : title,
            status : "pending"
        })
    });

    document.getElementById("taskTitle").value="";
    getTasks();

}