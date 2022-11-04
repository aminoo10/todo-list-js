const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

const formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

const createTasks = () => {
    tasks.innerHTML = "";
    data.map((item, index) => {
        return (tasks.innerHTML += `
        <div id=${index}>
            <span class="fw-bold">${item.text}</span>
            <span class="small text-secondary">${item.date}</span>
            <p>${item.description}</p>

            <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `)
    });

    resetForm();

}

const resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

const deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    
}

const editTask = (e) => {
    const selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}

(()=> {
     data = JSON.parse(localStorage.getItem("data"));
     createTasks();
     console.log(data);
})();