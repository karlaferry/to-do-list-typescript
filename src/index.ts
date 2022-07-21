import { v4 as uuidV4 } from "uuid";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadItems();
tasks.forEach((task) => addNewTask(task));

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveItems();
  addNewTask(newTask);
  input.value = "";
});

function addNewTask(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveItems();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveItems() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadItems(): Task[] {
  const tasksJSON = localStorage.getItem("TASKS");
  if (tasksJSON == null) return [];
  return JSON.parse(tasksJSON);
}
