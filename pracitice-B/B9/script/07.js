class star {
  constructor() {
    this.datas = JSON.parse(localStorage.getItem("star")) || this.getData()
    this.render()
  }
  update(newData) {
    this.datas = newData
    this.render()
    localStorage.setItem("star", JSON.stringify(this.datas))
  }
  render() {
    container.innerHTML = ''
    this.datas.map(e => {
      const newDiv = newEl("div", {
        innerHTML: `${e.name} <p>${e.desc}</p><div class="star">${e.isStar ? "채운별" : "빈별"}</div>`
      })
      newDiv.querySelector(".star").addEventListener("click", () => {
        e.isStar = !e.isStar
        this.update(this.datas)
      })
      container.append(newDiv)
    })
  }
  async getData() {
    const data = await fetch("./data.json").then(res => res.json())
    this.update(data)
  }
}

new star