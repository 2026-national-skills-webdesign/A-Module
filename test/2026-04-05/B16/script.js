const { todos } = await fetch("./todos.json").then(res => res.json())

const services = {
  "전체": () => todos,
  "완료": () => todos.filter(todo => todo.completed),
  "진행중": () => todos.filter(todo => !todo.completed),
  "높은 우선순위": () => todos.filter(todo => todo.priority === "high"),
}
const priority = {
  high: {class: "priority-high", text: "높음"},
  medium: {class: "priority-medium", text: "보통"},
  low: {class: "priority-low", text: "낮음"},
}
let state = {activeFilter: "전체"}
const todoList = $("#todoList")
const filterBtns = $$(".filter-btn")

filterBtns.forEach(btn => btn.addEventListener("click", () => {
  state = { activeFilter: btn.textContent }
  render()
}))

$("#totalCount").textContent = todos.length
$("#completedCount").textContent = services["완료"]().length
$("#pendingCount").textContent = services["진행중"]().length

function render() {
  filterBtns.forEach(btn => btn.classList.toggle("active", btn.textContent === state.activeFilter))
  todoList.innerHTML = ""
  const todoItem = services[state.activeFilter]().map(e => 
    newEl("div", {
      className: `todo-item ${todo.completed ? "completed": ""}`
    })
  )
}