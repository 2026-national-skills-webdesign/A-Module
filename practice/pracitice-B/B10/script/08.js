const ctx = canvas.getContext('2d')
let painting = false

canvas.addEventListener("mousedown", () => {painting = true; ctx.beginpath()})
canvas.addEventListener('mouseup', ()  => { painting = false })
canvas.addEventListener('mouseleave', ()  => { painting = false })
canvas.addEventListener('mousemove', ({ offsetX:x, offsetY: y })  => { 
  painting ? (ctx.lineTo(x, y), ctx.stroke()) : ctx.moveTo(x, y)
})

saveBtn.onclick = () => {
  newEl("a", { href: canvas.toDataURL(), donwload: 'image.png' }).click()
}
clearBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}