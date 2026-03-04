const mili = $(".mili");
const minutes = $(".minutes");
const second = $(".second");
const container = $(".container");

let startTime = 0, elapsed = 0, id = null, run = false;

function timer(now) {
  if (!run) return; // 시작 상태가 아니면 멈춤

  /* 
    [시간 계산의 핵심 로직]
    전체 시간 = (현재 시간 - 시작 시간) + 이전까지 기록된 시간
  */
  const time = now - startTime + elapsed;

  minutes.innerHTML = String(Math.floor(time / 60000)).padStart("2", 0);
  // 분 계산: time을 (전체 밀리초 / 60000)
  second.innerHTML = String(Math.floor((time % 60000) / 1000)).padStart("2", 0);
  // 초 계산: time을 ((전체 밀리초 % 60000) / 1000)
  mili.innerHTML = String(Math.floor(time % 1000)).padStart("3", 0);
  // 밀리초 계산: time을 1000으로 나눈 나머지
  
  // 공통 : 모두 String 처리 후 Math.floor로 반올림
  // padStart(2, 0): 숫자가 한 자리면 앞에 '0'을 붙여 '01'처럼 표시

  id = requestAnimationFrame(timer);
  // 다음 프레임에도 timer 함수를 실행하도록 예약 (무한 반복)
}

function render() {
  run = !run; // 시작 혹은 중지 시 실행 상태를 true 혹은 false를 변환

  if (run) { // 실행 상태일 시
    start = performance.now(); // 현재 정밀 시간을 시작 시간으로 기록
    container.innerHTML = `<button onclick="render()">중지</button>`;// 시작 버튼 -> 중지 버튼
    id = requestAnimationFrame(timer); // 애니메이션 루프 시작
  } else {
    elapsed += performance.now() - start; // 현재 시간 - 시작 시간을 elapsed (누적 변수)에 더해줌
    cancelAnimationFrame(id); // 애니메이션 루프 중단
    container.innerHTML = `<button onclick="render()">계속</button>`; // UI 계속으로 변경 
  }
}
