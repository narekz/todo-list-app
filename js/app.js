//caching the 'clear' icon
const clear = document.querySelector('.clear');
//selecting the dateElement by the id 'date' 
const dateElement = document.getElementById('date');
// selecting the entire todo list. This is defined by the id 'list'
const list = document.getElementById('list');
// selecting the input field where the user can input a todo list item
const input = document.getElementById('input');
// caching the completed icon class. This will show the green check marked circle 
const check = "fa-check-circle";
// caching the default icon class. This will show the circle icon next to the todo list item
const uncheck = "fa-circle-thin";
// caching the lineThrough class to cross off the text when completed
const lineThrough = "lineThrough";

// creating the date display for the app
const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
};

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let listArray = [];
let id = 0;

// adds a new todo list item to the list
function addToDo (toDo, id, done, trash){
    if (trash){ return; }
    const complete = done ? check : uncheck;
    const line = done ? lineThrough : ""; 
    const text = `<li class="item">
                    <i class="fa ${complete}" job="complete" id="${id}"></i>
                    <p class="text ${line}"> ${toDo} </p>
                    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                </li>`;

// inserts an HTML right before the todo list item
    const position = "afterbegin";
    list.insertAdjacentHTML(position, text);
}


function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    listArray[element.id].done = listArray[element.id].done ? false: true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listArray[element.id].trash=true;
}

document.addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        const toDo = input.value;
        if (toDo) { 
            addToDo(toDo, id, false, false);
            listArray.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
        }
        input.value = '';
        id++;
    }
});

// Listens to see when a todo list item is selected
list.addEventListener("click", function (event) {
    // event.target is bascially selecting whatever the user clicks on from the list
    let element = event.target;
    // what does the selected items' job attribute equal? is it complete or delete?
    const elementJob = event.target.attributes.job.value;

    // if the job attribute = complete, run the completeToDo function on that selected element
    if (elementJob === "complete") {
        completeToDo(element);

        // if the job attribute = delete, run the removeToDo function on that selected element
    } else if (elementJob === "delete") {
        removeToDo(element);
    }
    // creates an item in the Locale Storage
    localStorage.setItem('key', 'value');
    let variable = localStorage.getItem('key');

    localStorage.getItem("TODO", JSON.stringify(listArray));
});

function loadToDo( array ) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

let data = localStorage.getItem("TODO");
if (data){
    listArray = JSON.parse(data);
    loadToDo(listArray);
    id=listArray.length;
}else{
    listArray=[];
    id=0;
}





clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});



