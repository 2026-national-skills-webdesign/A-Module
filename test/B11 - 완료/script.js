const time = document.getElementById("time")
const btns = {
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  resume: document.getElementById("resume"),
  reset: document.getElementById("reset"),
}

let startTime = 0; // 시작 버튼 누른 시점
let elapsed = 0 // 일시정지 전까지 측정된 누적시간
let rafId 

const format = ms => {
  const date = new Date(ms);
  return date.toISOString().slice(14, 23).replace(".", ":")
}

// 각 버튼 숨김 토글 처리
const toggleUI = (state) => {
  btns.start.classList.toggle("hidden", state !== "init") // 시작 버튼 -> 처음에만
  btns.stop.classList.toggle("hidden", state !== "run") // 중지 버튼 -> 실행 중일 때만
  btns.resume.classList.toggle("hidden", state !== "pause") // 재개 버튼 -> 멈췄을 때만
  btns.reset.classList.toggle("hidden", state === "init") // 초가화 버튼 -> 시작 후에만
}

const update = () => {
  time.textContent = format(elapsed + performance.now() - startTime)
  rafId = requestAnimationFrame(update)
}

// 각 버튼 눌렀을 때 동작
const actions = {
  start() {
    startTime = performance.now() 
    update()
    toggleUI("run")
  },
  stop() {
    cancelAnimationFrame(rafId)
    elapsed += performance.now() - startTime
    toggleUI("pause")
  },
  resume() { this.start() },
  reset() {
    cancelAnimationFrame(rafId);
    elapsed = 0;
    time.textContent = "00:00:000"
    toggleUI("init")
  }
}
btns.start.onclick = () => actions.start()
btns.stop.onclick = () => actions.stop()
btns.resume.onclick = () => actions.resume()
btns.reset.onclick = () => actions.reset()