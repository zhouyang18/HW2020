let tasks = [];

function renderEditor(){
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    // inputEl.onchange = (e) =>{
    //     console.log("text, ", e.target.value);
    //     //console.log("aaaa",e);
    // };

    let addTask = () =>{
        if (inputEl.value.length===0) {
            return;
        }
        let newTask ={
            title: inputEl.value,
            done :false,
        };
        inputEl.value = "";

        tasks.push(newTask);

        console.log("tasks: ",tasks);

        renderTaskItems();
    }

    inputEl.onkeypress = (e) => {
        if (e.key==="Enter"){
            addTask();
        }
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) =>{
        addTask();
    };
}

function renderTaskItems(){
    console.log("reder items");
    let itemsE1 = document.querySelector("#default-todo-panel .todo-items");
    itemsE1.querySelectorAll("div").forEach((node)=>node.remove());

    for(let i = 0; i<tasks.length; i++){
        let task = tasks[i];
        let itemE1 = document.createElement("div");
        itemE1.className = "task";

        let doneE1 = document.createElement("input");
        doneE1.type = "checkbox";
        doneE1.checked = task.done;
        if(task.done){
            itemE1.classList.add("done");
        } else{
            itemE1.classList.remove("done");
        }

        doneE1.onchange = (e) =>{
            task.done = e.target.checked;
            if(task.done){
                itemE1.classList.add("done");
            } else{
                itemE1.classList.remove("done");
            }
        }
        itemE1.append(doneE1);

        let titleE1 = document.createElement("label");
        titleE1.innerText = task.title;
        itemE1.append(titleE1);

        let ctrlbarEl = rederTaskCtrlOBar(tasks, i);
        itemE1.append(ctrlbarEl);

        itemsE1.append(itemE1);
    }
}

function rederTaskCtrlOBar(tasks, taskIdx){
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let upE1 = document.createElement("button");
    if (taskIdx===0) {
        upE1.disabled = true;
    }
    upE1.innerText = "↑";
    upE1.onclick = () =>{
       //
    };
    ctrlbarEl.append(upE1)

    let downE1 = document.createElement("button");
    downE1.innerText = "↓"
    downE1.onclick = () =>{
       //
    };
    ctrlbarEl.append(downE1)

    let cancelE1 = document.createElement("button");
    cancelE1.innerText = "x";
    cancelE1.onclick = () =>{
        tasks.splice(taskIdx,1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelE1);

    return ctrlbarEl;
}
renderEditor();
renderTaskItems();