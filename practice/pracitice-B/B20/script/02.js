const state = { turn: 0, cells: [[], []], done: false }
// turn: 0 -> x, 1 -> o
// cells: 각각 x와 o가 선택한 영역의 dataset-type 배열
// done: 게임 종료 여부 판단

const hasWon = (cell) => 
  Object.values(
    cell.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {})
    // 각 cell이 몇번 선택되었는지 객체로 값 저장
    // 예시: ['r1', 'r2', 'r1'] -> { 'r1': 2, 'r2': 1 }
  ).some(v => v >= 3)
  // 그 후 객체에서 value 값만 가져오고 (2, 1)
  // 그 값 중 3 이상인 값이 있으면 true

const finish = (msg) => { state.done = true; setTimeout(() => alert(msg), 100) };
// state.done을 true로 변환하여 게임을 종료 상태로 바꾸고 0.1초 늦게 알림창 띄움

[...$(".game-board").children].forEach(cell =>
  cell.onclick = () => {
    const { turn, cells, done } = state
    // state 값 모두 변수로 가져와서 구조분해할당
    if (done || cell.classList.contains('o') || cell.classList.contains("x")) return
    // 만약 클릭한 cell에 o나 x 클래스가 포함되어있거나, 게임이 종료 상태라면 return

    const mark = turn ? "o" : "x"
    // 현재 상태가 1이면 o, 아니면 x
    cell.classList.add(mark)
    // cell의 현재 turn에 선택한 cell의 dataset type 값을 집어넣음
    cells[turn].push(...cell.dataset.type.split(","))

    if (hasWon(cells[turn])) finish(`${mark.toUpperCase()}가 승리하였습니다`)
      // 만약 해당 turn의 클릭 값 중 3 이상이면 승리 알림창 띄움
    else if (cells[0].length + cells[1].length === 24) finish("무승부입니다")
      // 만약 각 turn의 length 를 다 더했는데 data-type의 합계인 24라면 무승부 알림창 띄움
    state.turn ^= 1
    // 1이면 0으로, 0이면 1로
  }
)