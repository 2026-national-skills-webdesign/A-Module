const state = { files: [], draggendIndex: null }
const zone = $(".upload-zone")
const list = $(".file-list")
const input = $('.file-input')

const addFiles = (file) => { state.files.push(...file); render() }

input.addEventListener('change', (e) => { addFiles(e.target.files); e.target.value = "" })
zone.addEventListener('click', () => { input.click() })
zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag-over"); })
zone.addEventListener("dragleave", (e) => { zone.classList.remove("drag-over") })
zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove("drag-over"); addFiles(e.dataTransfer.files) })

function render() {
    list.innerHTML = ""
    list.append(...state.files.map((file, i) => {
        const li = newEl("li", {
            draggable: true,
            innerHTML: `<span class="file-name">${file.name}</span><span class="file-size">${(file.size / 1024).toFixed(1)}</span>`
        })
        li.addEventListener("dragstart", () => { state.draggendIndex = i; li.classList.add("dragging") })
        li.addEventListener("dragend", () => { state.draggendIndex = null; li.classList.remove("dragging") })
        li.addEventListener("dragover", (e) => { e.preventDefault(); state.draggendIndex !== i && li.classList.add('drag-over') })
        li.addEventListener("dragleave", () => { li.classList.remove("drag-over") })
        li.addEventListener("drop", (e) => {
            e.preventDefault()
            if(state.draggendIndex === i) return
            [state.files[i], state.files[state.draggendIndex]] = [state.files[state.draggendIndex], state.files[i]]
            render()
        })
        return li
    }))
}

render()