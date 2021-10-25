
let taskInput = document.querySelector(".todo-container .add-task input"),

addTaskBtn = document.querySelector(".todo-container .add-task #addTask"),

taskContainer = document.querySelector(".task-Content"),

noTaskMsg = document.querySelector(".no-tasks-msg"),

tasksCount = document.querySelector(".tasks-count span"),

taskCompleted = document.querySelector(".task-stats .tasks-completed span"),

taskNotCompleted = document.querySelector(".task-stats .tasks-NotCompleted span"),

taskBox = document.querySelector(".todo-container .task-Content"),

selectBtns = document.querySelector(".todo-container .SelectItems .SelectedBtn"),

restButton = document.querySelector(".todo-container .SelectItems .reset"),

SelectedBtnName = 'All',

listOfTasks = [];


// Rest Button To Remove All Tasks
restButton.addEventListener('click', function(){
    localStorage.removeItem("Tasks");
    listOfTasks = [];
    addTasksToHtml(listOfTasks);
    checkList();
});


// Select Button (All, Completed, not Completed) 
selectBtns.addEventListener('click', (e) => {
    if(e.target.classList.contains("btn")){
        for(let i of e.target.parentElement.children){
            i.classList.remove("Active");
        }
        e.target.classList.add("Active");
        SelectedBtnName = e.target.getAttribute("data-name");
        // console.log(e.target.getAttribute("data-name"));
    }
    addTasksToHtml(listOfTasks);
})

// add tasks to array with another property 
function addTaskToArray (taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
        date: new Date().toLocaleString(),
    };
    listOfTasks.push(task);
    // console.log(listOfTasks);
}

// add List Of Tasks in html page After get Selected Btn (All, Completed, Not Completed )
function addTasksToHtml (listOfTasks){
    let notCompletTask = listOfTasks.filter((item)=> item.completed == false);
    let CompletTask = listOfTasks.filter((item)=> item.completed == true);

    taskContainer.innerHTML = '';

    if(SelectedBtnName == "All"){
        listOfTasks.forEach(element => {
            taskContainer.innerHTML += `
            <span class="task-box ${element.completed == true ? 'finished': '' } " id="task-box" data-id="${element.id}" title="Task Create At ${element.date}">
                <i class="far fa-check-circle ${element.completed == true ? 'fas': '' }"></i>
                ${element.title} 
                <span class="delete btn-grad">Delete</span>
            </span> `;
        }); 
    }else if(SelectedBtnName == "Completed"){
        CompletTask.forEach(element => {
            taskContainer.innerHTML += `
            <span class="task-box ${element.completed == true ? 'finished': '' } " id="task-box" data-id="${element.id}" title="Task Create At ${element.date}">
                <i class="far fa-check-circle ${element.completed == true ? 'fas': '' }"></i>
                ${element.title} 
                <span class="delete btn-grad">Delete</span>
            </span> `;
        }); 
    }else if(SelectedBtnName == "Not-Completed"){
        notCompletTask.forEach(element => {
            taskContainer.innerHTML += `
            <span class="task-box ${element.completed == true ? 'finished': '' } " id="task-box" data-id="${element.id}" title="Task Create At ${element.date}">
                <i class="far fa-check-circle ${element.completed == true ? 'fas': '' }"></i>
                ${element.title} 
                <span class="delete btn-grad">Delete</span>
            </span> `;
        }); 
    }
    setLocalStorage(listOfTasks);  
    checkList();
}

// check if Tasks is exsist in local Storage or not to show msg 'No Taks to show' 
function checkList() {
    if( JSON.parse(localStorage.getItem("Tasks"))  == null || JSON.parse(localStorage.getItem("Tasks")).length <= 0){
        taskContainer.innerHTML = `
        <span class="no-tasks-msg">No task to Show</span>
        `;
    }else {
        noTaskMsg?.remove();
    }
}

// funcation to set Local Storage 
// And Get The length of All Tasks, Completed Tasks, Not Completed Tasks
function setLocalStorage(arr){
    localStorage.setItem("Tasks",JSON.stringify(arr));  
    tasksCount.innerHTML = listOfTasks.length;
    taskCompleted.innerHTML = listOfTasks.filter((item)=> item.completed == true).length;
    taskNotCompleted.innerHTML = listOfTasks.filter((item) => item.completed == false).length;
}


// Get Tasks From Local Storage And add to Html file, if tasks not Found -> message no tasks to show will appear
window.onload = function () {
    taskInput.focus();
    checkList();    
    // console.log(JSON.parse(localStorage.getItem("Tasks")).length);
    if(JSON.parse(localStorage.getItem("Tasks")).length > 0 ) {
        listOfTasks = JSON.parse(localStorage.getItem("Tasks"));
        addTasksToHtml(listOfTasks);
    }else{
        checkList();
    }
};


// get task from input element and add this to array And html file
addTaskBtn.onclick = function () {
    if(taskInput.value === ''){
        console.log("novalue");
        document.querySelector(".add-task input").focus();
    }else {
        if(listOfTasks.length <= 0){
            taskContainer.innerHTML = '';
            addTaskToArray(taskInput.value);
            addTasksToHtml (listOfTasks);
        }else {
            addTaskToArray(taskInput.value);
            addTasksToHtml (listOfTasks);
        }
    }
}; 


// check delete and complete task
taskBox.addEventListener('click', (e) =>{
    if(e.target.classList.contains('delete')){
        let DeleteID = e.target.parentElement.getAttribute("data-id");
        e.target.parentElement.remove();
        listOfTasks = listOfTasks.filter((task)=>{
           return task.id != DeleteID;
        });
        setLocalStorage(listOfTasks);  
        checkList();
    }

    if(e.target.classList.contains('task-box')){
        e.target.classList.toggle("finished");
        e.target.firstElementChild.classList.toggle("fas");
        let ID = e.target.getAttribute("data-id");
        listOfTasks = listOfTasks.filter((task)=>{
            if(task.id == ID){
                task.completed = !task.completed;
            }
            return listOfTasks;
         });
         setLocalStorage(listOfTasks);  
         addTasksToHtml (listOfTasks);
         checkList();


        }
});


// document.addEventListener('click', function(e) {
//     console.log(e);
//     console.log(e.target);

    
//     if(e.target.className == 'delete'){
//         e.target.parentNode.remove();
//     }     
//     if(e.target.classList.contains('task-box')){
//         e.target.classList.toggle("finished");
//         document.querySelector("#task-box i").classList.add("fas");
//     }
    // if(e.target.classList.contains('fa-check-circle')){
    //     e.target.classList.toggle("fas");
    // }
// })

// console.log(document.getElementById("task-box"));
// document.getElementById("task-box").onclick = function () {
//     this.classList.toggle("finished");
//     document.querySelector("#task-box i").classList.toggle("fas");
// }

