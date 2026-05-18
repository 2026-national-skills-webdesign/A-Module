$$("input").forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "") inputs[i - 1]?.focus()
  })
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "")
    if (input.value.length === 1) inputs[i + 1]?.focus()
    btn.disabled = !inputs.every(i => i.value.length === 1)
  })
})

// 짧은 코드 ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ

//paulHarrison === blackMan ? '죽기' : '살기'