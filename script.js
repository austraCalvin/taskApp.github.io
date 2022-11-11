const taskStorage = {};
const awaitingOption = document.querySelector("#awaitingOption");
const ongoingOption = document.querySelector("#ongoingOption");
const doneOption = document.querySelector("#doneOption");
const allOption = document.querySelector("#allOption");

const dropCreate = document.querySelector("#dropCreate");
const addTaskBtnDiv = document.querySelector("#addTaskBtnDiv");
const addTaskBtn = document.querySelector("#addTaskBtn");

const createTaskBtnDiv = document.querySelector("#createTaskBtnDiv");
const createTaskBtn = document.querySelector("#createTaskBtn");

const errorTaskBtnDiv = document.querySelector("#errorTaskBtnDiv");
const errorTaskBtn = document.querySelector("#errorTaskBtn");

const cancelTaskBtnDiv = document.querySelector("#cancelTaskBtnDiv");
const cancelTaskBtn = document.querySelector("#cancelTaskBtn");

const awaitingSection = document.querySelector("#awaiting");
const ongoingSection = document.querySelector("#ongoing");
const doneSection = document.querySelector("#done");

let taskId = 1;

function tasksOption(e) {

    const id = e.target.id;
    (id === "awaitingOption") && awaitingSection.classList.toggle("invisible");

    (id === "ongoingOption") && ongoingSection.classList.toggle("invisible");

    (id === "doneOption") && doneSection.classList.toggle("invisible");

    if (id === "allOption") {

        if (awaitingSection.classList.contains("invisible") || ongoingSection.classList.contains("invisible") || doneSection.classList.contains("invisible")) {

            awaitingSection.classList.remove("invisible");
            ongoingSection.classList.remove("invisible");
            doneSection.classList.remove("invisible");

        } else {

            awaitingSection.classList.add("invisible");
            ongoingSection.classList.add("invisible");
            doneSection.classList.add("invisible");

        };
    };

};

awaitingOption.addEventListener("click", e => {

    tasksOption(e);

});

ongoingOption.addEventListener("click", e => {

    tasksOption(e);

});

doneOption.addEventListener("click", e => {

    tasksOption(e);

});

allOption.addEventListener("click", e => {

    tasksOption(e);

});

function addTaskBtnDisabledClass(e) {

    (e.type === "DOMContentLoaded") && addTaskBtn.classList.add("disabled");
    (e.type === "load") && addTaskBtn.classList.remove("disabled");

};

function dropCreateRender() {

    (window.innerWidth >= 300) && createTaskBtnDiv.classList.remove("pe-2");
    (window.innerWidth >= 300) && errorTaskBtnDiv.classList.remove("pe-2");
    (window.innerWidth >= 300) && cancelTaskBtnDiv.classList.remove("ps-2");
    (window.innerWidth >= 300) && createTaskBtnDiv.classList.add("pe-5");
    (window.innerWidth >= 300) && errorTaskBtnDiv.classList.add("pe-5");
    (window.innerWidth >= 300) && cancelTaskBtnDiv.classList.add("ps-5");

    (window.innerWidth <= 300) && createTaskBtnDiv.classList.remove("pe-5");
    (window.innerWidth <= 300) && errorTaskBtnDiv.classList.remove("pe-5");
    (window.innerWidth <= 300) && cancelTaskBtnDiv.classList.remove("ps-5");
    (window.innerWidth <= 300) && createTaskBtnDiv.classList.add("pe-2");
    (window.innerWidth <= 300) && errorTaskBtnDiv.classList.add("pe-2");
    (window.innerWidth <= 300) && cancelTaskBtnDiv.classList.add("ps-2");

};

window.addEventListener("DOMContentLoaded", e => {

    addTaskBtnDisabledClass(e);
    dropCreateRender();

});
window.addEventListener("load", e => {

    addTaskBtnDisabledClass(e);
    dropCreateRender();

});

