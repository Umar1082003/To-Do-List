// get selectors
let dayWeek = document.querySelector(".dayWeek");
let dateEl = document.querySelector(".date");
let time = document.querySelector(".time");

let text = document.querySelector(".inp");
let buttonAdd = document.querySelector(".btn");

let ul = document.querySelector(".list");

let taskCount = document.querySelector(".footer p span");
let delAllBtn = document.querySelector(".footer button");

let filtering = document.querySelector(".filtering");
let AllBtn = document.querySelector(".all-btn");
let completedBtn = document.querySelector(".completed-btn");
let inCompletedBtn = document.querySelector(".incompleted-btn");

// Events
buttonAdd.addEventListener("click", addTask);
delAllBtn.addEventListener("click", deleteAllTasks);
text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
AllBtn.addEventListener("click", ()=> filteringFunc('all'))
completedBtn.addEventListener("click", ()=> filteringFunc('completed'))
inCompletedBtn.addEventListener("click", ()=> filteringFunc('incompleted'))


loadTask();
updateTaskCount();

// ALL FUNCTIONS

// 1- function date
function getDate() {
  let date = new Date();

  dayWeek.innerHTML = date.toLocaleString("en", {
    weekday: "long",
  });

  dateEl.innerHTML = date.toLocaleString("en", {
    dateStyle: "medium",
  });
  time.innerHTML = date.toLocaleString("en", {
    timeStyle: "short",
  });
}
getDate();
setInterval(getDate, 20000);

// 2- function addTask
function addTask() {
  if (text.value.trim() !== "") {
    let li = document.createElement("li");
    li.classList.add("task", "incompleted");
    let currentTime = new Date().toLocaleString("en", {timeStyle: "short"});
    li.innerHTML = `
            <span class="check">✅</span>
            <p>${text.value}</p>
            <span class="edit">✏️</span>
            <span class="delete">❌</span>
            <span class="timeAddtask">${currentTime}</span>
        `;
    
    li.querySelector(".check").addEventListener("click", clickedToCheck);
    li.querySelector(".delete").addEventListener("click", clickedToDelete);
    li.querySelector(".edit").addEventListener("click", clickedToEdit);

    ul.prepend(li);
    
    updateTaskCount();
    saveToLocalStorage();

    text.value = "";
  }
}

// 3- check function
function clickedToCheck(event) {
  let li = event.target.parentElement;
  li.classList.toggle("completed");
  li.classList.toggle("incompleted");

  if (li.classList.contains("completed")) {
    event.target.style.textDecoration = 'line-through';
    li.querySelector('.edit').style.textDecoration = 'line-through';
    ul.appendChild(li)
  }
  if (li.classList.contains("incompleted")) {
    event.target.style.textDecoration = 'none';
    li.querySelector('.edit').style.textDecoration = 'none';
    ul.prepend(li)
  }
  updateTaskCount();
  saveToLocalStorage();
}

// 4- delete function
function clickedToDelete(event) {
  event.target.parentElement.remove();
  updateTaskCount();
  saveToLocalStorage();
}

// 5- edit function
function clickedToEdit(event) {
  let li = event.target.parentElement;
  let p = li.querySelector("p").innerText;
  // let currentTime = new Date().toLocaleString("en", {timeStyle: "short"});
  li.innerHTML = `
            <span class="save">save</span>
            <input class="editInp" type:"text" value="${p}">
        `;

  li.querySelector(".save").addEventListener("click", () => clickedToSave(li));
  updateTaskCount();
}

// 6- save function
function clickedToSave(li) {
  let newValue = li.querySelector(".editInp").value;
  let currentTime = new Date().toLocaleString("en", {timeStyle: "short"});
  li.innerHTML = `
            <span class="check">✅</span>
            <p>${newValue}</p>
            <span class="edit">✏️</span>
            <span class="delete">❌</span>
            <span class="timeAddtask">${currentTime}</span>
    `;
  li.querySelector(".check").addEventListener("click", clickedToCheck);
  li.querySelector(".delete").addEventListener("click", clickedToDelete);
  li.querySelector(".edit").addEventListener("click", clickedToEdit);
  saveToLocalStorage();
}

// 6- get complet function
function updateTaskCount() {
  taskCount.innerText = ul.childElementCount;
}

// 7- delete all function
function deleteAllTasks() {
  ul.innerHTML = "";
  saveToLocalStorage();
  updateTaskCount();
}

// 8- save to local storage function
function saveToLocalStorage() {
  localStorage.setItem("tasks", ul.innerHTML)
}
saveToLocalStorage();

// 9- while load function
function loadTask() {
  let savedTask = localStorage.getItem("tasks");
  if (savedTask) {
    ul.innerHTML = savedTask;
    ul.querySelectorAll(".task").forEach((li) => {
      li.querySelector(".check").addEventListener("click", clickedToCheck);
      li.querySelector(".delete").addEventListener("click", clickedToDelete);
      li.querySelector(".edit").addEventListener("click", clickedToEdit);
    });
  }
}

// 10- filltering function
function filteringFunc(status) {
  let lis = document.querySelectorAll(".task");

  lis.forEach(li => {
      if (status === 'all') {
          li.style.display = 'flex';
          document.querySelector(".all-btn")?.classList.add("active");
          document.querySelector(".completed-btn")?.classList.remove("active");
          document.querySelector(".incompleted-btn")?.classList.remove("active");
          document.querySelector(".all-btn")?.classList.remove("unactive");
          document.querySelector(".completed-btn")?.classList.add('unactive');
          document.querySelector(".incompleted-btn")?.classList.add('unactive');
      } else if (li.classList.contains(status)) {
          li.style.display = 'flex';

          if (status === 'completed') {
              
              document.querySelector(".completed-btn")?.classList.add("active");
              document.querySelector(".all-btn")?.classList.remove("active");
              document.querySelector(".incompleted-btn")?.classList.remove("active");
              document.querySelector(".completed-btn")?.classList.remove("unactive");
              document.querySelector(".all-btn")?.classList.add('unactive');
              document.querySelector(".incompleted-btn")?.classList.add('unactive');
          } else if (status === 'incompleted') {
              document.querySelector(".incompleted-btn")?.classList.add("active");
              document.querySelector(".all-btn")?.classList.remove("active");
              document.querySelector(".completed-btn")?.classList.remove("active");
              document.querySelector(".incompleted-btn")?.classList.remove("unactive");
              document.querySelector(".all-btn")?.classList.add('unactive');
              document.querySelector(".completed-btn")?.classList.add('unactive');
          }
      } else {
          li.style.display = 'none';
      }
  });
}