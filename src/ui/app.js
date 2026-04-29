// src/ui/app.js
// Calculator UI behavior
// Supports operations: add, subtract, multiply, divide

function add(a, b) { return a + b }
function subtract(a, b) { return a - b }
function multiply(a, b) { return a * b }
function divide(a, b) { if (b === 0) throw new Error('Division by zero'); return a / b }

function compute(op, a, b) {
  switch (op) {
    case 'add': return add(a, b)
    case 'subtract': return subtract(a, b)
    case 'multiply': return multiply(a, b)
    case 'divide': return divide(a, b)
    default: throw new Error('Unknown operation')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elA = document.getElementById('a')
  const elB = document.getElementById('b')
  const elOp = document.getElementById('op')
  const btn = document.getElementById('calc')
  const clear = document.getElementById('clear')
  const out = document.getElementById('result')

  function showResult(val) {
    out.textContent = val
  }

  function showError(msg) {
    out.textContent = msg
  }

  function doCalc() {
    const a = parseFloat(elA.value)
    const b = parseFloat(elB.value)
    const op = elOp.value
    if (!isFinite(a) || !isFinite(b)) {
      showError('Please enter valid numbers')
      return
    }
    try {
      const r = compute(op, a, b)
      showResult(Number.isInteger(r) ? r : r)
    } catch (e) {
      showError('Error: ' + e.message)
    }
  }

  btn.addEventListener('click', doCalc)
  clear.addEventListener('click', () => { elA.value=''; elB.value=''; out.textContent='—' })

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') doCalc()
  })
})
