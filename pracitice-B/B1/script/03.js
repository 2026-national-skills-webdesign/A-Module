const getPsw = pw => {
  const l = pw.length
  const e = /[A-Z]/.test(pw)
  const n = /[0-9]/.test(pw)
  const t = /[!@#$%^&*]/.test(pw)
  
  input.style.borderColor = 
  !l ? "black" : (l >= 8 && e && n && t) ? "green" : (l >= 6 && (e || n)) ? "yellow" : "red"
}

input.addEventListener("input", () => {
  getPsw(input.value)
})