const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
// creating const objects
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // preventdefault is a function which allows the function to not perform its usual task
    addTodo();
    // calls a function add todo which adds the entered text from input to a list element
});

function addTodo(todo) {
    let todoText = input.value;
    // we use let as user can change the value & todoText is the variable in which we are going to store the value inputted by the user
    if (todo) {
        todoText = todo.text;
        // if there is todo (input) entered, then only the text entered will be stored in todoText
    }

    if (todoText) {
        const todoEl = document.createElement("li");    
        // a const variable todoEl is intialised which creates an element using createElement function in whose paranthesis we add the type of element to be generated, in this case li or list-item
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;
        // changes inner text of the created list-item to the entered text by the user
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
            // when u left-click the todoEl, it gets an additional class attached to it called completed which is going to be used to indicate the given task has been completed
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();
            // contextmenu basically means right-click and here we add a eventlistener to see if the user right-clicks, the todoEl will get removed
            updateLS();
        });

        todosUL.appendChild(todoEl);
        // appendChild function is used to add a node, in this case the todoEl variable at the end of the parent element. in this case the parent element is the ul/unordered-list & appendChild basically adds a list-item to the unordered-list
        input.value = "";
        // resets the input value
        updateLS();
    }
}

function updateLS() {
    // LS stands for Local Storage
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// button / toggle switch
const toggle = document.getElementById('toggleBtn');
const body = document.querySelector('body');
const toggleBtn = document.getElementById('toggle');
const header = document.getElementById('header');

toggle.addEventListener('click', function(){
    // console.log("pressed");
    this.classList.toggle('fa-sun');
    if (this.classList.toggle('fa-moon')){
        body.style.backgroundColor = '#E8FAF8';
        body.style.transition = '1.5s';
        
        toggleBtn.style.transition = '1.5s';
        toggleBtn.style.backgroundColor = '#E8FAF8';
        toggleBtn.style.color = 'black';
        inpchngwhite();
        // this.classList.remove('fa-moon');
    }
    else {
        body.style.backgroundColor = 'black';
        toggleBtn.style.backgroundColor = 'black';
        toggleBtn.style.transition = '1.5s';
        toggleBtn.style.color = '#ffff00';
        body.style.transition = '1.5s';
        inpchngblack();
    }
    function inpchngwhite() {
        input.style.backgroundColor = 'white';
        input.style.transition = '1.5s';
        input.style.border = 'none';
        input.style.color = 'black';
        todosUL.style.backgroundColor = 'white';
        todosUL.style.color = 'black';
        todosUL.style.transition = '1.5s';
        header.style.color = '#367be3'
        header.style.textShadow = '4px 8px #85FFF2';
        header.style.transition = '1.5s';
        
    }
    function inpchngblack() {
        input.style.backgroundColor = 'black';
        input.style.border = '.5px solid #b5b5b5';
        input.style.transition = '1.5s';
        input.style.color = 'white';
        todosUL.style.backgroundColor = 'black';
        todosUL.style.color = 'white';       
        todosUL.style.transition = '1.5s';
        header.style.color = '#85FFF2';
        header.style.textShadow = '4px 8px #367be3';
        header.style.transition = '1.5s';
    }
});