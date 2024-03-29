function getInput(el) {
  let inputEle
  if (el.tagName !== 'INPUT') {
    inputEle = el.querySelector('input')
  } else {
    inputEle = el
  }
  return inputEle
}
function dispatchEvent(el, type) {
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent(type, true, true)
  el.dispatchEvent(evt)
}
const inputFormat = {
  inserted: (el, binding, vnode) => {
    const inputEle = getInput(el)
    const handler = function(event) {
      const { target, inputType } = event
      const { value } = target
      const { expression, arg } = binding // 函数名, 参数 v-taxFormat:[参数名]="方法名"
      if (inputType == 'insertCompositionText') return // 输入法在compositionend处单独接收
      let formatValue = value
      if (expression && vnode.context[expression]) {
        formatValue = vnode.context[expression](arg)
      } else {
        formatValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
      }
      const cursor = target.selectionStart
      const cursorMove = value.length != formatValue.length ? 1 : 0
      if (value != formatValue) {
        target.value = formatValue
        target.setSelectionRange(cursor - cursorMove, cursor - cursorMove)
        dispatchEvent(inputEle, 'input')
      }
    }
    el.inputEle = inputEle
    el._blurHandler = handler
    inputEle.addEventListener('input', handler)
    inputEle.addEventListener('compositionend', handler)
  },
  unbind(el) {
    const { inputEle } = el
    inputEle.removeEventListener('input', el._blurHandler)
    inputEle.removeEventListener('compositionend', el._blurHandler)
  }
}
export default inputFormat
