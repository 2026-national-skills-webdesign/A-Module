// [상태 관리 변수]
let startTime = 0; // 버튼을 누른 '기록 시점' (과거의 한 점)
let elapsed = 0;   // 중지했을 때까지 쌓인 '누적 시간' (밀리초 단위 주머니)
let id = null;      // 브라우저의 애니메이션 예약 번호 (취소할 때 사용)
let run = false;    // 스톱워치가 동작 중인지 체크하는 스위치

/**
 * [계산 및 출력 함수]
 * @param {number} now : requestAnimationFrame이 자동으로 넣어주는 '현재 정밀 시각'
 */
function timer(now) {
  if (!run) return; // 스위치가 꺼져있으면 즉시 종료 (계산 안 함)

  /* [핵심 공식] 전체 흐른 시간 = (지금 시각 - 시작 시각) + 이전까지 기록된 시간
     - (now - startTime): 버튼 누른 후부터 '지금 이 순간'까지 순수하게 흐른 시간
     - + elapsed: 이전에 멈췄던 기록이 있다면 그만큼을 더해서 이어나감
  */
  const time = now - startTime + elapsed;

  // [화면 그리기] 큰 숫자인 밀리초(ms)를 우리가 아는 시계 단위로 쪼갬
  // 분: 전체 시간을 60,000으로 나눈 몫
  minutes.innerHTML = String(Math.floor(time / 60000)).padStart("2", "0");
  // 초: 60초(60,000ms)로 나눈 나머지 중 1,000으로 나눈 몫
  second.innerHTML = String(Math.floor((time % 60000) / 1000)).padStart("2", "0");
  // 밀리초: 1,000으로 나눈 나머지 (0~999)
  mili.innerHTML = String(Math.floor(time % 1000)).padStart("3", "0");

  // [무한 동력] 16ms마다 브라우저가 다음 프레임을 그릴 때 다시 timer를 실행하도록 예약
  // 이때 새로운 'now' 값이 다음 timer의 인자로 배달됨
  id = requestAnimationFrame(timer);
}

/**
 * [스위치 및 시동 함수]
 * 버튼을 클릭할 때마다 실행됨
 */
function render() {
  run = !run; // true -> false, false -> true 상태 반전

  if (run) { 
    // [시작/계속 모드]
    // 현재 시각을 기준점으로 고정 (0점 조절)
    startTime = performance.now(); 
    // UI 변경 및 엔진 가동 (첫 번째 시동걸기)
    container.innerHTML = `<button onclick="render()">중지</button>`;
    id = requestAnimationFrame(timer); 
  } else {
    // [중지 모드]
    // 중요: 방금 전까지 흐른 시간(지금 - 시작)을 계산해서 elapsed 주머니에 저장
    elapsed += performance.now() - startTime; 
    // 예약되어 있던 다음 프레임 실행을 취소 (엔진 정지)
    cancelAnimationFrame(id); 
    // UI 변경
    container.innerHTML = `<button onclick="render()">계속</button>`;
  }
}