function heightRender(awaitingTasks, creating) {

    (awaitingTasks.length === 1) && (window.innerWidth < 194) && creating.classList.remove("ndPhase_1", "ndPhase_2", "ndPhase_3");
    (awaitingTasks.length === 1) && (window.innerWidth < 194) && creating.classList.add("ndPhase_2");

    (awaitingTasks.length > 1) && (window.innerWidth < 194) && creating.classList.remove("ndPhase_1", "ndPhase_2", "ndPhase_3");
    (awaitingTasks.length > 1) && (window.innerWidth < 194) && creating.classList.add("ndPhase_4");

    (window.innerWidth >= 194) && creating.classList.remove("ndPhase_1", "ndPhase_2", "ndPhase_4");
    (window.innerWidth >= 194) && creating.classList.add("ndPhase_3");

};

window.addEventListener("resize", () => {

    const awaitingTasks = document.querySelectorAll("#awaiting a");
    const creating = document.querySelector("#creating");

    creating && heightRender(awaitingTasks, creating);

    dropCreateRender();

});

function onlyOneInputSection(fromEditBtn) {

    const editBtns = document.querySelectorAll(".editBtn");

    if (fromEditBtn) {

        editBtns.forEach(each => {

            if (window.editId === each.id) {

                each.classList.remove("disabled")

            } else if (window.editId !== each.id) {

                each.classList.add("disabled");

            };

        });

    } else {

        editBtns.forEach(each => {

            each.classList.add("disabled");

        });

    };

};

function inputSection(e) {

    window.inputOn = true;

    window.editId && onlyOneInputSection(true);
    !window.editId && onlyOneInputSection(false);

    addTaskBtnDiv.classList.add("unsee");
    dropCreate.classList.remove("unsee");
    createTaskBtn.classList.add("disabled");
    cancelTaskBtn.classList.add("disabled");

    const currentSection = e.target.getAttribute("section");

    if (/\d{1,}/.test(e.target.id)) {

        window.editId = Number(e.target.id);
        document.getElementById(e.target.id).remove();

        const awaitingTasks = document.querySelectorAll("#awaiting a");
        const ongoingTasks = document.querySelectorAll("#ongoing a");
        const doneTasks = document.querySelectorAll("#done a");
        render({ awaitingTasks, ongoingTasks, doneTasks });

    }else{

        window.onCancel = false;

    };

    let editTask = "";

    for (let i = 1; i < 1000; i++) {

        if (taskStorage[i]) {

            if (window.editId === taskStorage[i].id) {

                editTask = taskStorage[i];

            };

        } else {

            continue;

        };

    };

    const fragment = document.createDocumentFragment();

    //card open...
    const a = document.createElement("a");
    a.id = ("creating");
    a.classList.add("list-group-item", "list-group-item-action", "list-group-item-dark", "card", "rounded-0", "border", "border-start-0", "border-end-0", "stPhase");
    //cardHeader open...

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "mb-0", "pb-1");

    const div_title = document.createElement("div");
    div_title.classList.add("form-floating");

    const cardTitle = document.createElement("input");
    cardTitle.classList.add("card-title", "textarea", "form-control");
    cardTitle.id = ("titleInput");
    cardTitle.type = ("text");
    cardTitle.name = ("title");
    cardTitle.placeholder = ("Type the title in here...");

    if (editTask.title) {

        cardTitle.value = editTask.title;

    };

    const label_title = document.createElement("label");
    label_title.htmlFor = ("titleInput");
    label_title.classList.add("w-100", "text-capitalize");
    label_title.innerText = ("title");

    div_title.appendChild(cardTitle);
    div_title.appendChild(label_title);
    cardHeader.appendChild(div_title);

    fragment.appendChild(cardHeader);
    //cardHeader end...

    //cardBody open...
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardText_2 = document.createElement("textarea");
    cardText_2.id = ("detailsInput");
    cardText_2.classList.add("card-text", "textarea", "form-control")
    cardText_2.rows = ("10");
    cardText_2.placeholder = ("Type the details in here...");

    if (editTask.details) {

        cardText_2.value = editTask.details;

    };

    cardBody.appendChild(cardText_2);
    fragment.appendChild(cardBody);
    //cardBody end...

    //cardFooter open...
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const label_1 = document.createElement("label");
    label_1.classList.add("w-100", "text-uppercase", "text-center")
    label_1.htmlFor = ("openingDateInput");
    label_1.innerText = ("opening date");

    const cardText_3 = document.createElement("input");
    cardText_3.id = ("openingDateInput");
    cardText_3.classList.add("card-text", "form-control", "mb-3", "w-100");
    cardText_3.type = ("date");
    cardText_3.name = ("openingDateInput");

    if (editTask.opening) {

        cardText_3.value = editTask.opening;

    };

    label_1.appendChild(cardText_3);
    cardFooter.appendChild(label_1);

    const br = document.createElement("br");
    cardFooter.appendChild(br);

    const label_2 = document.createElement("label");
    label_2.classList.add("w-100", "text-uppercase", "text-center")
    label_2.htmlFor = ("endingDateInput");
    label_2.innerText = ("ending date");;

    const cardText_4 = document.createElement("input");
    cardText_4.id = ("endingDateInput");
    cardText_4.classList.add("card-text", "form-control", "w-100");
    cardText_4.type = ("date");
    cardText_4.name = ("endingDateInput");

    if (editTask.ending) {

        cardText_4.value = editTask.ending;

    };

    label_2.appendChild(cardText_4);
    cardFooter.appendChild(label_2);
    //cardFooter end...

    fragment.appendChild(cardFooter);

    !(currentSection === "awaiting") && !(currentSection === "ongoing") && !(currentSection === "done") && awaitingSection.appendChild(a);

    (currentSection === "awaiting") && awaitingSection.appendChild(a);
    (currentSection === "ongoing") && ongoingSection.appendChild(a);
    (currentSection === "done") && doneSection.appendChild(a);
    //card end...

    const awaitingTasks = document.querySelectorAll("#awaiting a");
    const ongoingTasks = document.querySelectorAll("#ongoing a");
    const doneTasks = document.querySelectorAll("#done a");
    const creating = document.querySelector("#creating");

    render({ awaitingTasks, ongoingTasks, doneTasks });

    setTimeout(() => {

        creating && heightRender(awaitingTasks, creating);

    }, 0);

    setTimeout(() => {

        a.appendChild(fragment);
        createTaskBtn.classList.remove("disabled");
        cancelTaskBtn.classList.remove("disabled");

    }, 800);

};

