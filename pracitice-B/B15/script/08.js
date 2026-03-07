let state = {limit:10, page:1} // 한 페이지에 보여줄 행의 개수, 

const datas = await fetch("./sample-data.csv").then(res => res.text()) // 데이터(csv)를 text 형태로 가져옴
const rows = datas.split("\n").slice(1).map(line => `<tr>${line.split(",").map(ceil => `<td>${ceil}</td>`).join("")}</tr>`)
// 데이터의 첫 줄을 잘라서 제목을 자른 후 각 데이터를 map으로 돌려서 한 줄(\n)마다 <tr>로 감싸고 ","를 기준으로 나눈 각 값을 <td>로 감싸서 표 형태를 만든다

// DOM 요소 선택
const $tableBody = $("#tableBody")
const $pageBtn = $$(".pagination-btn")
const $prevBtn = $(".prev-btn")
const $nextBtn = $(".next-btn")

function setState(newState) { // 상태 업데이트 함수
    state = {...state, ...newState} // 기존 state와 새로운 state를 합쳐서 뒤에 있는 newState가 원래 있던 state 값을 덮도록 함
    render() // 다시 랜더링
}

$pageBtn.forEach(btn => btn.addEventListener("click", () => {
    setState({ page: Number(btn.textContent) }) // 페이지 버튼 (1, 2, 3, 4, 5) 를 클릭했을 때 페이지 상태가 현재 클릭한 버튼의 textContent값으로 변하게 함
}))
$prevBtn.addEventListener("click", () => {
    setState({ page: state.page - 1 }) // 이전 버튼을 클릭했을 때 현재 페이지에서 -1를 뺀 값을 현재 페이지로 지정함
})
$nextBtn.addEventListener("click", () => {
    setState({ page: state.page + 1 }) // 이전 버튼을 클릭했을 때 현재 페이지에서 1을 더한 값을 현재 페이지로 지정함
})

function render() { // 랜더링 함수
    const range = state.limit * (state.page - 1)
    // 1페이지: (10 * (1 - 1)) -> 0번 인덱스부터 시작
    // 2페이지: (10 * (2 - 1)) -> 10번 인덱스부터 시작
    $tableBody.innerHTML = rows.slice(range, range + state.limit).join("")
    // tableBody에 아까 자른 행 데이터를 인덱스 시작 영역 ~ 인덱스 시작 영역 + 10 만큼 자른 후 join 하여 데이터를 가져옴

    $prevBtn.disabled = state.page === 1 // 현재 페이지가 1일 때 이전 버튼 비활성화
    $nextBtn.disabled = state.page === 5 // 현재 페이지가 5일 때 다음 버튼 비활성화

    $pageBtn.forEach((btn, i) => { // 각 페이지 버튼을 forEach로 돌려서 현 버튼과 인덱스 인자로 받음
        btn.classList.remove("active")
        btn.classList.remove("page-info")
        // 버튼들에 붙어있는 클래스를 모두 뗌
        btn.textContent = i + 1
        // 버튼의 textContent는 현 인덱스 + 1로 지정 (인덱스는 0부터 시작해서)

        if(i + 1 === state.page) btn.classList.add("active") // 현 페이지와 순번이 같은 버튼에 active 클래스 붙임
        if(i === 3 && state.page === 1 || i === 1 && state.page === 5) { // 현 페이지가 1일 때 4번 버튼, 현 페이지가 5일 때 2번 버튼에
            btn.classList.add("page-info")
            btn.textContent = "..."
            // 숨김 클래스 및 textContent 추가
        }
    })
}
render() // 첫 화면 로딩 시 렌더링