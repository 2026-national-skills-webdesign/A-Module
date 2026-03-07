const btns = {
  start: $("#start"),
  stop: $("#stop"),
  resume: $("#resume"),
  reset: $("#reset"),
}
let startTime = 0, elapsed = 0, rafId

const toggleUI = (state) => {
  btns.start.classList.toggle("hidden", state !== "init")
  btns.stop.classList.toggle("hidden", state !== "run")
  btns.resume.classList.toggle("hidden", state !== "stop")
  btns.reset.classList.toggle("hidden", state === "init")
}

const update = () => {
  const ms = elapsed + (performance.now() - startTime)
  time.textContent = new Date(ms).toISOString().slice(14, 23).replace(".", ":")
  rafId = requestAnimationFrame(update)
}

const run = (isStart) => {
  if(isStart) {
    startTime = performance.now()
    update()
    toggleUI("run")
  } else {
    cancelAnimationFrame(rafId)
    elapsed += performance.now() - startTime
    toggleUI("stop")
  }
}

btns.start.onclick = () => run(true)
btns.stop.onclick = () => run(false)
btns.resume.onclick = () => run(true)
btns.reset.onclick = () => {
  cancelAnimationFrame(rafId)
  elapsed = 0
  time.textContent = "00:00:000"
  toggleUI("init")
}