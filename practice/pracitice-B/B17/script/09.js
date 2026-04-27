const input = $(".fileInput")
const zone = $(".upload-zone")
const list = $(".file-list")
const state = { files: [], draggendIndex: null }

const addFiles = (file) => { state.fileps.push(...file); render() }

input.addEventListener("change", (e) => { addFiles(e.target.files); e.target.value = "" })
zone.addEventListener("click", () => { input.click() })
zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag-over") })
zone.addEventListener("dragleave", (e) => { zone.classList.remove("drag-over") })
zone.addEventListener("drop", (e) => { e.preventDefault(); zone.classList.remove("drag-over") })

function render() {
  list.innerHTML = ""
  list.append(state.files.map((file, i) => {
    const li = newEl("li", {
      draggable: true,
      innerHTML: `<span class="file-name">${file.name}</span><span class="file-size">${(file.size / 1024).toFixed(1)}</span>`
    })
    li.addEventListener("dragstart", () => { li.classList.add("dragging"); state.draggendIndex = i })
    li.addEventListener("dragover", () => { li.classList.remove("dragging"); state.draggendIndex = null })
    li.addEventListener("dragover", (e) => { li.classList.add("drag-over") })
    li.addEventListener("drop", (e) => {
      e.preventDefault()
      if(state.draggendIndex === i) return
      [state.files[state.draggendIndex], state.files[i]] = [state.files[i], state.files[state.draggendIndex]]
      render()
    })
    return li
  }))
}
render()