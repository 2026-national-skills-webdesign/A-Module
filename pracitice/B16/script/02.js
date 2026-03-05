const { todos } = await fetch("./todo.json").then(res => res.json())

const services = {
  "전체": () => todos, 
  "진행중": () => todos.filter(todo => !todo.completed),
  "완료": () => todos.filter(todo => todo.completed),
  "높은 우선순위": () => todos.filter(todo => todo.priority === "high"),
}
const priority = {
  "high": {"class": "priority-high", "text": "높음"},
  "medium": {"class": "priority-medium", "text": "보통"},
  "low": {"class": "priority-low", "text": "낮음"},
}

let state = { activeFilter: "전체" }

const $todoList = $("#todoList")
const $filterButtons = $$(".filter-btn")

$("#totalCount").textContent = todo.length
$("#completedCount").textContent - services["완료"]().length
$("#pendingCount").textContent = services["진행중"]().length

$filterButtons.forEach(btn => btn.addEventListener("click", () => {
  state.activeFilter = btn.textContent
  render()
}))

function render() {
  
}