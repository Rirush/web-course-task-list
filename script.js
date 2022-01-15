let editing;
let editContainer = document.querySelector(".task-edit");
let tasks = [];

document.querySelector(".task-list__new").addEventListener("click", function () {
    new Task("Новая задача", false);
});

document.querySelector(".task-edit__accept").addEventListener("click", function () {
    editing.setTitle(editContainer.querySelector(".task-edit__title").value);
    editing.setUrgent(editContainer.querySelector(".task-edit__urgent").checked);
    editContainer.classList.add("task-edit--hidden");
});

document.querySelector(".task-edit__decline").addEventListener("click", function () {
    editContainer.classList.add("task-edit--hidden");
});

document.querySelector(".task-edit__title").addEventListener("keydown", function (ev) {
    if (ev.code === "Enter") {
        editing.setTitle(editContainer.querySelector(".task-edit__title").value);
        editing.setUrgent(editContainer.querySelector(".task-edit__urgent").checked);
        editContainer.classList.add("task-edit--hidden");
    }
})

class Task {
    container;
    urgent;
    title;
    index;

    constructor(title, urgent) {
        const template = document.getElementById("task-template").content.firstElementChild;
        this.container = template.cloneNode(true);
        this.container.querySelector(".task__title").innerText = title;
        if (urgent) {
            this.container.querySelector(".task__urgent").classList.remove("task__urgent--hidden");
        }

        this.container.querySelector(".task__done").addEventListener("click", (ev) => {
            this.setDone(ev.target.checked);
        });
        this.container.querySelector(".task__delete").addEventListener("click", () => {
            this.delete();
        });
        this.container.querySelector(".task__edit").addEventListener("click", () => {
            editing = this;
            editContainer.querySelector(".task-edit__title").value = this.title;
            editContainer.querySelector(".task-edit__urgent").checked = this.urgent;
            editContainer.classList.remove("task-edit--hidden");
        });

        const list = document.querySelector(".task-list__tasks-container")
        this.container = list.appendChild(this.container);
        this.urgent = urgent;
        this.title = title;
        this.index = tasks.push(this) - 1;

        editing = this;
        editContainer.querySelector(".task-edit__title").value = this.title;
        editContainer.querySelector(".task-edit__urgent").checked = this.urgent;
        editContainer.classList.remove("task-edit--hidden");
    }

    setUrgent(urgent) {
        if (urgent) {
            this.container.querySelector(".task__urgent").classList.remove("task__urgent--hidden");
        } else {
            this.container.querySelector(".task__urgent").classList.add("task__urgent--hidden");
        }
        this.urgent = urgent;
    }

    setTitle(title) {
        this.container.querySelector(".task__title").innerText = title;
        this.title = title;
    }

    setDone(done) {
        if (done) {
            this.container.querySelector(".task__title").classList.add("task__title--done");
        } else {
            this.container.querySelector(".task__title").classList.remove("task__title--done");
        }
    }

    delete() {
        tasks.splice(this.index, 1);
        this.container.remove();
    }
}