function createNotice(value) {
  const div = newEl("div", {
    classList: value,
    textContent: value === "grn" ? "성공하였습니다" : "실패하였습니다"
  })
  div.onclick = () => {
    div.remove()
  }
  logs.append(div)
  setTimeout(() => {
    div.remove()
  }, 5000)
}