addTaskBtn.addEventListener("click", inputSection);

function dropBtnFunction(e) {

    const id = Number(e.target.id);
    delete taskStorage[id];
    document.getElementById(`${id}`).remove();

    const awaitingTasks = document.querySelectorAll("#awaiting a");
    const ongoingTasks = document.querySelectorAll("#ongoing a");
    const doneTasks = document.querySelectorAll("#done a");
    render({ awaitingTasks, ongoingTasks, doneTasks });

};

const checkInputValue = () => {

    const titleInput = document.querySelector("#titleInput");
    const detailsInput = document.querySelector("#detailsInput");
    const openingDateInput = document.querySelector("#openingDateInput");
    const endingDateInput = document.querySelector("#endingDateInput");

    return { title: titleInput.value, details: detailsInput.value, opening: openingDateInput.value, ending: endingDateInput.value }

};

const checkValidity = ({ title, details, opening, ending }) => {

    if ((/\w{1,}/.test(title)) && (/\w{1,}/.test(details))) {

        let currentTimestamp = Date.now();
        const currentDate = new Date(currentTimestamp);
        currentTimestamp = (`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        let currentTime;

        if (String(currentDate.getHours()).length < 2) {

            currentTime = (`0${currentDate.getHours()}:`)

        }else if(String(currentDate.getHours()).length > 1){

            currentTime = (`${currentDate.getHours()}:`)

        };

        if(String(currentDate.getMinutes()).length < 2){

            currentTime += (`0${currentDate.getMinutes()}:`);

        }else if(String(currentDate.getMinutes()).length > 1){

            currentTime += (`${currentDate.getMinutes()}:`);

        };

        if(String(currentDate.getSeconds()).length < 2){

            currentTime += (`0${currentDate.getSeconds()}`);

        }else if(String(currentDate.getSeconds()).length > 1){

            currentTime += (`${currentDate.getSeconds()}`);

        };

        currentTimestamp  = new Date(`${currentTimestamp}T${currentTime}`).getTime();
        const openingDate = new Date(`${opening}T${currentTime}`).getTime();
        const endingDate = new Date(`${ending}T${currentTime}`).getTime();

        let cond = 0;
        const good = () => { cond += 1 };
        const bad = () => { cond += 0 };
        const perfect = () => { cond = {checked: true, value: 1} };
        const ugly = () => { cond = {checked: true, value: 0} };

        (openingDate < currentTimestamp) && bad();
        (openingDate >= currentTimestamp) && good();

        (endingDate < openingDate) && bad();
        (endingDate >= openingDate) && good();

        (cond === 2) && perfect();
        (!(cond.checked)) && (cond !== 2) && ugly();

        return cond.value;

    } else {

        return 0;

    };

};

const editBtnActive = () => {

    const editBtns = document.querySelectorAll(".editBtn");
    editBtns.forEach(each => {

        each.classList.remove("disabled")

    });

};

function createTaskFunction({ title, details, opening, ending }) {

    window.inputOn = false;
    const currentId = window.editId || taskId;

    let editTask = "";

    for (let i = 1; i < 1000; i++) {

        if (taskStorage[i]) {

            if (window.editId === taskStorage[i].id) {

                editTask = taskStorage[i];

            };

        } else {

            continue;

        };

    };

    const fragment = document.createDocumentFragment();
    const fragmentClone = fragment.cloneNode();
    //card open...
    const a = document.createElement("a");
    a.classList.add("list-group-item", "list-group-item-action", "list-group-item-dark", "card", "rounded-0", "border", "border-start-0", "border-end-0", "border-top-0", "border-bottom-1", "pb-4");
    a.draggable = true;
    a.id = currentId;

    const cardClone = a.cloneNode();

    //cardHeader open...
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "mb-0", "pb-1");

    const cardTitle = document.createElement("p");
    cardTitle.classList.add("card-title", "text-uppercase");
    cardTitle.innerText = title || editTask.title;
    cardHeader.appendChild(cardTitle);

    const cardHeaderClone = cardHeader.cloneNode(true);

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group", "btn-group-vertical", "w-100");

    const btnGroupClone = btnGroup.cloneNode();

    const editBtn = document.createElement("button");
    editBtn.id = currentId;
    editBtn.type = ("button");
    editBtn.classList.add("btn", "btn-light", "editBtn", "rounded-top", "w-100");
    editBtn.innerHTML = ("✏");
    editBtn.addEventListener("click", inputSection);

    let editBtnClone = editBtn.cloneNode(true);

    const onBtn = document.createElement("button");
    const doneBtn = document.createElement("button");

    if (editTask.status === "awaiting") {

        editBtn.setAttribute("section", "awaiting");

        btnGroup.appendChild(editBtn);

        onBtn.id = currentId;
        onBtn.type = ("button");
        onBtn.classList.add("btn", "btn-secondary", "onBtn", "w-100");
        onBtn.innerHTML = ("ON");
        onBtn.addEventListener("click", onBtnFunction);

        btnGroup.appendChild(onBtn);

    } else if (editTask.status === "ongoing") {

        editBtn.setAttribute("section", "ongoing");

        btnGroup.appendChild(editBtn);

        doneBtn.id = currentId;
        doneBtn.type = ("button");
        doneBtn.classList.add("btn", "btn-success", "doneBtn", "w-100");
        doneBtn.innerHTML = ("✔");
        doneBtn.addEventListener("click", doneBtnFunction);

        btnGroup.appendChild(doneBtn);

    } else if (editTask.status === "done") {

        editBtn.setAttribute("section", "done");

        btnGroup.appendChild(editBtn);

    } else {

        editBtn.setAttribute("section", "awaiting");

        btnGroup.appendChild(editBtn);

        onBtn.id = currentId;
        onBtn.type = ("button");
        onBtn.classList.add("btn", "btn-secondary", "onBtn", "w-100");
        onBtn.innerHTML = ("ON");
        onBtn.addEventListener("click", onBtnFunction);

        btnGroup.appendChild(onBtn);

    };

    const dropBtn = document.createElement("button");
    dropBtn.id = currentId;
    dropBtn.type = ("button");
    dropBtn.classList.add("btn", "btn-danger", "dropBtn", "rounded-bottom", "w-100");
    dropBtn.innerHTML = ("🗑");
    dropBtn.addEventListener("click", dropBtnFunction);

    const dropBtnClone = dropBtn.cloneNode(true);

    btnGroup.appendChild(dropBtn);

    cardHeader.appendChild(btnGroup);
    a.appendChild(cardHeader);
    //cardHeader end...

    //cardBody open...
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardText_2 = document.createElement("p");
    cardText_2.classList.add("card-text")
    cardText_2.innerText = details || editTask.details;

    cardBody.appendChild(cardText_2);
    const cardBodyClone = cardBody.cloneNode(true);
    a.appendChild(cardBody);
    //cardBody end...

    //cardFooter open...
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const cardText_3 = document.createElement("p");
    cardText_3.classList.add("card-text");
    cardText_3.innerText = opening || editTask.opening;
    cardFooter.appendChild(cardText_3);

    const cardText_4 = document.createElement("p");
    cardText_4.classList.add("card-text");
    cardText_4.innerText = ending || editTask.ending;

    cardFooter.appendChild(cardText_4);
    const cardFooterClone = cardFooter.cloneNode(true);
    a.appendChild(cardFooter);
    //cardFooter end...

    //card end...

    function doneBtnFunction(e) {

        const doneBtnId = e.target.id;
        taskStorage[doneBtnId].status = "done";

        const doneCardClone = cardClone.cloneNode();
        fragmentClone.appendChild(doneCardClone);

        //cardHeader open...
        const doneCardHeaderClone = cardHeaderClone.cloneNode();
        doneCardClone.appendChild(doneCardHeaderClone);

        doneCardHeaderClone.appendChild(cardTitle);

        const doneBtnGroup = btnGroupClone.cloneNode();

        const doneEditBtn = editBtnClone.cloneNode(true);

        doneEditBtn.addEventListener("click", inputSection);
        doneEditBtn.setAttribute("section", "done");
        window.inputOn && doneEditBtn.classList.add("disabled");
        !(window.inputOn) && doneEditBtn.classList.remove("disabled");

        dropBtnClone.addEventListener("click", dropBtnFunction);

        doneBtnGroup.appendChild(doneEditBtn);
        doneBtnGroup.appendChild(dropBtnClone);
        doneCardHeaderClone.appendChild(doneBtnGroup);
        //cardHeader end...

        doneCardClone.appendChild(cardBodyClone);
        doneCardClone.appendChild(cardFooterClone);

        document.getElementById(doneBtnId) && document.getElementById(doneBtnId).remove();

        doneSection.appendChild(fragmentClone);

        const awaitingTasks = document.querySelectorAll("#awaiting a");
        const ongoingTasks = document.querySelectorAll("#ongoing a");
        const doneTasks = document.querySelectorAll("#done a");
        render({ awaitingTasks, ongoingTasks, doneTasks });

    };

    function onBtnFunction(e) {

        const ongoingBtnId = e.target.id;
        taskStorage[ongoingBtnId].status = "ongoing";

        const ongoingCardClone = cardClone.cloneNode();
        fragmentClone.appendChild(ongoingCardClone);

        //cardHeader open...
        const ongoingCardHeaderClone = cardHeaderClone.cloneNode();
        ongoingCardClone.appendChild(ongoingCardHeaderClone);

        ongoingCardHeaderClone.appendChild(cardTitle);

        const ongoingBtnGroup = btnGroupClone.cloneNode();

        const ongoingEditBtn = editBtnClone.cloneNode(true);

        ongoingEditBtn.addEventListener("click", inputSection);
        ongoingEditBtn.setAttribute("section", "ongoing");
        window.inputOn && ongoingEditBtn.classList.add("disabled");
        !(window.inputOn) && ongoingEditBtn.classList.remove("disabled");

        const doneBtn = document.createElement("button");
        doneBtn.id = ongoingBtnId;
        doneBtn.type = ("button");
        doneBtn.classList.add("btn", "btn-success", "doneBtn", "w-100");
        doneBtn.innerHTML = ("✔");
        doneBtn.addEventListener("click", doneBtnFunction);

        dropBtnClone.addEventListener("click", dropBtnFunction);

        ongoingBtnGroup.appendChild(ongoingEditBtn);
        ongoingBtnGroup.appendChild(doneBtn);
        ongoingBtnGroup.appendChild(dropBtnClone);
        ongoingCardHeaderClone.appendChild(ongoingBtnGroup);
        //cardHeader end...

        ongoingCardClone.appendChild(cardBodyClone);
        ongoingCardClone.appendChild(cardFooterClone);

        document.getElementById(ongoingBtnId) && document.getElementById(ongoingBtnId).remove();

        ongoingSection.appendChild(fragmentClone);

        const awaitingTasks = document.querySelectorAll("#awaiting a");
        const ongoingTasks = document.querySelectorAll("#ongoing a");
        const doneTasks = document.querySelectorAll("#done a");
        render({ awaitingTasks, ongoingTasks, doneTasks });

    };

    fragment.appendChild(a);

    let editStatus = "";

    for (let i = 1; i < 1000; i++) {

        if (taskStorage[i]) {

            if (window.editId === taskStorage[i].id) {

                editStatus = taskStorage[i].status;

            };

        } else {

            continue;

        };

    };

    document.querySelector("#creating").remove();

    !(editStatus === "awaiting") && !(editStatus === "ongoing") && !(editStatus === "done") && awaitingSection.appendChild(fragment);

    (editStatus === "awaiting") && awaitingSection.appendChild(fragment);
    (editStatus === "ongoing") && ongoingSection.appendChild(fragment);
    (editStatus === "done") && doneSection.appendChild(fragment);

    if (window.editId && !(window.onCancel)) {

        const status = taskStorage[window.editId].status;
        taskStorage[window.editId] = {

            id: window.editId,
            title: title,
            details: details,
            opening: opening,
            ending: ending,
            status

        };

    } else if (!(window.editId)) {

        taskStorage[taskId] = {

            id: taskId,
            title: title,
            details: details,
            opening: opening,
            ending: ending,
            status: "awaiting"

        };

        ++taskId;

    };

    window.editId = "";

    const awaitingTasks = document.querySelectorAll("#awaiting a");
    const ongoingTasks = document.querySelectorAll("#ongoing a");
    const doneTasks = document.querySelectorAll("#done a");
    render({ awaitingTasks, ongoingTasks, doneTasks });

    addTaskBtnDiv.classList.remove("unsee");
    dropCreate.classList.add("unsee");

    editBtnActive();

    window.onCancel = false;

};

function errorCheck() {

    const cond = checkValidity(checkInputValue());

    !cond && createTaskBtnDiv.classList.add("unsee");
    !cond && errorTaskBtnDiv.classList.remove("unsee");

    cond && createTaskBtnDiv.classList.remove("unsee");
    cond && errorTaskBtnDiv.classList.add("unsee");

};

createTaskBtn.addEventListener("click", () => {

    titleInput.addEventListener("change", () => {

        errorCheck(checkInputValue());

    });
    detailsInput.addEventListener("change", () => {

        errorCheck(checkInputValue());

    });
    openingDateInput.addEventListener("change", () => {

        errorCheck(checkInputValue());

    });
    endingDateInput.addEventListener("change", () => {

        errorCheck(checkInputValue());

    });

    const cond = checkValidity(checkInputValue());
    errorOccur(cond);

    cond && createTaskFunction(checkInputValue());

});

function errorOccur(cond) {

    !cond && addTaskBtnDiv.classList.add("unsee");
    !cond && createTaskBtnDiv.classList.add("unsee");
    !cond && errorTaskBtnDiv.classList.remove("unsee");

    cond && addTaskBtnDiv.classList.remove("unsee");
    cond && createTaskBtnDiv.classList.remove("unsee");
    cond && errorTaskBtnDiv.classList.add("unsee");

    setTimeout(() => {

        !cond && errorTaskBtn.classList.add("error-occur");

    }, 0);

    setTimeout(() => {

        !cond && errorTaskBtn.classList.add("error-occur-2");

    }, 250);

};

cancelTaskBtn.addEventListener("click", e => {

    window.onCancel = true;
    window.inputOn = false;

    const titleInput = document.querySelector("#titleInput");
    const detailsInput = document.querySelector("#detailsInput");
    const openingDateInput = document.querySelector("#openingDateInput");
    const endingDateInput = document.querySelector("#endingDateInput");

    window.editId && createTaskFunction(titleInput, detailsInput, openingDateInput, endingDateInput);

    if (!(window.editId)) {

        document.querySelector("#creating") && creating.remove();

        if (!document.querySelector("#creating")) {

            addTaskBtnDiv.classList.remove("unsee");
            dropCreate.classList.add("unsee");

        };

        const awaitingTasks = document.querySelectorAll("#awaiting a");
        const ongoingTasks = document.querySelectorAll("#ongoing a");
        const doneTasks = document.querySelectorAll("#done a");
        render({ awaitingTasks, ongoingTasks, doneTasks });

    };

    createTaskBtnDiv.classList.remove("unsee");
    errorTaskBtnDiv.classList.add("unsee");

    editBtnActive();

});

function render(tasksObject) {

    if ("awaitingTasks" in tasksObject && "ongoingTasks" in tasksObject && "doneTasks" in tasksObject) {

        for (let type in tasksObject) {

            const arrayLength = tasksObject[type].length;

            //console.log(type, arrayLength);

            for (let i = 0; i < arrayLength; i++) {

                const item = tasksObject[type];

                switch (type) {

                    case "awaitingTasks":

                        item[i] && item[i].classList.add("border-warning");
                        break;

                    case "ongoingTasks":

                        item[i] && item[i].classList.add("border-secondary");
                        break;

                    case "doneTasks":

                        item[i] && item[i].classList.add("border-success");
                        break;

                    default:

                        console.error("something's wrong");
                        break;

                };

                if (arrayLength === 1) {

                    item[i].classList.remove("border-bottom-1", "border-top-1", "border-warning", "pt-4", "pb-4");
                    item[i].classList.add("rounded-bottom", "border-bottom-0", "border-top-0");

                } else if (arrayLength > 1) {

                    (i === 0) && item[i].classList.remove("border-bottom-0", "border-top-1", "pt-4", "rounded-bottom");
                    (i === 0) && item[i].classList.add("border-top-0", "border-bottom-1", "pb-4");

                    (i === arrayLength - 1) && item[i].classList.remove("border-top-0", "border-bottom-1", "pb-4");
                    (i === arrayLength - 1) && item[i].classList.add("border-top-1", "border-bottom-0", "rounded-bottom", "pt-4");

                };

                if ((i - 1 >= 0) && (i + 1 <= arrayLength - 1)) {

                    item[i].classList.remove("rounded-bottom", "border-top-0", "border-bottom-0");
                    item[i].classList.add("border-top-1", "border-bottom-1", "pt-4", "pb-4");

                };

            };

        };

    };

};



/*

document.getElementById("1").addEventListener("dragstart", (e) => {

    console.log(e.dataTransfer.setData("id", `${e.target.id}`));

    console.log(e.dataTransfer.getData("id"));

});

document.querySelector("#ongoing").addEventListener("dragenter", (e) => {

    e.preventDefault();
    console.log("enter");

});
document.querySelector("#ongoing").addEventListener("dragleave", (e) => {

    e.preventDefault();
    console.log("leave");

});
document.querySelector("#ongoing").addEventListener("dragover", (e) => {

    e.preventDefault();
    console.log("over");

});
document.querySelector("#ongoing").addEventListener("drop", (e) => {

    e.preventDefault();
    console.log("drop");

});

*/