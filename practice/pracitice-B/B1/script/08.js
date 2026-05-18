const getPsw = pw => {
  const l = pw.length
  const n = /[0-9]/.test(pw)
  const a = /[A-Z]/.test(pw)
  const t = /[!@#$%^&*]/.test(pw)

  const style = !l ? {c:"red", l:"약함"} :
  (l >= 8 && n && a && t) ? {c: "green", l:"강함"} :
  (l >= 6 && (n || a)) ? { c: "orange", l:"보통" } :
  {c:"red", l:"약함"}

  input.style.borderColor = style.c
  p.style.color = style.c
  p.textContent = style.l
}

input.oninput = () => getPsw(input.value)
getPsw(input.value)